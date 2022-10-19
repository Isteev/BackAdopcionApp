import { deleteLocalFile } from "../../utils/deleteLocalFile.js";
import { deleteFile, uploadFile } from "../../storage/bucket.js";
import { serverResponse } from "../../utils/serverResponse.js";
import { Pet } from "./model.js";
import { PetImage } from "../../modules/petImages/model.js";

export const getAllPets = async (req, res) => {
  try {
    const { type, gender, breed_id } = req.body;
    let where = {};

    if (type) where.pet_type_id = type;
    if (gender) where.gender = gender;
    if (breed_id) where.breed_id = breed_id;

    const response = await Pet.findAll({
      where: where,
      include: PetImage,
      order: [["id", "DESC"]],
    });

    res.status(200).send(response);
  } catch (err) {
    response.status(400).send(err);
  }
};

export const getPets = async (req, res) => {};

export const getPetById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Pet.findOne({ where: { id }, include: PetImage });
    res.status(200).send(serverResponse({ data: response }));
  } catch (err) {
    res.status(500).send(err);
  }
};

export const registerPet = async (req, res) => {
  try {
    //por el momento no existe forma de validar que una persona
    //no publique la misma mascota 2 veces, queda pendiente esta validación.
    // const pet = await Pet.findOne({
    //     where: {
    //     }
    // })
    // if (pet) {
    //   res
    //     .status(200)
    //     .send({ message: "La mascota ya existe mai nigga", status: "dudoso" });
    //   return;
    // }

    if (!req.body || req.files.length === 0) {
      res.status(200).send(
        serverResponse({
          status: "dudoso",
          message: "No es posible agregar una mascota",
        })
      );
      return;
    }

    const { dataValues } = await Pet.create(req.body);

    req.files.forEach(async (file) => {
      const fileData = await uploadFile(file);
      await PetImage.create({
        key: fileData.Key,
        url: fileData.Location,
        pet_id: dataValues.id,
      });
      deleteLocalFile(file.path);
    });

    res.status(200).send(
      serverResponse({
        message: "Mascota registrada",
        data: dataValues,
      })
    );
  } catch (err) {
    res.status(500).send(serverResponse({ status: "dudoso", error: err }));
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = JSON.parse(req.body.data);
    const { id } = req.params;

    await Pet.update({ ...pet }, { where: { id } });

    if (req.files && req.files.length > 0) {
      req.files.map(async (file) => {
        await uploadFile(file);
        await PetImage.create({
          key: file.Key,
          url: file.Location,
          pet_id: file.id,
        });
        deleteLocalFile(file.path);
      });
    }

    if (pet.delete_images?.length > 0) {
      pet.delete_images.map(async (key) => {
        await deleteFile(key);
        await PetImage.destroy({
          where: { key: key },
        });
      });
    }

    res.status(200).send(serverResponse({ message: "Mascota actualizada" }));
  } catch (err) {
    res.status(500).send(serverResponse({ status: "dudoso", error: err }));
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Pet.update({ status: 0 }, { where: { id } });
    console.log(response);
    if (response[0] === 0) {
      res.status(200).send(serverResponse({ message: "La mascota no existe" }));
      return;
    }
    res.status(200).send(serverResponse({ message: "Mascota eliminada" }));
  } catch (err) {
    res.status(500).send(serverResponse({ status: "dudoso", error: err }));
  }
};
