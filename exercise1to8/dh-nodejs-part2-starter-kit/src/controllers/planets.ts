//Exercise 3, Add Controllers
// import { Request,Response } from "express";
// import Joi from "joi";

// type Planet={
//     id:number,
//     name:string,
// }s
// type Planets=Planet[];

// let planets:Planets=[
//     {id:1, name:"Earth"},
//     {id:2,name:"Mars"}
// ]

// const getAll=(req:Request, res:Response) => {
//     res.status(200).json(planets)
//   };

// const getOneById=(req:Request, res:Response) => {
//     const {id}=req.params;
//     const planet=planets.find(p=>p.id===Number(id));
//     res.status(200).json(planet)
//   };
//   const planetSchema=Joi.object({
//     id:Joi.number().integer().required(),
//     name:Joi.string().required()
//   })
// const create=(req:Request, res:Response)=>{
//     const {id,name}=req.body;
//     const newPlanet:Planet={id,name};
//     const validationPlanet=planetSchema.validate(newPlanet);
//     if(validationPlanet.error){
//         res.status(400).json({msg: validationPlanet.error.details[0].message})
//     }else{
//     planets=[...planets,newPlanet];
//     res.status(201).json({msg: "the planet was created"});
//     }
//   };
// const updateById=(req:Request, res:Response)=>{
//     const {id}=req.params;
//     const {name}=req.body;
//     planets=planets.map(p=>p.id===Number(id)?({...p,name}):p);
//     res.status(200).json({msg: "The planet was updated"})

//   };
// const deleteById=(req:Request, res:Response)=>{
//     const{id}=req.params;
//     planets=planets.filter(p=>p.id!==Number(id));
//     res.status(200).json({msg: "the planet was deleted"})
//   };

//   export {
//     getAll,
//     getOneById,
//     create,
//     updateById,
//     deleteById
//   }



import { Request,Response } from "express";
import Joi from "joi";

import { db } from "./../db.js";






const getAll=async (req:Request, res:Response) => {
  const planets=await db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets)
  };

const getOneById=async (req:Request, res:Response) => {
    const {id}=req.params;
    const planet=await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`,Number(id));
    res.status(200).json(planet)
  };
  const planetSchema=Joi.object({
    name:Joi.string().required()
  })
const create=async(req:Request, res:Response)=>{
    const {name}=req.body;
    const newPlanet={name};
    const validationPlanet=planetSchema.validate(newPlanet);
    if(validationPlanet.error){
        res.status(400).json({msg: validationPlanet.error.details[0].message})
    }else{
    await db.none(`INSERT INTO planets (name) VALUES ($1)`,name)
    res.status(201).json({msg: "the planet was created"});
    }
  };
const updateById=(req:Request, res:Response)=>{
    const {id}=req.params;
    const {name}=req.body;
    db.none(`UPDATE planets set name=$2 WHERE id=$1 `,[id,name])
    res.status(200).json({msg: "The planet was updated"})

  };
const deleteById=async(req:Request, res:Response)=>{
    const{id}=req.params;
    await db.none(`DELETE FROM planets WHERE id=($1)`,Number(id))
    res.status(200).json({msg: "the planet was deleted"})
  };
 const createImage=async(req:Request, res:Response)=>{
  console.log(req.file);
  const {id}=req.params;
  const fileName=req.file?.path;
  if(fileName){
    db.none(`UPDATE planets sets image=$2 WHERE id=$1`,[id,fileName]);
    res.status(201).json({msg:"The image uploaded succesfully"});
  }
  else{
    res.status(400).json({msg:"The image failed to upload"});
  }
 }

  export {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById,
    createImage
  }
