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

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

// const today = new Date('2023-08-30');
const today = getPreviousDay()
const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);
let today_Loss = todayDate.slice(8, 10);
// console.log(today_Loss)

const x = "'" + todayDate_result + " 00:00:00.000'";
const y = "'" + monthDate_result + "-01 00:00:00.000'";

const firstdate = "'" + monthDate_result + "-01 00:00:00.000'";
const lastdate = "'" + monthDate_result + "-" + today_Loss + " 00:00:00.000'";
// console.log(lastdate)

const req_message_Loss = "SELECT RxNo, RxNo_Line, ItemNo, Code, Description, Minute, ManPower, ManPowerHour FROM tbDailyWorkRecord WHERE ProductionDate = " + x + " AND DataModule = 'LOSS'"
const req_message_ProdAct = "SELECT RxNo_Line,Value FROM tbProductionActual WHERE ProductionDate = " + x + " AND ValueType = 'OK' AND RxNo_Line != 'PRS2308000000005' AND RxNo_Line != 'PRS2301000000009'";
const req_message_ProdAct_PPA = "SELECT RxNo_Line,Value,HourNo FROM tbProductionActual WHERE ProductionDate = " + x + " AND ValueType = 'PPA' AND RxNo_Line != 'PRS2308000000005' AND RxNo_Line != 'PRS2301000000009'";
const req_message_ProdAct_date = "SELECT RxNo_Line,Value,ProductionDate FROM tbProductionActual WHERE ProductionDate >= " + firstdate + " AND ProductionDate <= " + lastdate + " AND ValueType = 'OK' AND RxNo_Line != 'PRS2308000000005' AND RxNo_Line != 'PRS2301000000009'";
const req_message_mp = "SELECT RxNo,RxNo_Line,ProductionDate,InLine_WT,OutLine_WT,Mizusumashi_WT,LineLeader_WT,TeamLeader_WT FROM tbDailyManPower WHERE ProductionDate = " + x;

const req_message_ProdPlan = "SELECT RxNo_Line,PlanMonth,ProdPlanPerMonth,WorkingDay FROM tbManPowerPlan WHERE PlanMonth = " + y + " AND RxNo_Line != 'PRS2308000000005' AND RxNo_Line != 'PRS2301000000009'";
const req_message_commonDay = ("SELECT DataCode,DataValue FROM tbCommonData WHERE DataType = 'WORK_DAY'")
const req_message_LineSummary = "SELECT RxNo_Line,Department FROM line_summary where Department in ('Alternator Product', 'ECC, ABS & Asmo Product','Parts Mfg.1','Parts Mfg.2','Starter Product')";

// console.log(req_message_ProdAct_date)
console.log(req_message_ProdAct_PPA)

app.get("/Loss", function (req, res) {
  req.app.locals.db.query(req_message_Loss, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/Manpower", function (req, res) {
  req.app.locals.db.query(req_message_mp, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

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
app.get("/ProdActPPA", function (req, res) {
  req.app.locals.db.query(req_message_ProdAct_PPA, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/ProdActDate", function (req, res) {
  req.app.locals.db.query(req_message_ProdAct_date, function (err, recorfset) {
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
  // setInterval(() => {
  appPool.query(req_message_ProdAct,
    function (err, result, fields) {
      socket.emit('ProdAct', result)
      // console.log('Sent ProdAct!')
    }
  )
  appPool.query(req_message_ProdPlan,
    function (err, result, fields) {
      socket.emit('MasterPlan', result)
      // console.log('Sent ProdPlan!')
    }
  )
  appPool.query(req_message_commonDay,
    function (err, result, fields) {
      socket.emit('CommonDay', result)
      // console.log('Sent CommonDay!')
    }
  )
  pool.query(
    req_message_LineSummary,
    function (err, result, fields) {
      socket.emit('LineSummary', result)
    }
  )
  appPool.query(req_message_ProdAct_date,
    function (err, result, fields) {
      socket.emit('ProdActPerDay', result)
      // console.log('Sent CommonDay!')
    }
  )
  appPool.query(req_message_Loss,
    function (err, result, fields) {
      socket.emit('Loss', result)
      // console.log('Sent CommonDay!')
    }
  )
  appPool.query(req_message_ProdAct_PPA,
    function (err, result, fields) {
      socket.emit('ProdActPPA', result)
      // console.log('Sent ProdAct!')
    }
  )
  appPool.query(req_message_mp,
    function (err, result, fields) {
      socket.emit('Manpower', result)
      // console.log('Sent ProdAct!')
    }
  )
  // }, 2000)
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