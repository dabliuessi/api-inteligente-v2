import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_URI,
});

pool.connect()
    .then(() => console.log("✅ Conectado ao banco Supabase"))
    .catch((err) => console.error("❌ Erro de conexão:", err));

export default pool;
