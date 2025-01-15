import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageGenerator from "../../image/ImageGenerator";

export default class AntesQueVireModaRoute {
    private generator: ImageGenerator

    constructor(private server: FastifyInstance) {
        this.generator = new ImageGenerator()
        this.server.post("/v1/memes/antesqueviremoda", this.generateAntesQueVireModaImage.bind(this));
    }

    async generateAntesQueVireModaImage(req: FastifyRequest, res: FastifyReply) {
        const body = req.body as AntesQueVireModaImageRequest;

        if (!body.asset) {
            return res.status(400).send({
                error: "Missing required parameter: asset is required.",
            });
        }

        const imageBuffer = await this.generator.generateModaImage(body.asset);
        res.header("Content-Type", "image/png").send(imageBuffer);
    }
}

interface AntesQueVireModaImageRequest {
    asset: string
}