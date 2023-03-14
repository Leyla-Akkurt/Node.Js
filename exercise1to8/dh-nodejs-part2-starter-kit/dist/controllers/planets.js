// import { Request,Response } from "express";
// import Joi from "joi";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from "joi";
import { db } from "./../db.js";
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
});
const planetSchema = Joi.object({
    name: Joi.string().required()
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newPlanet = { name };
    const validationPlanet = planetSchema.validate(newPlanet);
    if (validationPlanet.error) {
        res.status(400).json({ msg: validationPlanet.error.details[0].message });
    }
    else {
        yield db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
        res.status(201).json({ msg: "the planet was created" });
    }
});
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.none(`UPDATE planets set name=$2 WHERE id=$1 `, [id, name]);
    res.status(200).json({ msg: "The planet was updated" });
};
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db.none(`DELETE FROM planets WHERE id=($1)`, Number(id));
    res.status(200).json({ msg: "the planet was deleted" });
});
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file);
    const { id } = req.params;
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (fileName) {
        db.none(`UPDATE planets sets image=$2 WHERE id=$1`, [id, fileName]);
        res.status(201).json({ msg: "The image uploaded succesfully" });
    }
    else {
        res.status(400).json({ msg: "The image failed to upload" });
    }
});
export { getAll, getOneById, create, updateById, deleteById, createImage };
