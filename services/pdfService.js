import PDFDocument from "pdfkit";
import fs from "fs";

export function gerarPDF(dados, textoIA) {
    const { nome, tipoUsuario } = dados;
    const nomeArquivo = `relatorio_${nome.replace(/\s/g, "_")}_${Date.now()}.pdf`;
    const caminho = `./relatorios/${nomeArquivo}`;

    if (!fs.existsSync("./relatorios")) fs.mkdirSync("./relatorios");

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(caminho));

    doc.fontSize(18).text("Relatório de Autoavaliação", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Nome: ${nome}`);
    doc.text(`Tipo de usuário: ${tipoUsuario}`);
    doc.text(`Data: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text("Análise Gerada pela IA:", { underline: true });
    doc.moveDown();
    doc.fontSize(11).text(textoIA, { align: "justify" });

    doc.end();

    return caminho;
}
