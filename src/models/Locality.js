import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Locality = sequelize.define(
  "localities",
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
  },
  {
    timestamps: false,
  }
);
