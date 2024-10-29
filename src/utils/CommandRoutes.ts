import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageGenerator from "../image/ImageGenerator";

export default class CommandRoutes {
    private generator: ImageGenerator;

    constructor() {
        this.generator = new ImageGenerator();
        this.bindHandlers();
    }

    private bindHandlers() {
        this.generateEminem8MileVideo = this.generateEminem8MileVideo.bind(this);
        this.generateGirlfriendImage = this.generateGirlfriendImage.bind(this);
        this.generateGostoImage = this.generateGostoImage.bind(this);
        this.generateWindowsErrorImage = this.generateWindowsErrorImage.bind(this);
        this.generateLaranjoImage = this.generateLaranjoImage.bind(this);
        this.generateNotStonksImage = this.generateNotStonksImage.bind(this);
        this.generateStonksImage = this.generateStonksImage.bind(this);
        this.generateModaImage = this.generateModaImage.bind(this);
    }

    registerRoutes(server: FastifyInstance) {
        server.post("/memes/gosto", this.generateGostoImage);
        server.post("/memes/windowserror", this.generateWindowsErrorImage);
        server.post("/memes/girlfriend", this.generateGirlfriendImage);
        server.post("/memes/laranjo", this.generateLaranjoImage);
        server.post("/memes/notstonks", this.generateNotStonksImage);
        server.post("/memes/stonks", this.generateStonksImage);
        server.post("/memes/moda", this.generateModaImage);
        server.post("/memes/8mile", this.generateEminem8MileVideo);
    }

    async generateEminem8MileVideo(req: FastifyRequest, res: FastifyReply) {
        const { contentType, url, size } = req.body as any;

        if (!contentType || !url || !size) {
            return res.status(400).send({
                error: "Missing required parameters: contentType, url, and size are required.",
            });
        }

        const videoBuffer = await this.generator.generate8MileVideo(url, contentType, size);
        res.header("Content-Type", "video/mp4").send(videoBuffer);
    }

    async generateGirlfriendImage(req: FastifyRequest, res: FastifyReply) {
        const { avatar } = req.body as any;

        if (!avatar) {
            return res.status(400).send({
                error: "Missing required parameter: avatar is required.",
            });
        }

        const imageBuffer = await this.generator.generateGirlfriendImage(avatar);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateGostoImage(req: FastifyRequest, res: FastifyReply) {
        const { asset1, asset2, text } = req.body as any;

        if (!asset1 || !asset2 || !text) {
            return res.status(400).send({
                error: "Missing required parameters: asset1, asset2, and text are required.",
            });
        }

        const imageBuffer = await this.generator.generateGostoMeme(asset1, asset2, text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateWindowsErrorImage(req: FastifyRequest, res: FastifyReply) {
        const { text } = req.body as any;

        if (!text) {
            return res.status(400).send({
                error: "Missing required parameter: text is required.",
            });
        }

        const imageBuffer = await this.generator.generateWindowsErrorImage(text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateLaranjoImage(req: FastifyRequest, res: FastifyReply) {
        const { text } = req.body as any;

        if (!text) {
            return res.status(400).send({
                error: "Missing required parameter: text is required.",
            });
        }

        const imageBuffer = await this.generator.generateLaranjoImage(text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateNotStonksImage(req: FastifyRequest, res: FastifyReply) {
        const { text } = req.body as any;

        if (!text) {
            return res.status(400).send({
                error: "Missing required parameter: text is required.",
            });
        }

        const imageBuffer = await this.generator.generateNotStonksImage(text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateStonksImage(req: FastifyRequest, res: FastifyReply) {
        const { text } = req.body as any;

        if (!text) {
            return res.status(400).send({
                error: "Missing required parameter: text is required.",
            });
        }

        const imageBuffer = await this.generator.generateStonksImage(text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateModaImage(req: FastifyRequest, res: FastifyReply) {
        const { asset } = req.body as any;

        if (!asset) {
            return res.status(400).send({
                error: "Missing required parameter: asset is required.",
            });
        }

        const imageBuffer = await this.generator.generateModaImage(asset);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }
}