import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { HealthProtocol } from "../models";
import { HealthProtocolRepository } from "../repositories/HealthProtocolRepository";

class HealthProtocolController {
    async create(request: Request, response: Response) {
        const body = request.body
        //body.disease_name = body.disease_name.trim()

        const healthProtocolRepository = getCustomRepository(HealthProtocolRepository)
        const IsAlreadyRegistered = healthProtocolRepository.findOne({
            description: body.description
        })

        if (IsAlreadyRegistered) {
            return response.status(400).json({
                error: "Health protocol has already been registered!"
            })
        }

        const healthProtocol = healthProtocolRepository.create(body)
        
        await healthProtocolRepository.save(healthProtocol)

        return response.json(healthProtocol)
        
    }

    async list(request: Request, response: Response){
        const healthProtocolRepository = getCustomRepository(HealthProtocolRepository)

        const healthProtocolList = await healthProtocolRepository.find()

        return response.json(healthProtocolList)
    }

    async getOne(request: Request, response: Response){
        const {description} = request.params

        const healthProtocolRepository = getCustomRepository(HealthProtocolRepository)

        const health_protocol = await healthProtocolRepository.findOne({
            description: description
        })
        
        if(!health_protocol){
            return response.status(404).json({
                error: "Health Protocol not found"
            })
        }

        return response.status(302).json(health_protocol)
    }

    async alterOne(request: Request, response: Response){
        const body = request.body
        const {description} = request.params

        const healthProtocolRepository = getCustomRepository(HealthProtocolRepository)

        const health_protocol = await healthProtocolRepository.findOne({
            description: description
        })
        
        if(!health_protocol){
            return response.status(404).json({
                error: "Health Protocol not found"
            })
        }

        healthProtocolRepository.createQueryBuilder()
        .update(HealthProtocol)
        .set(body)
        .where("description = :description", { description: description })
        .execute();

        return response.status(200).json(body)
    }

    async deleteOne(request: Request, response: Response){
        const {description} = request.params

        const healthProtocolRepository = getCustomRepository(HealthProtocolRepository)

        const health_protocol = await healthProtocolRepository.findOne({
            description: description
        })
        
        if(!health_protocol){
            return response.status(404).json({
                error: "Health Protocol not found"
            })
        }

        healthProtocolRepository.createQueryBuilder()
        .delete()
        .from(HealthProtocol)
        .where("description = :description", { description: description })
        .execute();

        return response.status(200).json("Health Protocol Deleted")
    }
}

export { HealthProtocolController };

