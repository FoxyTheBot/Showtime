import Canvas, { CanvasRenderingContext2D } from 'canvas';
import { logger } from "../../utils/logger";
import path from 'path';

export default class GostoMemeGenerator {
    private canvas: Canvas.Canvas;
    private context: CanvasRenderingContext2D;
    private readonly GOSTO_IMAGE = path.resolve("assets", "naosomosiguais.png");
    constructor() {
        this.canvas = Canvas.createCanvas(1080, 1260);
        this.context = this.canvas.getContext("2d");
    }

    async generateImage(image1: string, image2: string, text: string): Promise<Buffer> {
        try {
            const firstImage = await Canvas.loadImage(image1);
            const secondImage = await Canvas.loadImage(image2);

            const memeBackground = await Canvas.loadImage(this.GOSTO_IMAGE);
            this.context.drawImage(memeBackground, 0, 0, this.canvas.width, this.canvas.height);

            const resizedFirstImage = await this.resizeImage(firstImage, 301, 301);
            const resizedSecondImage = await this.resizeImage(secondImage, 301, 301);

            this.context.drawImage(resizedFirstImage, 537, 517);
            this.context.drawImage(resizedSecondImage, 537, 837);

            this.context.font = "75px Calibri";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.fillText(text, 540, 1200);

            return this.canvas.toBuffer();
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    private async resizeImage(image: Canvas.Image, width: number, height: number) {
        const canvas = Canvas.createCanvas(width, height);
        const context = canvas.getContext("2d");

        context.drawImage(image, 0, 0, width, height);

        return canvas;
    }
}