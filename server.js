import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analiseRoutes from "./routes/analiseRoutes.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/relatorios", express.static(path.resolve("relatorios")));
app.use("/api", analiseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
