const { Router } = require("express");
const router = Router();
const connection = require("../db/db.js");

router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM lineas;");
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/linea-active", async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT COUNT(estado) AS cantidad_de_lineas_activas FROM lineas WHERE estado = 'S';`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await connection.query(
      `SELECT * FROM lineas WHERE id_marca=${id};`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    await connection.query(
      `
            INSERT INTO lineas (${Object.keys(req.body).join()})
            VALUES (?, ?, ?, ?);
        `,
      Object.values(req.body)
    );
    res.status(200).json({ message: "Marca creada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const fields = Object.keys(req.body);
    const fieldsQuery = fields.map((field) => {
      if (typeof req.body[`${field}`] === "string") {
        return `${field} = '${req.body[`${field}`]}'`;
      } else {
        return `${field} = ${req.body[`${field}`]}`;
      }
    });

    const result = await connection.query(
      `UPDATE lineas SET ${fieldsQuery.join()} WHERE id = ${id}`
    );
    const [rows] = await connection.query(
      `SELECT * FROM lineas WHERE id=${id};`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
