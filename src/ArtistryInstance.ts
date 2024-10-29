import fastify, { FastifyInstance} from "fastify";
import CommandRoutes from "./utils/CommandRoutes";
require("dotenv").config();

export default class ArtistryInstance {
    private server: FastifyInstance;
    private commandRoutes: CommandRoutes;
    
    constructor() {
        this.server = fastify();
        this.commandRoutes = new CommandRoutes();
    }

    async start() {
        this.commandRoutes.registerRoutes(this.server);
        await this.server.listen({ port: Number(process.env.PORT) || 3000 });
    }
}