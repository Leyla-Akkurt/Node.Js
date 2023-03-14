
// import express from  'express';
// import 'express-async-errors';
// import morgan from 'morgan';

// const app = express()
// const port = 3000

// app.use(morgan("dev"));

// app.get('/', (req, res) => {
//   res.status(200).json({msg: 'Hello World!'})
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })



////Exercise 1, Set up a simple Express App
// import express from  'express';
// import 'express-async-errors';
// import morgan from 'morgan';
// import Joi from "joi";

// const app = express()
// const port = 3000

// app.use(morgan("dev"));

// type Planet={
//     id:number,
//     name:string,
// }
// type Planets=Planet[];

// const planets=[
//     {id:1, name:"Earth"},
//     {id:2,name:"Mars"}
// ]

// app.get('/api/planets', (req, res) => {
//   res.status(200).json(planets)
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })


// Exercise 2, CRUD with dummy database
// import express from  'express';
// import 'express-async-errors';
// import morgan from 'morgan';
// import Joi from "joi";

// const app = express()
// const port = 3000

// app.use(morgan("dev"));

// type Planet={
//     id:number,
//     name:string,
// }
// type Planets=Planet[];

// const planets=[
//     {id:1, name:"Earth"},
//     {id:2,name:"Mars"}
// ]

// app.get('/api/planets', (req, res) => {
//   res.status(200).json(planets)
// })

// app.get('/api/planets/:id', (req, res) => {
//     const {id}=req.params;
//     const planet=planets.find(p=>p.id===Number(id));
//     res.status(200).json(planet)
//   })
//   const planetSchema=Joi.object({
//     id:Joi.number().integer().required(),
//     name:Joi.string().required()
//   })
// app.post('/api/planets/:id',req:Request, res:Response)=>{
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

//app.put('/api/planets/:id',(req:Request, res:Response)=>{
//     const {id}=req.params;
//     const {name}=req.body;
//     planets=planets.map(p=>p.id===Number(id)?({...p,name}):p);
//     res.status(200).json({msg: "The planet was updated"})

//app.delete('/api/planets/:id',(req:Request, res:Response)=>{
//     const{id}=req.params;
//     planets=planets.filter(p=>p.id!==Number(id));
//     res.status(200).json({msg: "the planet was deleted"})
//   };

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })


//Exercise 4, Add Postgres DB
//Exercise 5, Upload files
//Exercise 6, JWT Auth part 1
//Exercise 7, JWT Auth part 2
//Exercise 8, JWT Auth part 3
import express from  'express';
import 'express-async-errors';
import morgan from 'morgan';
import multer from 'multer';
import "./passport.js"
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage
} from "./controllers/planets.js";
import {logIn,signUp,logOut} from "./controllers/users.js";
import autorize from "./autorize.js"

const app = express()

const port = 3000

app.use(morgan("dev"));
app.use(express.json());


type Planet={
    id:number,
    name:string,
}
type Planets=Planet[];

let planets=[
    {id:1, name:"Earth"},
    {id:2,name:"Mars"}
]

app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById)
app.post("/api/planets",create);
app.put("/api/planets/:id",updateById)

app.delete("/api/planets/:id",deleteById)
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./uploads");
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
}
});
const upload=multer({storage});
app.post("/api/planets/:id/image",upload.single("image"),createImage);
app.post("/api/users/login",logIn);
app.post("/api/users/signup",signUp);
app.get("/api/users/logout",autorize,logOut);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
