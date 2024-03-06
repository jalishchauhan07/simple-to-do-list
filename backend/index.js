const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect(function (err) {
  if (err) throw err;
});

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).send({ status: 200, message: "Testing Router" });
});

app.post("/insertList", (req, res) => {
  try {
    const sql = `INSERT INTO todolist (title,description,completed ) VALUES ('${
      req.body.title
    }', '${req.body.description}','${req.body.completed ? 1 : 0}')`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send({
        status: 200,
        message: `Number of records inserted: ${result.affectedRows}`,
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.post("/updateList", (req, res) => {
  try {
    const sql = `Update todolist SET completed=${req.body.completed} where id=${req.body.id}`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send({
        status: 200,
        message: `Number of records updated: ${result.affectedRows}`,
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.get("/getList", (req, res) => {
  try {
    const sql = `SELECT * from todolist `;
    connection.query(sql, function (err, result) {
      if (err) throw err;

      return res.status(200).send({ status: 200, data: result });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.post("/delete", (req, res) => {
  try {
    const sql = `DELETE FROM todolist WHERE id='${req.body.id}'`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send({
        status: 200,
        message: `Number of records deleted: ${result.affectedRows}`,
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.listen(8080, () => {
  console.log("Server is listening on 8080");
});
