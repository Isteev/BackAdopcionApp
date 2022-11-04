import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";
import { PetImage } from "../../modules/petImages/model.js";
import { Likes } from "../likes/model.js";

export const Pet = sequelize.define(
  "pets",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    adoption_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);

Pet.hasMany(Likes, {
  foreignKey: "pet_id",
  sourceKey: "id",
});

Likes.belongsTo(Pet, {
  foreignKey: "pet_id",
  targetKey: "id",
});

Pet.hasMany(PetImage, {
  foreignKey: "pet_id",
  sourceKey: "id",
});

PetImage.belongsTo(Pet, {
  foreignKey: "pet_id",
  targetKey: "id",
});
