const mysql = require("mysql2");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").Server(app);
const path = require("path");
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

// const config = {
//   user: "densoinfo",
//   password: "DensoInfo",
//   database: "RTDensoLineInfo",
//   server: "172.23.3.9",
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

const config = {
  user: "densoinfo",
  password: "densoinfo",
  database: "RTDensoLineInfo",
  server: "10.72.220.14",
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

const appPool = new sql.ConnectionPool(config);

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

const nowdate = new Date("2023-10-30");
const Date_Today = nowdate.toISOString();
const today = getPreviousDay();
const todayDate = today.toISOString();
let todayDate_result = todayDate.slice(0, 10);
let monthDate_result = todayDate.slice(0, 7);
let today_Loss = todayDate.slice(8, 10);

let today_Loss_result = Date_Today.slice(8, 10);
let yearDate_result = Date_Today.slice(0, 4);
let monthDate = Date_Today.slice(5, 7);

console.log(today_Loss);
console.log(monthDate);
console.log(yearDate_result);
const date = today_Loss_result + monthDate + yearDate_result;
const TodaydateforExpense = "01" + monthDate + yearDate_result;
console.log(date);

const x = "'" + todayDate_result + " 00:00:00.000'";
const y = "'" + monthDate_result + "-01 00:00:00.000'";

const firstdate = "'" + monthDate_result + "-01 00:00:00.000'";
const lastdate = "'" + monthDate_result + "-" + today_Loss + " 00:00:00.000'";

var filter = "";
console.log(filter);

const req_message_Loss =
  "SELECT RxNo, RxNo_Line, ItemNo, Code, Description, Minute, ManPower, ManPowerHour FROM tbDailyWorkRecord WHERE ProductionDate = " +
  x +
  " AND DataModule = 'LOSS'";

const req_message_ProdAct =
  "SELECT RxNo_Line,Value FROM tbProductionActual LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
  x +
  " AND ValueType = 'OK' AND Department in ('Alternator Product', 'ECC, ABS & Asmo Product','Parts Mfg.1','Parts Mfg.2','Starter Product')";

const req_message_ProdPlan =
  "SELECT RxNo,RxNo_Line,PlanMonth,ProdPlanPerMonth,WorkingDay FROM tbManPowerPlan WHERE PlanMonth = " +
  y +
  " AND RxNo_Line != 'PRS2308000000005' AND RxNo_Line != 'PRS2301000000009'";

const req_message_commonDay =
  "SELECT DataCode,DataValue FROM tbCommonData WHERE DataType = 'WORK_DAY'";

const req_message_ProdAct_per_date =
  "SELECT [ProductionDate],[ShiftNo],[NetTime],[CycleTime],[Value],[tbLine].[Code] AS LineCode, [tbLine].[Name] AS LineName, [tbLine].[ID], [tbSection].[Code] AS SectionCode, [tbSection].[Department] FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate >= " +
  firstdate +
  " AND ProductionDate <= " +
  lastdate +
  "AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') ORDER BY Department";

const req_message_ProdAct_s =
  "SELECT [ProductionDate],[NetTime],[CycleTime],[Value],[tbLine].[Code] AS LineCode, [tbLine].[Name] AS LineName, [tbLine].[ID], [tbSection].[Code] AS SectionCode, [tbSection].[Department] FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate = " +
  x +
  "AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') ORDER BY Department";

const req_message_Losss =
  "SELECT [tbDailyWorkRecord].[ProductionDate], [tbDailyWorkRecord].[Code] as Code, [tbDailyWorkRecord].[Description], [tbDailyWorkRecord].[Shift],[tbDailyWorkRecord].[Minute], [tbLine].[Code] as LineCode, [tbLine].[Name],[tbSection].[Code] as SectionCode, [tbSection].[Department] FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
  x +
  " AND DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') ORDER BY Department";

const req_message_mp_plan =
  "SELECT [tbManPowerPlan].[RxNo],[tbManPowerPlan].[RxNo_Line],[tbManPowerPlan].[PlanMonth],[tbManPowerPlan].[ProdPlanPerMonthPrior],[tbManPowerPlan].[WorkingDayPrior],[tbManPowerPlan].[ProdPlanPerMonth],[tbManPowerPlan].[WorkingDayPlan],[tbLine].[Code] AS LineCode, [tbLine].[Name] AS LineName, [tbLine].[ID], [tbSection].[Code] AS SectionCode, [tbSection].[Department] FROM [RTDensoLineInfo].[dbo].[tbManPowerPlan] LEFT JOIN tbLine on tbManPowerPlan.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE PlanMonth = " +
  y +
  "AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') ORDER BY Department";

const req_message_mp_daily =
  "SELECT MAX([tbLine].[ID]) AS ID, MAX([tbLine].[Code]) AS LineCode,MAX([tbLine].[Name]) AS LineName,MAX([tbSection].[Code]) AS SectionCode,MAX([tbSection].[Department]) AS Department,SUM([tbManPowerPlan].[ProdPlanPerMonth]) AS SUMProdPlanPerMonth,MAX([tbManPowerPlan].[ProdPlanPerMonth]) / MAX([tbManPowerPlan].[WorkingDay]) AS ProdPlan FROM [RTDensoLineInfo].[dbo].[tbLine] LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo LEFT JOIN tbManPowerPlan on tbLine.RxNo = tbManPowerPlan.RxNo_Line WHERE PlanMonth = " +
  firstdate +
  " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') GROUP BY [tbLine].[RxNo] ORDER BY ID";

const req_message_DLMP =
  "SELECT MAX([ProductionDate]) as ProductionDate, MAX([Shift]) as Shift, SUM([InLine_WT]) as InLine_WT, SUM([OutLine_WT]) as OutLine_WT, SUM([Mizusumashi_WT]) as Mizusumashi_WT, SUM([LineLeader_WT]) as LineLeader_WT, SUM([TeamLeader_WT]) as TeamLeader_WT, MAX([tbLine].[Code]) AS LineCode, MAX([tbLine].[Name]) AS LineName, MAX([tbLine].[ID]) AS ID, MAX([tbSection].[Code]) AS SectionCode, MAX([tbSection].[Department]) as Department FROM [RTDensoLineInfo].[dbo].[tbDailyManPower] LEFT JOIN tbLine on tbDailyManPower.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
  x +
  " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') GROUP BY Department ORDER BY Department";

const req_message_LossRanking =
  "SELECT MAX([tbDailyWorkRecord].[Code]) as x, SUM([tbDailyWorkRecord].[Minute]) as Minute, MAX([tbLine].[Code]) as LineCode, MAX([tbLine].[Name]) as LineName, MAX([tbSection].[Code]) as SectionCode, MAX([tbSection].[Department]) as Department, MAX([tbDailyWorkCode].[CodeName]) as CodeName FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo LEFT JOIN tbDailyWorkCode on tbDailyWorkCode.Code = tbDailyWorkRecord.Code WHERE ProductionDate = " +
  x +
  " AND tbDailyWorkRecord.DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') GROUP BY [tbDailyWorkRecord].[Code] ORDER BY Minute DESC";
// console.log(req_message_LossRanking);

const req_message_LossRanking_month =
  "SELECT MAX([tbDailyWorkRecord].[Code]) AS Code, SUM([tbDailyWorkRecord].[Minute]) as Minute,  MAX([tbLine].[Code]) as LineCode, MAX([tbLine].[Name]) as LineName, MAX([tbSection].[Code]) as SectionCode, MAX([tbSection].[Department]) as Department FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate >= " +
  firstdate +
  " AND ProductionDate <= " +
  lastdate +
  " AND DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') GROUP BY [tbDailyWorkRecord].[Code] ORDER BY Code";

const req_message_Dekidaka =
  "SELECT Distinct([tbProductionActual].[RxNo]) as RxNo,([HourNo]) as HourNo,([ProductionDate]) as ProductionDate,([ShiftNo]) as ShiftNo,([Value]) as Value,[CT].CycleTime as CT FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbPartLine on tbProductionActual.RxNo_Line = tbPartLine.RxNo_Line LEFT JOIN (SELECT MAX([RxNo_Line]) as RxNo_Line, Avg([CycleTime]) as CycleTime FROM [RTDensoLineInfo].[dbo].[tbPartLine] GROUP BY RxNo_Line) as CT on CT.RxNo_Line = tbProductionActual.RxNo_Line LEFT JOIN tbLine on tbPartLine.RxNo_Line  = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'PPA' AND ShiftNo = 'A' AND ProductionDate = " +
  x +
  " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2')";

const req_message_LossSum =
  "SELECT [tbLine].[Code] AS LineCode, [tbLine].[Name] AS LineName, [tbDailyWorkRecord].[Code] AS LossCode, [tbDailyWorkRecord].[Description] AS Description, [tbDailyWorkRecord].[Minute] AS Time FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
  x +
  " AND DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') ORDER BY LineName";

const req_message_Data =
  "SELECT DISTINCT([tbSection].[Name]) AS SectionName, [tbSection].[Code] AS Code,[tbLine].[Name] AS LineName, CONCAT([tbSection].[Code], '-',[tbLine].[Name]) AS sumCode FROM [RTDensoLineInfo].[dbo].[tbLine] LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2')";

const req_message_Data_Line =
  "SELECT DISTINCT([tbSection].[Name]) AS SectionName, [tbLine].[Name] AS LineName, CONCAT([tbSection].[Code], '-',[tbLine].[Name]) AS sumCode FROM [RTDensoLineInfo].[dbo].[tbLine] LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2')";

const req_message_OALossSum =
  "SELECT MAX(tbLine.Code) AS LineCode, MAX(tbLine.Name) AS LineName, MAX(tbSection.Department) AS Department, SUM(Value) AS ProdAct, SUM(Value) / (MAX(53568) / (SUM(Value * CycleTime) / SUM(Value))) AS OA, (SUM(Value) / (MAX(53568) / (SUM(Value * CycleTime) / SUM(Value)))) * 100 AS perOA FROM tbProductionActual LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate = " +
  x +
  " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
  filter +
  " AND Value IS NOT NULL AND Value != 0 GROUP BY tbLine.Code";

const req_message_for_point =
  "SELECT MAX([tbLine].[RxNo]) as RxNo_Line, MAX([tbSection].[Code]) as SectionCode,MAX([Department]) AS Department,MAX([tbLine].[Code]) AS LineCode,MAX([tbLine].[Name]) AS LineName,SUM([Value]) AS Value,MAX([tbProductionActual].[UpdateDate]) AS UpdateDate,MAX(ProdPlanPerMonth) / MAX(WorkingDay) as ProdPlanPerDay, MAX(71568) / (SUM(Value * CycleTime) / SUM(Value)) AS PlanPerCap, (SUM(Value) / SUM(Value) / (MAX(71568) / (SUM(Value * CycleTime)))) * 100 AS perOA FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbManPowerPlan on tbManPowerPlan.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate = " +
  x +
  " AND PlanMonth = " +
  y +
  " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') AND [tbLine].[Name] IS NOT NULL AND [tbLine].[Code] IS NOT NULL AND [tbProductionActual].[Value] != 0 GROUP BY tbLine.Code";
// console.log(req_message_for_point);

const req_message_Stock_donut =
  "SELECT Line_name,Customer_name,Process_type, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null and Process_type = 'Assy' GROUP BY Process_type";

const req_message_Stock_bar =
  "SELECT Line_name,Customer_name, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null GROUP BY Customer_name order by Stock_Cost desc limit 5";

const req_message_Abnormal_bar =
  "SELECT Line_code,Main_Process_name as Line_Name, SUM(Abnormal_Stock) AS Required_stock FROM vwstock_status_abnormal WHERE Abnormal_Stock > 0 and Process_type = 'Assy' GROUP BY Line_code order by Abnormal_Stock desc limit 5";

const req_message_riskstock =
  "SELECT risk_stock.PROCS, SUM(risk_stock.MOHTQ) as Risk_Stock, avg(master_process.Risk_Stock_Max)* sum(customer_order.ORQTY) as Sum_Max, avg(master_process.Risk_Stock_Min)* sum(customer_order.ORQTY) as Sum_Min FROM inventory_db.risk_stock LEFT JOIN customer_order ON risk_stock.NOSUFFIX = customer_order.PNO LEFT JOIN master_process ON risk_stock.PROCS = master_process.PROCS Group By risk_stock.PROCS Order by Risk_Stock DESC limit 10";

const req_message_riskstockbyWH =
  "SELECT WH, SUM(risk_stock.MOHTQ) as Risk_Stock, avg(master_process.Risk_Stock_Max)* sum(customer_order.ORQTY) * 21 as Sum_Max, avg(master_process.Risk_Stock_Min)* sum(customer_order.ORQTY) * 21 as Sum_Min FROM inventory_db.risk_stock LEFT JOIN customer_order ON risk_stock.NOSUFFIX = customer_order.PNO LEFT JOIN master_process ON risk_stock.PROCS = master_process.PROCS WHERE WH != 'No Use' Group By WH;";
const req_message_riskstockbyprocess =
  "SELECT risk_stock.PROCS, SUM(risk_stock.MOHTQ) as Risk_Stock, avg(master_process.Risk_Stock_Max)* sum(customer_order.ORQTY) as Sum_Max, avg(master_process.Risk_Stock_Min)* sum(customer_order.ORQTY) as Sum_Min FROM inventory_db.risk_stock LEFT JOIN customer_order ON risk_stock.NOSUFFIX = customer_order.PNO LEFT JOIN master_process ON risk_stock.PROCS = master_process.PROCS Group By risk_stock.PROCS Order by Risk_Stock DESC";
const req_message_tpm =
  "SELECT count(ID) AS Count FROM inventory_db.tpm_notify WHERE textDate = '" +
  date +
  "'";
const req_message_expense =
  "SELECT SUM(Target) AS Target, SUM(Actual) AS Actual FROM inventory_db.expenses WHERE textMonth = '" +
  TodaydateforExpense +
  "' group by textMonth";
const req_message_invest =
  "SELECT SUM(Actual) AS Actual, SUM(Target) AS Target FROM inventory_db.investment where dataMonth = '102023'";

// console.log(req_message_Dekidaka);

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

app.get("/Losss", function (req, res) {
  req.app.locals.db.query(req_message_Losss, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/ManpowerPlan", function (req, res) {
  req.app.locals.db.query(req_message_mp_plan, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/ManpowerDaily", function (req, res) {
  req.app.locals.db.query(req_message_mp_daily, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/DLMP", function (req, res) {
  req.app.locals.db.query(req_message_DLMP, function (err, recorfset) {
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

app.get("/ProdActs", function (req, res) {
  req.app.locals.db.query(req_message_ProdAct_s, function (err, recorfset) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send(recorfset);
  });
});

app.get("/ProdActDate", function (req, res) {
  req.app.locals.db.query(
    req_message_ProdAct_per_date,
    function (err, recorfset) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.send(recorfset);
    }
  );
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

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/Main/index.html"));
});
app.use(express.static(__dirname));

const route1 = require("./routes/route.js");

app.get("/path", route1);

var filter = "";
var filterLine = "";

io.on("connection", (socket) => {
  socket.on("filterdataLineName", (data) => {
    console.log(data);
    filterLine = "AND tbLine.Name = '" + data + "'";
    const req_message_ProdAct_per_dates =
      "SELECT MAX([ProductionDate]) AS ProductionDate,SUM([Value]) AS Value,MAX([tbLine].[Code]) AS LineCode, MAX([tbLine].[Name]) AS LineName, MAX([tbSection].[Code]) AS SectionCode, MAX([tbSection].[Name]) AS SectionName, MAX([tbSection].[Department]) AS Department FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate >= " +
      firstdate +
      " AND ProductionDate <= " +
      lastdate +
      " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine +
      " GROUP BY ProductionDate ORDER BY Department";
    // console.log(req_message_ProdAct_per_dates);
    appPool.query(
      req_message_ProdAct_per_dates,
      function (err, result, fields) {
        socket.emit("req_message_ProdAct_per_date", result);
      }
    );
    const req_message_mp_dailys =
      "SELECT MAX([tbLine].[ID]) AS ID, MAX([tbLine].[Code]) AS LineCode,MAX([tbLine].[Name]) AS LineName,MAX([tbSection].[Code]) AS SectionCode,MAX([tbSection].[Department]) AS Department,SUM([tbManPowerPlan].[ProdPlanPerMonth]) AS SUMProdPlanPerMonth,MAX([tbManPowerPlan].[ProdPlanPerMonth]) / MAX([tbManPowerPlan].[WorkingDay]) AS ProdPlan, MAX([tbSection].[Name]) AS SectionName FROM [RTDensoLineInfo].[dbo].[tbLine] LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo LEFT JOIN tbManPowerPlan on tbLine.RxNo = tbManPowerPlan.RxNo_Line WHERE PlanMonth = " +
      firstdate +
      " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine +
      " GROUP BY [tbLine].[RxNo] ORDER BY ID";
    appPool.query(req_message_mp_dailys, function (err, result, fields) {
      socket.emit("Manpower_Daily", result);
    });
    const req_message_Lossss =
      "SELECT [tbDailyWorkRecord].[ProductionDate], [tbDailyWorkRecord].[Code] as Code, [tbDailyWorkRecord].[Description], [tbDailyWorkRecord].[Shift],[tbDailyWorkRecord].[Minute], [tbLine].[Code] as LineCode, [tbLine].[Name],[tbSection].[Code] as SectionCode, [tbSection].[Department] FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
      x +
      " AND DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine +
      " ORDER BY Department";
    appPool.query(req_message_Lossss, function (err, result, fields) {
      socket.emit("req_message_Losss", result);
    });
    const req_message_LossRankings =
      "SELECT MAX([tbDailyWorkRecord].[Code]) as x, SUM([tbDailyWorkRecord].[Minute]) as Minute, MAX([tbLine].[Code]) as LineCode, MAX([tbLine].[Name]) as LineName, MAX([tbSection].[Name]) as SectionName, MAX([tbSection].[Department]) as Department FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
      x +
      " AND DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine +
      " GROUP BY [tbDailyWorkRecord].[Code] ORDER BY Minute DESC";
    appPool.query(req_message_LossRankings, function (err, result, fields) {
      socket.emit("req_message_LossRanking", result);
    });
    const req_message_LossSums =
      "SELECT [tbLine].[Code] AS LineCode, [tbLine].[Name] AS LineName, [tbDailyWorkRecord].[Code] AS LossCode, [tbDailyWorkRecord].[Description] AS Description, [tbDailyWorkRecord].[Minute] AS Time FROM [RTDensoLineInfo].[dbo].[tbDailyWorkRecord] LEFT JOIN tbLine on tbDailyWorkRecord.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ProductionDate = " +
      x +
      " AND DataModule = 'LOSS' AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine +
      " ORDER BY LineName";
    console.log(req_message_LossSums);
    appPool.query(req_message_LossSums, function (err, result, fields) {
      socket.emit("req_message_LossSum", result);
    });
    const req_message_OALossSums =
      "SELECT MAX(tbLine.Code) AS LineCode, MAX(tbLine.Name) AS LineName, MAX(tbSection.Department) AS Department, SUM(Value) AS ProdAct, SUM(Value) / (MAX(53568) / (SUM(Value * CycleTime) / SUM(Value))) AS OA, (SUM(Value) / (MAX(53568) / (SUM(Value * CycleTime) / SUM(Value)))) * 100 AS perOA FROM tbProductionActual LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate = " +
      x +
      " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine +
      " AND Value IS NOT NULL AND Value != 0 GROUP BY tbLine.Code";
    // console.log(req_message_OALossSums);
    appPool.query(req_message_OALossSums, function (err, result, fields) {
      socket.emit("req_message_OALossSum", result);
    });
    const req_message_Dekidakas =
      "SELECT Distinct([tbProductionActual].[RxNo]) as RxNo,([tbProductionActual].[RxNo_Line]) as RxNo_Line,([HourNo]) as HourNo,([ProductionDate]) as ProductionDate,([ShiftNo]) as ShiftNo,([Value]) as Value,[CT].CycleTime as CT FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbPartLine on tbProductionActual.RxNo_Line = tbPartLine.RxNo_Line LEFT JOIN (SELECT MAX([RxNo_Line]) as RxNo_Line, Avg([CycleTime]) as CycleTime FROM [RTDensoLineInfo].[dbo].[tbPartLine] GROUP BY RxNo_Line) as CT on CT.RxNo_Line = tbProductionActual.RxNo_Line LEFT JOIN tbLine on tbPartLine.RxNo_Line  = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'PPA' AND ShiftNo = 'A' AND ProductionDate = " +
      x +
      " AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
      filterLine;

    // console.log(req_message_Dekidakas);
    appPool.query(req_message_Dekidakas, function (err, result, fields) {
      socket.emit("req_message_Dekidaka", result);
    });
  });

  appPool.query(req_message_commonDay, function (err, result, fields) {
    socket.emit("CommonDay", result);
    // console.log('Sent CommonDay!')
  });
  appPool.query(req_message_mp_daily, function (err, result, fields) {
    socket.emit("Manpower_Daily", result);
  });
  // }, 2000)
  appPool.query(req_message_ProdAct_per_date, function (err, result, fields) {
    socket.emit("req_message_ProdAct_per_date", result);
  });
  appPool.query(req_message_ProdAct_s, function (err, result, fields) {
    socket.emit("req_message_ProdAct_s", result);
  });
  appPool.query(req_message_DLMP, function (err, result, fields) {
    socket.emit("req_message_DLMP", result);
  });
  appPool.query(req_message_Losss, function (err, result, fields) {
    socket.emit("req_message_Losss", result);
  });
  appPool.query(req_message_LossRanking, function (err, result, fields) {
    socket.emit("req_message_LossRanking", result);
  });
  appPool.query(req_message_LossRanking_month, function (err, result, fields) {
    socket.emit("req_message_LossRanking_month", result);
  });
  appPool.query(req_message_Dekidaka, function (err, result, fields) {
    socket.emit("req_message_Dekidaka", result);
  });
  appPool.query(req_message_LossSum, function (err, result, fields) {
    socket.emit("req_message_LossSum", result);
  });
  appPool.query(req_message_Data, function (err, result, fields) {
    socket.emit("req_message_Data", result);
  });
  // console.log(req_message_Data);
  appPool.query(req_message_OALossSum, function (err, result, fields) {
    socket.emit("req_message_OALossSum", result);
  });
  appPool.query(req_message_Data_Line, function (err, result, fields) {
    socket.emit("req_message_Data_Line", result);
  });
  appPool.query(req_message_for_point, function (err, result, fields) {
    socket.emit("req_message_for_point", result);
  });
  pool.query(req_message_Stock_donut, function (err, result, fields) {
    socket.emit("req_message_Stock_donut", result);
  });
  pool.query(req_message_Stock_bar, function (err, result, fields) {
    socket.emit("req_message_Stock_bar", result);
  });
  pool.query(req_message_Abnormal_bar, function (err, result, fields) {
    socket.emit("req_message_Abnormal_bar", result);
  });
  pool.query(req_message_riskstock, function (err, result, fields) {
    socket.emit("req_message_riskstock", result);
  });
  pool.query(req_message_riskstockbyWH, function (err, result, fields) {
    socket.emit("req_message_riskstockbyWH", result);
  });
  pool.query(req_message_riskstockbyprocess, function (err, result, fields) {
    socket.emit("req_message_riskstockbyprocess", result);
  });
  pool.query(req_message_tpm, function (err, result, fields) {
    socket.emit("req_message_tpm", result);
  });
  pool.query(req_message_expense, function (err, result, fields) {
    socket.emit("req_message_expense", result);
  });
  pool.query(req_message_invest, function (err, result, fields) {
    socket.emit("req_message_invest", result);
  });
});

// connect the pool and start the web server when done
appPool
  .connect()
  .then(function (pool) {
    app.locals.db = pool;
    const server = http.listen(4040, () => {
      const port = server.address().port;
      console.log(`running at http://localhost:${port}/`);
      // console.log('Example app listening at http://%s:%s', host, port)
    });
  })
  .catch(function (err) {
    console.error("Error creating connection pool", err);
  });
