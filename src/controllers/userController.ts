import { Request, Response } from "express";
import { User } from "../entidade/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
//controller dos usuários, (aqui vamos fazer basicamente o "CRUD" do usuário, para controlar entre o Front-END e o BD)
//preciso lembrar de verificar as tabelas dos bd com os meninos
export class UserController {
    static async register(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        const userRepository = getRepository(User);
        const existingUser = await userRepository.findOne({ where: { email } });
        
        if (existingUser) return res.status(400).json({ message: "Email já registrado." });

        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = userRepository.create({ nome, email, senha: hashedPassword });
        await userRepository.save(user);

        res.status(201).json(user);
    }
    //lógica do login basica também, ainda necessário implementar algumas coisas e vincular.
    static async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) return res.status(400).json({ message: "Usuário não encontrado." });

        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) return res.status(400).json({ message: "Senha incorreta." });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }

    static async updateProfile(req: Request, res: Response) {
        const { nome, telefone } = req.body;
        const userId = req.user.id; //recuperar ID do token JWT pra tela de recuperação de senha, possívelmente inutil, ainda vou verificar
        
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userId);

        if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

        user.nome = nome;
        user.telefone = telefone;
        await userRepository.save(user);

        res.json(user);
    }
}
