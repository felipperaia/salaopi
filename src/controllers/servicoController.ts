import { Request, Response } from "express";
import { Service } from "../entidade/servico";
import { getRepository } from "typeorm";
//controller dos serviços disponiveis para agendamento, ainda precisa verificar o .js de Michel e ajustar as informações aqui também, além de verificar outras telas
export class ServiceController {
    static async listServices(req: Request, res: Response) {
        const serviceRepository = getRepository(Service);
        const services = await serviceRepository.find();
        res.json(services);
    }

    static async scheduleService(req: Request, res: Response) {
        const { userId, serviceId, date } = req.body;
        //lógica básica para agendar os serviços, ainda falta implementar mais coisas, peguei da net
    }
}
