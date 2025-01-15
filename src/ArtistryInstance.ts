import fastify, { FastifyInstance } from "fastify";
import { logger } from "./utils/logger";
import AntesQueVireModaRoute from "./routes/v1/AntesQueVireModaRoute";
import EminemRoute from "./routes/v1/EminemRoute";
import GirlfriendRoute from "./routes/v1/GirlfriendRoute";
import GostoImageRoute from "./routes/v1/GostoImageRoute";
import LaranjoRoute from "./routes/v1/LaranjoRoute";
import StonksRoute from "./routes/v1/StonksRoute";
import WindowsErrorRoute from "./routes/v1/WindowsErrorRoute";
import NotStonksRoute from "./routes/v1/NotStonksRoute";
require("dotenv").config();

export default class ArtistryInstance {
    private server: FastifyInstance;

    constructor() {
        this.server = fastify();
    }

    registerRoutes() {
        new AntesQueVireModaRoute(this.server);
        new EminemRoute(this.server);
        new GirlfriendRoute(this.server);
        new GostoImageRoute(this.server);
        new LaranjoRoute(this.server);
        new NotStonksRoute(this.server);
        new StonksRoute(this.server);
        new WindowsErrorRoute(this.server);
    }

    async start() {
        const port = process.argv.find((arg) => arg.startsWith("--port="))?.split("=")[1] || 3000;
        this.registerRoutes();
        await this.server.listen({ port: Number(port) });
        logger.info(`Artistry microservice is running on port ${port}`);
    }
}