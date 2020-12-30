DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(25),
    url VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT
);




