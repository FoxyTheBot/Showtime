import { FastifyInstance } from "fastify";
import ImageGenerator from "../image/ImageGenerator";

export default class CommandRoutes {
    private generator: ImageGenerator;

    constructor() {
        this.generator = new ImageGenerator();
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

    async generateEminem8MileVideo(req, res) {
        const { contentType, url, size } = req.body;
        const videoBuffer = await this.generator.generate8MileVideo(url, contentType, size);

        res.header("Content-Type", "video/mp4").send(videoBuffer);
    }

    async generateGirlfriendImage(req, res) {
        const { avatar } = req.body;
        const imageBuffer = await this.generator.generateGirlfriendImage(avatar);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateGostoImage(req, res) {
        const { asset1, asset2, text } = req.body;
        const imageBuffer = await this.generator.generateGostoMeme(asset1, asset2, text);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateWindowsErrorImage(req, res) {
        const { text } = req.body;
        const imageBuffer = await this.generator.generateWindowsErrorImage(text);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateLaranjoImage(req, res) {
        const { text } = req.body;
        const imageBuffer = await this.generator.generateLaranjoImage(text);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateNotStonksImage(req, res) {
        const { text } = req.body;
        const imageBuffer = await this.generator.generateNotStonksImage(text);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateStonksImage(req, res) {
        const { text } = req.body;
        const imageBuffer = await this.generator.generateStonksImage(text);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }

    async generateModaImage(req, res) {
        const { asset } = req.body;
        const imageBuffer = await this.generator.generateModaImage(asset);

        res.header("Content-Type", "image/png").send(imageBuffer);
    }
}