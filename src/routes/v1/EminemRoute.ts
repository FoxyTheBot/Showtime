import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageGenerator from "../../image/ImageGenerator";

export default class EminemRoute {
    private generator: ImageGenerator

    constructor(private server: FastifyInstance) {
        this.generator = new ImageGenerator()
        this.server.post("/v1/memes/8mile", this.generateEminem8MileVideo.bind(this));
    }

    async generateEminem8MileVideo(req: FastifyRequest, res: FastifyReply) {
        const body = req.body as Eminem8MileRequest;

        if (!body.contentType || !body.url || !body.size) {
            return res.status(400).send({
                error: "Missing required parameters: contentType, url, and size are required.",
            });
        }

        const videoBuffer = await this.generator.generate8MileVideo(body.url, body.contentType, body.size);
        res.header("Content-Type", "video/mp4").send(videoBuffer);
    }
}

interface Eminem8MileRequest {
    contentType: string;
    url: string;
    size: number;
}