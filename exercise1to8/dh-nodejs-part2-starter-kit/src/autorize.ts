import passport from "passport";
import { NextFunction, Request,Response } from "express";

const autorize=async (req:Request, res:Response,next:NextFunction)=>{
    passport.authenticate("jwt",{session:false},(err:any,user:any)=>{
        if(!user || err){
            res.status(401).json({msg: "unoutorize"})
        }
        else{
            req.user=user;
            next();
        }
    })(req,res,next);

};
export default autorize;
