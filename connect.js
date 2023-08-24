const mysql = require("mysql2");
const sql = require("mssql");
const cors = require("cors");
const writeXlsxFile = require("write-excel-file");
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

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

const today = new Date('2023-08-23');
// const today = getPreviousDay()
const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);
console.log(todayDate_result)
// console.log(monthDate_result)
const x = "'" + todayDate_result + " 00:00:00.000'";
const y = "'" + monthDate_result + "-01 00:00:00.000'";
console.log(x)

const req_message_ProdAct =
  "SELECT RxNo_Line,Value FROM tbProductionActual WHERE ProductionDate = " + x + " AND ValueType = 'OK' AND RxNo_Line != 'PRS2308000000005'";
const req_message_ProdPlan = "SELECT RxNo_Line,PlanValue_Total as Value FROM tbMasterPlan WHERE PlanMonth = " + y;
const req_message_commonDay = ("SELECT DataCode,DataValue FROM tbCommonData WHERE DataType = 'WORK_DAY'")
const req_message_LineSummary = "SELECT RxNo_Line,Department FROM line_summary where Department in ('Alternator Product', 'ECC, ABS & Asmo Product','Parts Mfg.1','Parts Mfg.2','Starter Product')";

// console.log(req_message_ProdAct);
// console.log(req_message_ProdPlan);

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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/Main/index.html'));
});
app.use(express.static(__dirname));

//require route handlers and use the same connection pool everywhere
const route1 = require("./routes/route.js");

app.get("/path", route1);

app.get("/LineSummary", function (req, res) {
  pool.query(
    req_message_LineSummary,
    function (err, result, fields) {
      res.json(result);
    }
  );
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
    pool.query(
      req_message_LineSummary,
      function (err, result, fields) {
        io.emit('LineSummary', result)
      }
    )
  }, 2000)
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