import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { Session ,Occasion} from "../entity";

export class OccasionController extends DefaultController {
    protected initializeRoutes(): Router {
        const router = Router();

        //get all occasions
        router.route("/api/occasion").get((req: Request, res: Response) => {
            const occasionRepo = getRepository(Occasion);
            occasionRepo.find().then((occasions: Occasion[]) => {
              res.status(200).send({ occasions });
            });
          });

        //get an occasion
        router.route("/api/occasion/:id").get((req: Request, res: Response) => {
            const occasionRepo = getRepository(Occasion);
            const id = parseInt(req.params.id);
            occasionRepo.findOne(id).then((occasion: Occasion | undefined) => {
              res.status(200).send({ occasion });
            });
          });

        //create an occasion
        router.route("/api/occasion").post((req:Request, res:Response) => {

            const newOccasion = new Occasion();
            newOccasion.name = req.body.name;
            newOccasion.description = req.body.description;
            newOccasion.submitForm = req.body.submitForm;
            newOccasion.collection = req.body.collection;

            const occasionRepo = getRepository(Occasion);
            occasionRepo.save(newOccasion)
                .then((createdOccasion:Occasion) =>{
                    console.log(createdOccasion);
                    res.status(200).send({occasion: createdOccasion});
                },
                (reason:any) => {
                    res.sendStatus(500);
                });         
        })

        // update an occasion
        router.route("/api/occasion/:id").put((req:Request, res:Response) => {
            const id = parseInt(req.params.id);
            const occasionRepo = getRepository(Occasion);

            occasionRepo.findOne(id).then((foundOccasion:Occasion | undefined) => {
                if (foundOccasion){
                    if (req.body.name) foundOccasion.name = req.body.name;
                    if (req.body.description) foundOccasion.description = req.body.description;
                    if (req.body.submitForm) foundOccasion.submitForm = req.body.submitForm;
                    if (req.body.collection) foundOccasion.collection = req.body.collection;

                    console.log(foundOccasion);

                    occasionRepo.save(foundOccasion).then(updatedOccasion => {
                        res.status(200).send({occasion: updatedOccasion});
                    }, 
                    (reason:any) => {
                        console.log(reason);
                        res.sendStatus(500);
                    })
                } else {
                    res.status(404).send({reason: "Occasion Not Found"});
                }
            }, 
            () => {
                res.sendStatus(500);
            });
        });

        return router;
    }
}

export default OccasionController;