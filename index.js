import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import bodyParser from "body-parser";
import "dotenv/config.js";

// sequelize db
import { sequelize } from "./src/database/database.js";

// routes
import breeds from "./src/modules/breeds/routes.js";
import cities from "./src/modules/cities/routes.js";
import countries from "./src/modules/countries/routes.js";
import documentTypes from "./src/modules/documentTypes/routes.js";
import localities from "./src/modules/localities/routes.js";
import oauth from "./src/modules/oauth/routes.js";
import pets from "./src/modules/pets/routes.js";
import petTypes from "./src/modules/petTypes/routes.js";
import users from "./src/modules/users/routes.js";
import likes from "./src/modules/likes/routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("The server is Ok");
});

app.use("/breeds", breeds);
app.use("/cities", cities);
app.use("/countries", countries);
app.use("/document-types", documentTypes);
app.use("/localities", localities);
app.use("/oauth", oauth);
app.use("/pets", pets);
app.use("/pet-types", petTypes);
app.use("/users", users);
app.use("/likes", likes);

const PORT = 3000;
const runServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Sync has completed successfully.");
    await server.listen(PORT);
    console.log(`Server running successfully, PORT: ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

runServer();
