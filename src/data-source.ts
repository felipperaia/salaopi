import { DataSource } from "typeorm";
import { User } from "./entidade/user"; // Ajustar para importar a entidade corretamente.

export const AppDataSource = new DataSource({
  type: "mysql", // Tipo de banco de dados.
  host: "localhost", // Endereço do banco de dados.
  port: 3306, // Porta do MySQL.
  username: "root", // Usuário do banco.
  password: "sua_senha", // Senha do banco de dados.
  database: "seu_banco", // Nome do banco de dados.
  synchronize: true, // Sincroniza a estrutura do banco (use apenas em desenvolvimento).
  logging: true, // Exibe logs no console.
  entities: [User], // Aqui estamos importando as entidades diretamente, não com caminho.
  migrations: [], // Se você tiver migrações, adicione-as aqui.
  subscribers: [],
});
