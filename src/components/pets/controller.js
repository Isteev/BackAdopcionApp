
import services from './services.js';

const controller = {};

controller.getPets = (req, res) => {
    services
        .getPets()
        .then(({ result, status = 200 }) => {
            res.status(status).send(result);
        })
        .catch((err) =>{
            res.statusCode(400).send(err);
        });
}

controller.postPets = (req, res) => {
    const { body } = req;

    services.postPets(body)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

export default controller;