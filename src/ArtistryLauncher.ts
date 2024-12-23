import ArtistryInstance from "./ArtistryInstance";

new ArtistryInstance().start();

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", error => {
    console.error("Uncaught Exception thrown", error);
    process.exit(1);
});

process.on("SIGINT", () => {
    process.exit();
});

process.on("SIGTERM", () => {
    process.exit();
});