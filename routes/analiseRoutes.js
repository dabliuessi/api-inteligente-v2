import express from "express";
import { processarFormulario } from "../controllers/analiseController.js";
const router = express.Router();

router.post("/analisar", processarFormulario);
router.get("/historico", listarRelatorios);

export default router;
