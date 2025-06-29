CREATE DATABASE sgteDB;

    USE sgteDB;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    
    INSERT INTO users (username, password_hash)
VALUES 
    ('joaopedro', '2064'), -- 'password'
    ('larissabrito', 'abc123'), -- 'abc123'
    ('admin', 'admin'), -- 'admin'
    ('usuario1', 'test'), -- 'test'
    ('visitante', '1234'); -- '1234'