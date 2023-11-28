// var socket = io("http://localhost:4040");
// var socket = io("http://172.23.36.47:4040");
var socket = io("http://10.122.77.1:4040");

function updateprodPlan() {
  socket.on("Manpower_Daily", (data) => {
    data.recordset.filter((e) => {
      if (e.Department === "Alternator Product") {
        ProdPlanAlt_value += e.ProdPlan;
        sumProdPlanAlt_chart = ProdPlanAlt_value - ProdActualAlt_value;
        if (!(ProdPlanAlt_value > 0)) ProdPlanAlt_value = 0;
        chartIdMFG1.data.datasets[0].data[0] = ProdPlanAlt_value;
        chartIdMFG1.update();
        ProdPlanAlt = formatNumber(parseFloat(sumProdPlanAlt_chart), 2);
        update_prodPlanAlt.forEach((item) => {
          item.innerHTML = `<b>${ProdPlanAlt}</b>`;
        });
      } else if (e.Department === "Starter Product") {
        ProdPlanSta_value += e.ProdPlan;
        sumProdPlanSta_chart = ProdPlanSta_value - ProdActualSta_value;
        if (!(ProdPlanSta_value > 0)) ProdPlanSta_value = 0;
        chartIdMFG2.data.datasets[0].data[0] = ProdPlanSta_value;
        chartIdMFG2.update();
        ProdPlanSta = formatNumber(parseFloat(sumProdPlanSta_chart), 2);
        update_prodPlanSta.forEach((item) => {
          item.innerHTML = `<b>${ProdPlanSta}</b>`;
        });
      } else if (e.Department === "ECC, ABS & Asmo Product") {
        ProdPlanECC_value += e.ProdPlan;
        sumProdPlanECC_chart = ProdPlanECC_value - ProdActualECC_value;
        if (!(ProdPlanECC_value > 0)) ProdPlanECC_value = 0;
        chartIdMFG3.data.datasets[0].data[0] = ProdPlanECC_value;
        chartIdMFG3.update();
        ProdPlanECC = formatNumber(parseFloat(sumProdPlanECC_chart), 2);
        update_prodPlanECC.forEach((item) => {
          item.innerHTML = `<b>${ProdPlanECC}</b>`;
        });
      } else if (e.Department === "Parts Mfg.1") {
        ProdPlanPart1_value += e.ProdPlan;
        sumProdPlanPart1_chart = ProdPlanPart1_value - ProdActualPart1_value;
        if (!(ProdPlanPart1_value > 0)) ProdPlanPart1_value = 0;
        chartIdPART1.data.datasets[0].data[0] = ProdPlanPart1_value;
        chartIdPART1.update();
        ProdPlanPart1 = formatNumber(parseFloat(sumProdPlanPart1_chart), 2);
        update_prodPlanPart1.forEach((item) => {
          item.innerHTML = `<b>${ProdPlanPart1}</b>`;
        });
      } else if (e.Department === "Parts Mfg.2") {
        ProdPlanPart2_value += e.ProdPlan;
        sumProdPlanPart2_chart = ProdPlanPart2_value - ProdActualPart2_value;
        if (!(ProdPlanPart2_value > 0)) ProdPlanPart2_value = 0;
        chartIdPART2.data.datasets[0].data[0] = ProdPlanPart2_value;
        chartIdPART2.update();
        ProdPlanPart2 = formatNumber(parseFloat(sumProdPlanPart2_chart), 2);
        update_prodPlanPart2.forEach((item) => {
          item.innerHTML = `<b>${ProdPlanPart2}</b>`;
        });
      }
    });
    update_prodPlan.forEach((item) => {
      console.log(data.recordset);
      data.recordset.filter((e) => {
        ProdPlanAct += e.ProdPlan;
        item.innerHTML = `<b>${formatNumber(ProdPlanAct)}</b>`;
      });
    });
  });
}
