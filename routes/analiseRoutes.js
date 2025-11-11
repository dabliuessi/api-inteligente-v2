import express from "express";
import { processarFormulario, listarRelatorios } from "../controllers/analiseController.js";

const router = express.Router();
router.post("/analisar", processarFormulario);
router.get("/historico", listarRelatorios);

export default router;
