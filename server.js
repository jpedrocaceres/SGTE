// server.js
import express from 'express';
import mysql from 'mysql2/promise'; // Use mysql2 com suporte a Promises
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3300;

// Para usar __dirname em ES6 (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o formulário de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para o formulário de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


// Conexão com o banco de dados MySQL
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sgteDB'
});

// Verifica se a conexão foi bem-sucedida
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL");
    }
});

// Rota para registro de usuário
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    const existingUser = rows.length > 0 ? rows[0] : null;

    if (existingUser) {
        return res.json({ message: "Usuário já existe" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await db.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, password_hash]);
    res.json({ message: "Usuário registrado com sucesso!" });
});



// Rota para login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    const user = rows.length > 0 ? rows[0] : null;

    if (!user) {
        return res.json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.json({ message: "Senha incorreta" });
    }

    res.json({ message: "Login bem-sucedido" });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
