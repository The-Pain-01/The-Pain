import fs from "fs";
import path from "path";
import axios from "axios";
import { useMultiFileAuthState } from "@whiskeysockets/baileys";
import config from "../config.js";

const SESSION_FOLDER = "./session";

export async function loadSessionFromMega() {

  if (!config.SESSION_ID) {
    throw new Error("SESSION_ID manquant dans config.js");
  }

  if (!fs.existsSync(SESSION_FOLDER)) {
    fs.mkdirSync(SESSION_FOLDER);
  }

  const sessionPath = path.join(SESSION_FOLDER, "creds.json");

  if (!fs.existsSync(sessionPath)) {

    console.log("📥 Téléchargement de la session...");

    const { data } = await axios.get(config.SESSION_ID);

    fs.writeFileSync(sessionPath, data);

    console.log("✅ Session téléchargée");

  }

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_FOLDER);

  return { state, saveCreds };

}