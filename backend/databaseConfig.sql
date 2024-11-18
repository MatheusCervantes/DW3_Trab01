-- Criação do banco de dados
CREATE DATABASE trabdw3;

-- Conexão com o banco de dados (usado no psql)
\c trabdw3;

-- Criação da tabela 'agencias'
CREATE TABLE IF NOT EXISTS agencias (
    agenciaid SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(15),
    email VARCHAR(255),
    data_criacao DATE DEFAULT CURRENT_DATE,
    orcamento DECIMAL(10, 2) DEFAULT 0.00, 
    removido BOOLEAN DEFAULT FALSE
);

-- Inserção de dados de exemplo na tabela 'agencias'
INSERT INTO agencias (nome, endereco, telefone, email, data_criacao, orcamento)
VALUES
    ('Agência Centro', 'Rua Central, 100 - Centro', '1234-5678', 'contato@agenciacentro.com.br', '2023-01-15', 100000.00),
    ('Agência Norte', 'Avenida Norte, 2000 - Zona Norte', '9876-5432', 'norte@agencianorte.com.br', '2023-02-20', 150000.00),
    ('Agência Sul', 'Rua Sul, 500 - Zona Sul', '5566-7788', 'sul@agenciasul.com.br', '2023-03-10', 120000.50),
    ('Agência Leste', 'Avenida Leste, 800 - Zona Leste', '4433-2233', 'leste@agencialeste.com.br', '2023-04-05', 110000.75),
    ('Agência Oeste', 'Rua Oeste, 1500 - Zona Oeste', '8899-1122', 'oeste@agenciaoeste.com.br', '2023-05-01', 130000.25);

-- Criação da tabela 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
    usuarioid BIGSERIAL CONSTRAINT pk_usuarios PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password TEXT,
    deleted BOOLEAN DEFAULT FALSE
);

-- Criação da extensão pgcrypto, caso ainda não exista
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Inserção de dados de exemplo na tabela 'usuarios' (com senhas criptografadas)
INSERT INTO usuarios (username, password)
VALUES
    ('admin', crypt('admin', gen_salt('bf'))),
    ('user', crypt('user', gen_salt('bf')))
ON CONFLICT DO NOTHING;
