import Canvas, { CanvasRenderingContext2D } from 'canvas';
import path from 'path';

export default class ModaImageGenerator {
    private canvas: Canvas.Canvas;
    private context: CanvasRenderingContext2D;
    private readonly MODA_IMAGE = path.resolve("assets", "moda.png");
    
    constructor() {
        this.canvas = Canvas.createCanvas(589, 585);
        this.context = this.canvas.getContext('2d');
    }

    async generateImage(image: string): Promise<Buffer> {
        const memeBackground = await Canvas.loadImage(this.MODA_IMAGE);

        this.context.drawImage(memeBackground, 0, 0, this.canvas.width, this.canvas.height);
        const resizedImage = await this.resizeImage(await Canvas.loadImage(image), 307, 307);
        this.context.drawImage(resizedImage, 257, 225);

        return this.canvas.toBuffer();
    }

    private async resizeImage(image: Canvas.Image, width: number, height: number) {
        const canvas = Canvas.createCanvas(width, height);
        const context = canvas.getContext("2d");

        context.drawImage(image, 0, 0, width, height);

        return canvas;
    }
}