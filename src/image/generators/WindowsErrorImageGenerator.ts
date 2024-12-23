import Canvas, { CanvasRenderingContext2D } from 'canvas';
import path from 'path';

export default class WindowsErrorImageGenerator {
    private canvas: Canvas.Canvas;
    private context: CanvasRenderingContext2D;
    private readonly WINDOWS_ERROR_IMAGE = path.resolve("assets", "windows_error.png");

    constructor() {
        this.canvas = Canvas.createCanvas(380, 208);
        this.context = this.canvas.getContext("2d");
    }

    async generateImage(text: string): Promise<Buffer> {
        // Let's clean the canvas before drawing anything

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const background = await Canvas.loadImage(this.WINDOWS_ERROR_IMAGE);
        this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);

        if (text.length > 30) {
            const check = text.match(/.{1,35}/g);
            text = check.join("\n");
        }

        this.context.strokeStyle = '#74037b';
        this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.font = '15px Sans';
        this.context.fillStyle = '#000000';
        this.context.fillText(text, this.canvas.width / 5.3, this.canvas.height / 2.2);

        return this.canvas.toBuffer();
    }
}