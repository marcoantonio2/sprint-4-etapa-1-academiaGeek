const { Router } = require("express");
const router = Router();
const connection = require("../db/db.js");

router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM vehiculos;");
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/vehiculo-column", async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT numero_placa,id_linea, modelo FROM vehiculos INNER JOIN lineas ON vehiculos.id_linea = lineas.id;`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/suma-modelos", async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT SUM(modelo) suma_de_los_modelos FROM vehiculos;`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/avg-modelos", async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT AVG(modelo) promedio_de_los_modelos FROM vehiculos;`
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
      `SELECT * FROM vehiculos WHERE id=${id};`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:FECHA_VEN_SEGURO_1/:FECHA_VEN_SEGURO_2", async (req, res) => {
  try {
    const { FECHA_VEN_SEGURO_1, FECHA_VEN_SEGURO_2 } = req.params;
    const [rows] = await connection.query(
      `SELECT * FROM vehiculos WHERE fecha_vencimiento_seguro BETWEEN '${FECHA_VEN_SEGURO_1}' AND '${FECHA_VEN_SEGURO_2}';`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/modelo", async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT MIN(modelo), MAX(modelo) FROM vehiculos;`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/modelo/:modelomin/:modelomax", async (req, res) => {
  try {
    const { modelomin, modelomax } = req.params;
    const [rows] = await connection.query(
      `SELECT * FROM vehiculos WHERE modelo BETWEEN ${modelomin} AND ${modelomax};`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("", async (req, res) => {
  try {
    const { nombre } = req.body;
    console.log(Object.values(req.body));
    await connection.query(
      `
              INSERT INTO vehiculos (${Object.keys(req.body).join()})
              VALUES (?, ?, ?, ?, ?, ?, ?);
          `,
      Object.values(req.body)
    );
    res.status(200).json({ message: "Marca creada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const fields = Object.keys(req.body);
    const fieldsQuery = fields.map((field) => {
      if (typeof req.body[`${field}`] === "string") {
        return `${field} = '${req.body[`${field}`]}'`;
      } else {
        return `${field} = ${req.body[`${field}`]}`;
      }
    });

    const result = await connection.query(
      `UPDATE vehiculos SET ${fieldsQuery.join()} WHERE id = ${id}`
    );
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connection.query(
      `DELETE FROM vehiculos WHERE id = ${id}`
    );
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
