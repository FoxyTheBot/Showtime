import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageGenerator from "../../image/ImageGenerator";

export default class GirlfriendRoute {
    private generator: ImageGenerator

    constructor(private server: FastifyInstance) {
        this.generator = new ImageGenerator()
        this.server.post("/v1/memes/girlfriend", this.generateGirlfriendImage.bind(this));
    }

    async generateGirlfriendImage(req: FastifyRequest, res: FastifyReply) {
        const body = req.body as GirlfriendImageRequest

        if (!body.avatar) {
            return res.status(400).send({
                error: "Missing required parameter: avatar is required.",
            });
        }

        const imageBuffer = await this.generator.generateGirlfriendImage(body.avatar);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }
}

interface GirlfriendImageRequest {
    avatar: string
}