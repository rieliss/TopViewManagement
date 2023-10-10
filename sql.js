const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "10.122.77.1",
  port: "3306",
  user: "iot_admin",
  password: "1234",
  database: "inventory_db",
  // database: 'inventory_db'
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
});
app.get("/stock", function (req, res) {
  connection.query(
    "SELECT Customer_name,stock_qty FROM vwstock_by_cust ",
    function (err, result, fields) {
      res.json(result);
    }
  );
});

io.on("connection", (socket) => {
  console.log("user connected");
  connection.query(
    "SELECT Line_name,Customer_name,Process_type, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null and Process_type = 'Assy' GROUP BY Line_name",
    function (err, result, fields) {
      socket.emit("stockdonut", result); //Donut chart of Inventory_cost
      // console.log(result);
      console.log("Sent!");
    }
  );
  connection.query(
    "SELECT Line_name,Customer_name, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null GROUP BY Customer_name order by Stock_Cost desc limit 10",
    function (err, result, fields) {
      socket.emit("stockbar", result); //Bar chart of Inventory_cost by customer Limit 5
      console.log("Sent!");
    }
  );
  console.log("user connected");
  connection.query(
    "SELECT Line_code,Main_Process_name as Line_Name, SUM(Abnormal_Stock) AS Required_stock FROM vwstock_status_abnormal WHERE Abnormal_Stock > 0 and Process_type = 'Assy'  GROUP BY Line_code order by Abnormal_Stock desc",
    function (err, result, fields) {
      socket.emit("abnormalbar", result); // Abnormal Chart by line , Total = Sum alll line
      // console.log(result);
      console.log("Sent!");
    }
  );
  connection.query(
    "SELECT in_Date as ProductionDate, KeyID,Line,in_time,in_time_hour,if(Cap_per_hour is null,0,round(avg(Cap_per_hour),0)) as Prod_Capacity_Plan, SUM(Actual_QTY) AS Prod_Actual_Qty FROM vwstock_status_achievement WHERE in_time is not null and in_time_hour between '07:00' and '19:00' GROUP BY KeyID order by in_time_hour asc, DateVal desc",
    function (err, result, fields) {
      socket.emit("ProdAchievement", result);
      // console.log(result);
      console.log("Sent!");
    }
  );
  connection.query(
    "SELECT Customer_name as CUSTOMER,part_no as PART_NO,Process_Name as LINE_NAME,ORQTY as ORDER_QTY,round(criteria_max,1) As MAX,round(criteria_min,0) as MIN,SUM(stock_qty) AS STOCK_QTY,Status as STATUS FROM vwstock_status_tbdetail WHERE Cust_line_Part is not null and Process_type = 'Assy' and ActvieStatus = 'Active' and stock_qty > 0 GROUP BY part_no order by Status desc",
    function (err, result, fields) {
      socket.emit("tbDetail", result);
      // console.log(result);
      console.log("Sent!");
    }
  );

  var filterLine1 = "";
  var filterMfg = "";
  var filterLine2 = "";
  var filterLine3 = "";
  var filterDate = "";

  socket.on("filterLine", (data) => {
    // console.log(data);
    // if (data == "None")
    filterLine1 = " AND  vwstock_by_cust.Line_name = '" + data + "'";
    const req_message_Stock_donut =
      "SELECT Line_name,Process_type, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null" +
      filterLine1 +
      " " +
      filterMfg +
      " GROUP BY Line_name";
    // console.log(req_message_Stock_donut);
    connection.query(req_message_Stock_donut, function (err, result, fields) {
      socket.emit("stockdonut", result);
    });
  });

  socket.on("filterMfg", (data) => {
    // console.log(data);
    // if (data == "None")
    filterMfg = " AND  vwstock_by_cust.Process_type = '" + data + "'";
    const req_message_Stock_donut =
      "SELECT Line_name,Process_type, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null  " +
      filterLine1 +
      " " +
      filterMfg +
      " GROUP BY Line_name";
    // console.log(req_message_Stock_donut);
    connection.query(req_message_Stock_donut, function (err, result, fields) {
      socket.emit("stockdonut", result);
    });
  });

  socket.on("filterLine", (data) => {
    // console.log(data);
    // if (data == "None")
    filterLine1 = "AND  vwstock_by_cust.Line_name = '" + data + "'";
    const req_message_Stock_Bar =
      "SELECT Line_name,Customer_name, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null  " +
      filterLine1 +
      "" +
      filterMfg +
      "  GROUP BY Customer_name order by Stock_Cost desc limit 10";
    // console.log(req_message_Stock_Bar);
    connection.query(req_message_Stock_Bar, function (err, result, fields) {
      socket.emit("stockbar", result);
    });
  });

  socket.on("filterMfg", (data) => {
    // console.log(data);
    // if (data == "None")
    filterMfg = " AND  vwstock_by_cust.Process_type = '" + data + "'";
    const req_message_Stock_Bar =
      "SELECT Line_name,Customer_name, SUM(Inv_Cost) AS Stock_Cost FROM vwstock_by_cust where Process_type is not null  " +
      filterLine1 +
      "" +
      filterMfg +
      "  GROUP BY Customer_name order by Stock_Cost desc limit 10";
    // console.log(req_message_Stock_Bar);
    connection.query(req_message_Stock_Bar, function (err, result, fields) {
      socket.emit("stockbar", result);
    });
  });

  socket.on("filterdata", (data) => {
    // console.log(data);
    // if (data == "None")
    filterLine2 = "AND  vwstock_status_achievement.Line = '" + data + "'";
    const req_message_Achievement_per_dates =
      "SELECT in_Date as ProductionDate, KeyID,Line,in_time,in_time_hour,if(Cap_per_hour is null,0,round(avg(Cap_per_hour),0)) as Prod_Capacity_Plan, SUM(Actual_QTY) AS Prod_Actual_Qty FROM vwstock_status_achievement WHERE in_time is not null and in_time_hour between '07:00' and '19:00' " +
      filterLine2 +
      " " +
      filterDate +
      " GROUP BY KeyID order by in_time_hour asc, DateVal desc";
    // console.log(req_message_Achievement_per_dates);
    connection.query(
      req_message_Achievement_per_dates,
      function (err, result, fields) {
        socket.emit("ProdAchievement", result);
      }
    );
  });
  socket.on("filterDate", (data) => {
    // console.log(data);
    // if (data == "None")
    filterDate = "AND  vwstock_status_achievement.in_Date = '" + data + "'";
    const req_message_ProdDate_per_dates =
      "SELECT in_Date as ProductionDate, KeyID,Line,in_time,in_time_hour,if(Cap_per_hour is null,0,round(avg(Cap_per_hour),0)) as Prod_Capacity_Plan, SUM(Actual_QTY) AS Prod_Actual_Qty FROM vwstock_status_achievement WHERE in_time is not null and in_time_hour between '07:00' and '19:00' " +
      filterLine2 +
      " " +
      filterDate +
      " GROUP BY KeyID order by in_time_hour asc, DateVal desc";
    // console.log(req_message_ProdDate_per_dates);
    connection.query(
      req_message_ProdDate_per_dates,
      function (err, result, fields) {
        socket.emit("ProdAchievement", result);
      }
    );
  });

  socket.on("filterLine", (data) => {
    // console.log(data);
    // if (data == "None")
    filterLine3 = "AND  vwstock_status_tbdetail.Line_name = '" + data + "'";
    const req_message_tbdetail =
      "SELECT Customer_name as CUSTOMER,part_no as PART_NO,Process_Name as LINE_NAME,ORQTY as ORDER_QTY,round(criteria_max,1) As MAX,round(criteria_min,0) as MIN,SUM(stock_qty) AS STOCK_QTY,Status as STATUS FROM vwstock_status_tbdetail WHERE Cust_line_Part is not null and Process_type = 'Assy' and ActvieStatus = 'Active' and stock_qty > 0 " +
      filterLine3 +
      " GROUP BY part_no order by Status desc";
    // console.log(req_message_tbdetail);
    connection.query(req_message_tbdetail, function (err, result, fields) {
      socket.emit("tbDetail", result);
    });
  });
});

http.listen(3000, () => {
  console.log("Server start in port 3000");
});
