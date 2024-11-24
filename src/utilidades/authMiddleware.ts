import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
//autenticação do usuário, preciso implementar ainda algumas verificações, por hora só consigo pensar na de recuperação de senha via o "token"
//o que encontrei, e pode ser inutil utilizar é o jsonwebtoken pra gerar tokens web válidos e podermos usar, preferiria não usar isso, não sei mexer muito
//caso queiram dar uma olhada depois aconselho a buscar as informações na documentação ou no chatgepeto
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Token não fornecido." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //ainda precisa ser implementado o processo da geração e sinceramente eu não sei se é necessário
        //esse "token" que colocaram no front-end talvez não seja o ideal para nosso sistema junto ao MySQL, por não termos muito como fazer as solicitações web para e-mails...
        // pelo menos eu ainda não sei como fazer por aqui e nem se esse jsonwebtoken funciona para isso...
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido." });
    }
};
