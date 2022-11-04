import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Likes = sequelize.define("likes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
});
