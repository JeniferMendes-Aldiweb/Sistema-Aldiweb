const ftp = require("basic-ftp");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const distFolder = path.resolve(__dirname, "client", "dist", "client", "browser");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });

        console.log("🔌 Conectado ao FTP");

        // Apaga arquivos existentes
        await client.cd(process.env.FTP_REMOTE_PATH);
        await client.clearWorkingDir();
        console.log("🧹 Pasta remota limpa");

        // Envia arquivos do build
        await client.uploadFromDir(distFolder);
        console.log("🚀 Deploy finalizado com sucesso!");
    } catch (err) {
        console.error("❌ Erro no deploy:", err);
    }

    client.close();
}

deploy();