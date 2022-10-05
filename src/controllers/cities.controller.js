import { City } from "../models/City.js";

export const getCities = async (req, res) => {
  City.findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};