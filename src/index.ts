import "reflect-metadata";
import express from "express";
import path from "path";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import dotenv from "dotenv"; //lembrar de ajustar lógica do jsonwebtoken

dotenv.config();

const app = express();
const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
  });

//configuração do CORS para permitir requisições do front-end (ajustar, razão disso é o "token" e algumas 
//funcionalidades que vamos precisar... não sei se vamos usar isso já que é sistema simples)
app.use(cors({
  origin: "http://localhost:5500", //servidor para a URL do seu front-end, ainda não sei se é necessário...
  methods: "GET,POST",
  credentials: true,
}));

// Middleware para permitir o envio de JSON no corpo das requisições
app.use(express.json());

// Definindo as rotas estáticas
app.use(express.static(path.join(__dirname, "../telas")));
app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/imgs", express.static(path.join(__dirname, "../imgs")));
app.use("/javascript", express.static(path.join(__dirname, "../javascript")));

//rota pra nossa API de usuários
app.use("/api/user", userRoutes);

//rota tela index.html (front-end)
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../telas/index.html"));
});

//iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse: http://localhost:${PORT}`);
});
