const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();
app.set("views", path.join(__dirname));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dhruvdb1",
});

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + db.threadId);
});

//CreateTable
app.get("/createtable/:tableName", (req, res) => {
  console.log("RQ");
  const sql = `CREATE TABLE dhruvdb1.${req.params.tableName}(
        id INT AUTO_INCREMENT, PRIMARY KEY (id));`;
  db.query(sql, function (error) {
    if (error) throw error;
    res.send("Table Created");
    console.log("Table Created");
  });
});
//DropTable
app.get("/droptable/:tableName", (req, res) => {
  const sql = `DROP TABLE ${req.params.tableName};`;
  db.query(sql, function (error) {
    if (error) throw error;
    res.send("Table Deleted");
    console.log("Table Deleted");
  });
});

//CreateColumn
app.get("/createcolumn/:TableName/:ColumnName", (req, res) => {
  const sql = `ALTER TABLE ${req.params.TableName} ADD COLUMN ${req.params.ColumnName} ${req.query.prop};`;
  db.query(sql, function (error) {
    if (error) throw error;
    res.send("column Created");
    console.log("column Created");
  });
});

//DropColumn
app.get("/dropcolumn/:TableName/:ColumnName", (req, res) => {
  const sql = `ALTER TABLE ${req.params.TableName} DROP COLUMN ${req.params.ColumnName};`;
  db.query(sql, function (error) {
    if (error) throw error;
    res.send("column Droped");
    console.log("column Droped");
  });
});
//view Whole Table
app.get("/viewtables/:tableName", (req, res) => {
  const sql = `SELECT * FROM ${req.params.tableName};`;

  db.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
    console.log(results);
  });
});

//view whole column
app.get("/viewcolumns/:tableName/:columnName", (req, res) => {
  const sql = `SELECT ${req.params.columnName} FROM ${req.params.tableName};`;

  db.query(sql, function (error, results) {
    if (error) throw error;

    res.send(results);
    console.log(results);
  });
});

//Insert Data in Column
app.get("/insertData/:tableName/:columnName/:data", (req, res) => {
  const sql = `INSERT INTO ${req.params.tableName} (${req.params.columnName}) VALUE ("${req.params.data}");`;

  db.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
    console.log(results);
  });
});

//
var PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`App is Up and Running on Port ${PORT}`);
});
