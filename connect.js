const mysql = require("mysql2");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").Server(app);
const path = require('path');
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const pool = mysql.createConnection({
  host: process.env.SERVER_HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
});

const config = {
  user: "densoinfo",
  password: "DensoInfo",
  database: "RTDensoLineInfo",
  server: "172.23.3.9",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

//instantiate a connection pool
const appPool = new sql.ConnectionPool(config);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/Main/index.html'));
});
app.use(express.static(__dirname));

//require route handlers and use the same connection pool everywhere
const route1 = require("./routes/route.js");

app.get("/path", route1);

app.get("/masterdata", function (req, res) {
  pool.query(
    "SELECT * FROM master_data limit 10",
    function (err, result, fields) {
      res.json(result);
    }
  );
});

const today = new Date();
const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);
// console.log(todayDate_result)
// console.log(monthDate_result)
const x = "'" + todayDate_result + " 00:00:00.000'";
const y = "'" + monthDate_result + "-01 00:00:00.000'";

const req_message_ProdAct =
  "SELECT RxNo_Line,Value FROM tbProductionActual WHERE ProductionDate = " + x + " AND ValueType = 'OK'";
const req_message_ProdPlan = "SELECT RxNo_Line,PlanValue_Total FROM tbMasterPlan WHERE PlanMonth = " + y;
const req_message_commonDay = ("SELECT DataCode,DataValue FROM tbCommonData WHERE DataType = 'WORK_DAY'")

console.log(req_message_ProdAct);
console.log(req_message_ProdPlan);

app.get("/ProdAct", function (req, res) {
  req.app.locals.db.query(req_message_ProdAct, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});
app.get("/ProdPlan", function (req, res) {
  req.app.locals.db.query(req_message_ProdPlan, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/commonDate", function (req, res) {
  req.app.locals.db.query(req_message_commonDay, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

io.on('connection', (socket) => {
  console.log('user connected')
  setInterval(() => {
    appPool.query(req_message_ProdAct,
      function (err, result, fields) {
        io.emit('ProdAct', result)
        // console.log('Sent ProdAct!')
      }
    )
    appPool.query(req_message_ProdPlan,
      function (err, result, fields) {
        io.emit('MasterPlan', result)
        // console.log('Sent ProdPlan!')
      }
    )
    appPool.query(req_message_commonDay,
      function (err, result, fields) {
        io.emit('CommonDay', result)
        // console.log('Sent CommonDay!')
      }
    )
  }, 5000)
})

// connect the pool and start the web server when done
appPool.connect().then(function (pool) {
  app.locals.db = pool;
  const server = http.listen(4040, () => {
    const port = server.address().port;
    console.log(`running at http://localhost:${port}/`);
    // console.log('Example app listening at http://%s:%s', host, port)
  });
}).catch(function (err) {
  console.error("Error creating connection pool", err);
});