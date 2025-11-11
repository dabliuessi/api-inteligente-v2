import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function gerarAnaliseIA(dados) {
    const { nome, tipoUsuario, respostas, dissertativa } = dados;

    const prompt = `
  O usuário ${nome} (${tipoUsuario}) respondeu a um questionário de autoavaliação.
  Questões e respostas:
  ${respostas.map((r, i) => `Pergunta ${i + 1}: ${r}`).join("\n")}
  
  Resposta dissertativa: ${dissertativa}

  Gere um relatório profissional contendo:
  - Breve resumo do perfil do usuário
  - Análise de desempenho geral
  - Pontos fortes e fracos
  - Sugestões de melhoria
  - Conclusão motivacional
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
}
