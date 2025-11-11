import pool from "../config/supabase.js";
import { gerarAnaliseIA } from "../services/iaService.js";
import { gerarPDF } from "../services/pdfService.js";

export async function processarFormulario(req, res) {
    try {
        const dados = req.body;
        const textoIA = await gerarAnaliseIA(dados);
        const nomeArquivo = gerarPDF(dados, textoIA);
        const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
        const caminhoPDF = `${BASE_URL}/relatorios/${nomeArquivo}`;

        await pool.query(
            `INSERT INTO relatorios 
                (nome, tipo_usuario, respostas, dissertativa, analise, pdf_path, data_criacao)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
            [
                dados.nome,
                dados.tipoUsuario,
                JSON.stringify(dados.respostas),
                dados.dissertativa,
                textoIA,
                caminhoPDF,
            ]
        );
        res.json({
            message: "Relatório gerado com sucesso!",
            analise: textoIA,
            pdf: caminhoPDF,
        });
    } catch (err) {
        console.error("❌ Erro ao processar formulário:", err);
        res.status(500).json({ error: "Erro ao processar formulário", err });
    }
}
