socket.on("filterdata", (data) => {
  // console.log(data);
  // if (data == "None")
  filter = "AND tbSection.Name = '" + data + "'";
  const req_message_ProdAct_per_dates =
    "SELECT [ProductionDate],[ShiftNo],[NetTime],[CycleTime],[Value],[tbLine].[Code] AS LineCode, [tbLine].[Name] AS LineName, [tbLine].[ID], [tbSection].[Code] AS SectionCode, [tbSection].[Name] AS SectionName, [tbSection].[Department] FROM [RTDensoLineInfo].[dbo].[tbProductionActual] LEFT JOIN tbLine on tbProductionActual.RxNo_Line = tbLine.RxNo LEFT JOIN tbWorkCenter on tbLine.RxNo_WorkCenter = tbWorkCenter.RxNo LEFT JOIN tbSection on tbWorkCenter.RxNo_Section = tbSection.RxNo WHERE ValueType = 'OK' AND ProductionDate >= " +
    firstdate +
    " AND ProductionDate <= " +
    lastdate +
    "AND Department IN ('Alternator Product', 'Starter Product', 'ECC, ABS & Asmo Product', 'Parts Mfg.1', 'Parts Mfg.2') " +
    filter +
    " ORDER BY Department";
  // console.log(req_message_ProdAct_per_dates);
  appPool.query(req_message_ProdAct_per_dates, function (err, result, fields) {
    socket.emit("req_message_ProdAct_per_date", result);
  });
});
