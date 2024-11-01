// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3300;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static('C:\Users\jpedr\OneDrive\Documentos\GitHub\SGTE'));

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sgteDB'
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL");
    }
});

// Rota para o login
app.post('/script', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (err) return res.json({ message: "Erro no servidor" });

        if (results.length === 0) {
            return res.json({ message: "Usuário não encontrado" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: "Senha incorreta" });
        }

        res.json({ message: "Login bem-sucedido" });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
