import { serverResponse } from "../../utils/serverResponse.js";
import { PetImage } from "../petImages/model.js";
import { Pet } from "../pets/model.js";
import { Likes } from "./model.js";

const controller = {};

controller.like = async (req, res) => {
  try {
    const user_id = req.header("user_id");

    if (!user_id) {
      res.status(400).send(
        serverResponse({
          status: "error",
          message: "Header user_id is required",
        })
      );
    }

    const {
      query: { status, pet_id },
    } = req;

    // status llega se creara el like si no existe
    if (status) {
      Likes.findOrCreate({
        where: {
          user_id: user_id,
          pet_id: pet_id,
        },
      })
        .then(([like, created]) => {
          if (created) {
            res.send(serverResponse({ message: "Like guardado" }));
          } else {
            res.send(
              serverResponse({
                status: "sospechoso",
                message: "Like ya existe",
              })
            );
          }
        })
        .catch((err) => {
          res.status(500).send(
            serverResponse({
              status: "sospechoso",
              message: "error al guardar el like",
              data: err,
            })
          );
        });
    } else {
      //status es null se elimina el like
      Likes.destroy({
        where: { user_id: user_id, pet_id: pet_id },
      })
        .then(() => {
          res.send(serverResponse({ message: "Dislike guardado" }));
        })
        .catch((err) => {
          res.status(500).send(
            serverResponse({
              status: "sospechoso",
              message: "error al eliminar el dislike",
              data: err,
            })
          );
        });
    }
  } catch (error) {
    res.status(500).send("server error ", error);
  }
};

controller.getLikes = async (req, res) => {
  try {
    const user_id = req.header("user_id");

    if (!user_id) {
      res.status(400).send(
        serverResponse({
          status: "error",
          message: "Header user_id is required",
        })
      );
    }

    // trae todos los likes asociados con el usuario
    // trae la data del toda la mascota
    // incluida las imagenes de la mascosa
    Likes.findAll({
      where: { user_id: user_id },
      attributes: ["status", "user_id", "pet_id"],
      include: { model: Pet, include: PetImage },
    })
      .then((result) => {
        res.send(serverResponse({ data: result }));
      })
      .catch((err) => {
        res.status(400).send(serverResponse({ status: "duduso", error: err }));
      });
  } catch (error) {
    res.status(500).send(serverResponse({ status: "duduso", error: error }));
  }
};

export default controller;
