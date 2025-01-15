import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageGenerator from "../../image/ImageGenerator";
import { GenericImageRequest } from "../../utils/GenericImageRequest";

export default class NotStonksRoute {
    private generator: ImageGenerator

    constructor(private server: FastifyInstance) {
        this.generator = new ImageGenerator()
        this.server.post("/v1/memes/notstonks", this.generateNotStonksImage.bind(this));
    }

    async generateNotStonksImage(req: FastifyRequest, res: FastifyReply) {
        const body = req.body as GenericImageRequest;

        if (!body.text) {
            return res.status(400).send({
                error: "Missing required parameter: text is required.",
            });
        }

        const imageBuffer = await this.generator.generateNotStonksImage(body.text);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }
}