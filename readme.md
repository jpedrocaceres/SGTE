Projeto SGTE
Este projeto implementa um sistema de autenticação simples com login e registro de usuário, utilizando Node.js, Express e MySQL.

Pré-requisitos
Antes de iniciar, você precisará ter as seguintes ferramentas instaladas:

Node.js (versão 18 ou superior)
MySQL (para o banco de dados)
Configuração do Banco de Dados

1. Criar o Banco de Dados e a Tabela
    Conecte-se ao MySQL e crie o banco de dados e a tabela de usuários.
    Use o seguinte script SQL para configurar:

    CREATE DATABASE sgteDB;

    USE sgteDB;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

2. Configurar as Credenciais do Banco de Dados
No arquivo server.js, você precisará inserir as credenciais de acesso ao MySQL (usuário, senha e nome do banco de dados).

Dependências
Instale as dependências necessárias com os comandos abaixo:

    npm install express mysql2 bcryptjs body-parser cors
    npm install --save-dev @types/bcryptjs @types/cors @types/body-parser

Estrutura do Projeto
Certifique-se de organizar a estrutura de pastas conforme abaixo:

SGTE/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   │   └── register.js
│   ├── index.html
│   └── register.html
├── server.js
├── package.json
└── README.md

Descrição dos Arquivos

server.js: Configura o servidor Express, define rotas para login e registro, e conecta-se ao banco de dados.
index.html e register.html: Páginas HTML para login e registro.
style.css: Estilos CSS para a página.
script.js: Script JavaScript que faz requisições ao servidor para autenticação e registro.

Configuração do Servidor
No arquivo server.js, é necessário configurar o servidor Express para servir arquivos estáticos e rotas para login e registro. Para resolver a questão do __dirname no ES Module, incluímos:

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta public

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


Executando o Projeto
Execute o servidor com o comando:
    npm start

O servidor deve iniciar na porta 3300. Acesse http://localhost:3300/login para abrir a página de login e http://localhost:3300/register para o cadastro.

Testando o Projeto
Acesse as páginas de login e registro.
Cadastre um novo usuário e faça login com as credenciais registradas.
Possíveis Problemas
Se encontrar problemas com tipos, certifique-se de que o tsconfig.json contém a configuração esModuleInterop: true.
