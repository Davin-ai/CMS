const mysql = require("mysql");

const SabzlearnShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "market",
});

module.exports = SabzlearnShopDB;
