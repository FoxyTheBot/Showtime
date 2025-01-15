import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageGenerator from "../../image/ImageGenerator";

export default class GostoImageRoute {
    private generator: ImageGenerator

    constructor(private server: FastifyInstance) {
        this.generator = new ImageGenerator()
        this.server.post("/v1/memes/gosto", this.generateGostoImage.bind(this));
    }

    async generateGostoImage(req: FastifyRequest, res: FastifyReply) {
        const { asset1, asset2, text } = req.body as GostoImageRequest

        if (!asset1 || !asset2 || !text) {
            return res.status(400).send({
                error: "Missing required parameters: asset1, asset2, and text are required.",
            });
        }

        const imageBuffer = await this.generator.generateGostoMeme(asset1, asset2, text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }
}

interface GostoImageRequest {
    asset1: string;
    asset2: string;
    text: string;
}