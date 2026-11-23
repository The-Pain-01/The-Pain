
import "dotenv/config";

import pino from "pino";
import { loadCommands } from "./handler.js";

const logger = pino({
  level: process.env.LOG_LEVEL || "info"
});

async function start() {
  try {
    console.log(`
☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ☠️

🚀 MULTI-SESSION SYSTEM STARTING...
`);

    // Charger les commandes
    const total = await loadCommands();

    console.log(`📦 ${total} commandes chargées`);

    // Démarrer le serveur backend
    const { startServer } = await import("./server.js");

    await startServer();

    console.log(`
✅ BACKEND STARTED

☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃
🩸 MULTI-SESSION SYSTEM ACTIVE
`);
  } catch (error) {
    logger.error({ err: error }, "Erreur au démarrage de THE PAIN MD");
    process.exit(1);
  }
}

process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Erreur non interceptée");
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error({ err: error }, "Promesse rejetée");
});

process.on("SIGTERM", () => {
  logger.info("Arrêt demandé par le serveur");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("Arrêt manuel");
  process.exit(0);
});

start();
