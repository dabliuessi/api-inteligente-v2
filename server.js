import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analiseRoutes from "./routes/analiseRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/api", analiseRoutes);
app.use("/relatorios", express.static(path.join(__dirname, "relatorios")));
app.get("/", (req, res) => {
    res.send("✅ API do Sistema Inteligente está online!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
