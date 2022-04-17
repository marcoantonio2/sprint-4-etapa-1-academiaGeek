const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get("", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//Routes
app.use("/api/lineas/", require("./routes/lineas.js"));
app.use("/api/marcas/", require("./routes/marcas.js"));
app.use("/api/vehiculos/", require("./routes/vehiculos.js"));

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`servidor corriendo en el puerto ${app.get("port")}`);
});
