import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
const app = express();
const port = 3000;
app.use(morgan("dev"));
const planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" }
];
app.get('/api/planets', (req, res) => {
    res.status(200).json(planets);
});
app.get('/api/planets/:id', (req, res) => {
    const { id } = req.params;
    const planet = planets.find(p => p.id === Number(id));
    res.status(200).json(planet);
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
