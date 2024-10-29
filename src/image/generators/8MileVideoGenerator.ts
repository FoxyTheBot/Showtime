import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import fetch from 'node-fetch';
import { logger } from "../../utils/logger";

const unlinkAsync = promisify(fs.unlink);

export default class EminemVideoGenerator {
    private MAX_AUDIO_SIZE: number = 1024 * 1024 * 8;
    private readonly EMINEM_VIDEO_PATH = path.resolve("assets", "8mile.mp4");

    async generateVideo(audio: string, contentType: string, size: number): Promise<Buffer> {
        if (!contentType?.startsWith("audio") && !contentType?.startsWith("video")) {
            throw new Error("Invalid file type provided. Must be audio or video.");
        }

        if (size > this.MAX_AUDIO_SIZE) {
            throw new Error("Audio or video file is too large. Max size is 10 MB.");
        }

        try {
            const timestamp = Date.now();
            const audioTempPath = path.join(__dirname, `audio_temp_${timestamp}.mp3`);
            const videoTempPath = path.join(__dirname, `video_temp_${timestamp}.mp4`);
            const outputTempPath = path.join(__dirname, `output_video_${timestamp}.mp4`);

            if (contentType.startsWith("video")) {
                await this.saveToFile(audio, videoTempPath);
                await this.extractAudio(videoTempPath, audioTempPath);
            } else {
                await this.saveToFile(audio, audioTempPath);
            }

            const output = new Readable({ read() {} });

            ffmpeg(this.EMINEM_VIDEO_PATH)
                .input(audioTempPath)
                .complexFilter(`
                    [0:a]atrim=0:10[a0]; 
                    [1:a]atrim=0:9[a1]; 
                    [a0][a1]concat=n=2:v=0:a=1[a]; 
                    [0:v]trim=duration=19[v]
                `)
                .outputOptions([
                    "-map [v]",
                    "-map [a]",
                    "-shortest",
                    `-threads ${process.env.FFMPEG_THREADS || 2}`,
                    `-preset ${process.env.FFMPEG_PRESET || "fast"}`
                ])
                .save(outputTempPath)
                .on("end", async () => {
                    const fileStream = fs.createReadStream(outputTempPath);
                    fileStream.on("data", chunk => output.push(chunk));
                    fileStream.on("end", async () => {
                        output.push(null);
                        await this.cleanUp(audioTempPath, videoTempPath, outputTempPath);
                    });
                })
                .on("error", async (err) => {
                    logger.error("Error generating video:", err);
                    await this.cleanUp(audioTempPath, videoTempPath, outputTempPath);
                    throw new Error("An error occurred while generating the video.");
                });

            return await this.streamToBuffer(output);
        } catch (error) {
            logger.error("Error generating video:", error);
            throw new Error("An error occurred while generating the video.");
        }
    }

    private async extractAudio(videoPath: string, audioPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .output(audioPath)
                .on("end", resolve)
                .on("error", reject)
                .run();
        });
    }

    private async saveToFile(url: string, filePath: string): Promise<void> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.promises.writeFile(filePath, buffer);
    }

    private async streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream.on("data", chunk => chunks.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", reject);
        });
    }

    private async cleanUp(...paths: string[]): Promise<void> {
        await Promise.all(paths.map(path => unlinkAsync(path).catch((err: Error) => {
            // Suppress all ENOENT errors because this error will occur if the file has already been deleted
            if (err.message.includes("ENOENT")) return;
            throw err;
        })));
    }
}
