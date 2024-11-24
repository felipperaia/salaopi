import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entidade/user";
//ainda necessário verificar algumas coisas e ajustar o código, está "cru"
interface UserRequestBody {
  name: string;
  email: string;
}

const router = Router();

//criação de usuário (está dando bug na requisição, lembrar de verificar)
router.post("/", async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
  try {
    const { name, email } = req.body;

    //verificação simples do usuário (não precisamos validar mais que isso, sistema fraco. lembrando que login da gente é sem muita informação)
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const user = new User(name, email); //usando o construtor para criar o usuário (no user.ts)

    // salvamento do novo usuário no banco de dados
    await AppDataSource.manager.save(user);

    return res.status(201).json(user); // Retorna o usuário recém-criado
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro ao criar usuário", error });
  }
});

//listar os usuários
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários", error });
  }
});

export default router;
