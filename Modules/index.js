var hide = document.getElementById("item_hide_MGR");
var span_safety = document.getElementsByClassName("safety_btn_close")[0];
var span_QC_ = document.getElementsByClassName("QC_btn_close")[0];
var span_cost = document.getElementsByClassName("cost_btn_close")[0];
var span_delivery = document.getElementsByClassName("delivery_btn_close")[0];
var span_Prod = document.getElementsByClassName("Prod_btn_close")[0];
var span_Energy = document.getElementsByClassName("Energy_btn_close")[0];

var safety_Modal = document.getElementById("safety_Modal");
var Safety_Btn = document.getElementById("Safety_Btn");

var QC_Modal = document.getElementById("QC_Modal");
var QC_Btn = document.getElementById("QC_Btn");

var cost_Modal = document.getElementById("cost_Modal");
var cost_Btn = document.getElementById("cost_Btn");

var delivery_Modal = document.getElementById("delivery_Modal");
var delivery_Btn = document.getElementById("delivery_Btn");

var Prod_Modal = document.getElementById("Prod_Modal");
var Prod_Btn = document.getElementById("Prod_Btn");

var Energy_Modal = document.getElementById("Energy_Modal");
var Energy_Btn = document.getElementById("Energy_Btn");

Safety_Btn.onclick = function () {
  safety_Modal.style.display = "block";
  hide.style.display = "none";
};
QC_Btn.onclick = function () {
  QC_Modal.style.display = "block";
  hide.style.display = "none";
};
cost_Btn.onclick = function () {
  cost_Modal.style.display = "block";
  hide.style.display = "none";
};
delivery_Btn.onclick = function () {
  delivery_Modal.style.display = "block";
  hide.style.display = "none";
};
Prod_Btn.onclick = function () {
  Prod_Modal.style.display = "block";
  hide.style.display = "none";
};
Energy_Btn.onclick = function () {
  Energy_Modal.style.display = "block";
  hide.style.display = "none";
};

span_safety.onclick = function () {
  safety_Modal.style.display = "none";
  hide.style.display = "block";
};
span_QC_.onclick = function () {
  QC_Modal.style.display = "none";
  hide.style.display = "block";
};

span_cost.onclick = function () {
  cost_Modal.style.display = "none";
  hide.style.display = "block";
};

span_delivery.onclick = function () {
  delivery_Modal.style.display = "none";
  hide.style.display = "block";
};

span_Prod.onclick = function () {
  Prod_Modal.style.display = "none";
  hide.style.display = "block";
};

span_Energy.onclick = function () {
  Energy_Modal.style.display = "none";
  hide.style.display = "block";
};

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Enter") {
    safety_Modal.style.display = "none";
    QC_Modal.style.display = "none";
    cost_Modal.style.display = "none";
    delivery_Modal.style.display = "none";
    Prod_Modal.style.display = "none";
    Energy_Modal.style.display = "none";
    hide.style.display = "block";
    hide_point2.style.display = "block";
    hide_point3.style.display = "block";
    hide_point4.style.display = "block";
    hide_point5.style.display = "block";
    hide_point1.style.display = "block";
  }
});

window.onclick = function (event) {
  if (
    event.target == QC_Modal ||
    event.target == safety_Modal ||
    event.target == cost_Modal ||
    event.target == delivery_Modal ||
    event.target == Prod_Modal ||
    event.target == Energy_Modal
  ) {
    safety_Modal.style.display = "none";
    QC_Modal.style.display = "none";
    cost_Modal.style.display = "none";
    delivery_Modal.style.display = "none";
    Prod_Modal.style.display = "none";
    Energy_Modal.style.display = "none";
    hide.style.display = "block";
  }
};

var hide_point1 = document.getElementById("item_hide_Alternator_Product");
var hide_point2 = document.getElementById("item_hide_Starter_Product");
var hide_point3 = document.getElementById("item_hide_ECC_ABS");
var hide_point4 = document.getElementById("item_hide_Parts2");
var hide_point5 = document.getElementById("item_hide_Parts1");

var mng_mfg1 = document.getElementById("mng_mfg1");
var mng_mfg2 = document.getElementById("mng_mfg2");
var mng_mfg3 = document.getElementById("mng_mfg3");
var mng_part1 = document.getElementById("mng_part1");
var mng_part2 = document.getElementById("mng_part2");
var mng_assy = document.getElementById("mng_assy");
var mng_part = document.getElementById("mng_part");

mng_mfg1.onclick = function () {
  hide_point2.style.display = "none";
  hide_point3.style.display = "none";
  hide_point4.style.display = "none";
  hide_point5.style.display = "none";
  hide_point1.style.display = "block";
};
mng_mfg2.onclick = function () {
  hide_point2.style.display = "block";
  hide_point3.style.display = "none";
  hide_point4.style.display = "none";
  hide_point5.style.display = "none";
  hide_point1.style.display = "none";
};
mng_mfg3.onclick = function () {
  hide_point2.style.display = "none";
  hide_point3.style.display = "block";
  hide_point4.style.display = "none";
  hide_point5.style.display = "none";
  hide_point1.style.display = "none";
};
mng_part1.onclick = function () {
  hide_point2.style.display = "none";
  hide_point3.style.display = "none";
  hide_point4.style.display = "block";
  hide_point5.style.display = "none";
  hide_point1.style.display = "none";
};
mng_part2.onclick = function () {
  hide_point2.style.display = "none";
  hide_point3.style.display = "none";
  hide_point4.style.display = "none";
  hide_point5.style.display = "block";
  hide_point1.style.display = "none";
};
mng_assy.onclick = function () {
  hide_point2.style.display = "block";
  hide_point3.style.display = "block";
  hide_point4.style.display = "none";
  hide_point5.style.display = "none";
  hide_point1.style.display = "block";
};
mng_part.onclick = function () {
  hide_point2.style.display = "none";
  hide_point3.style.display = "none";
  hide_point4.style.display = "block";
  hide_point5.style.display = "block";
  hide_point1.style.display = "none";
};

var QC_hide = document.querySelectorAll(".hide-item-7");
var safety_hide = document.querySelectorAll(".hide-item-6");
var cost_hide = document.querySelectorAll(".hide-item-8");
var delivery_hide = document.querySelectorAll(".hide-item-14-2");
var Prod_hide = document.querySelectorAll(".hide-item-14-3");
var Energy_hide = document.querySelectorAll(".hide-item-14-4");

// window.onclick = function (event) {
//   if (
//     event.target == QC_hide ||
//     event.target == safety_hide ||
//     event.target == cost_hide ||
//     event.target == delivery_hide ||
//     event.target == Prod_hide ||
//     event.target == Energy_hide
//   ) {
//     safety_Modal.style.display = "none";
//     QC_Modal.style.display = "none";
//     cost_Modal.style.display = "none";
//     delivery_Modal.style.display = "none";
//     Prod_Modal.style.display = "none";
//     Energy_Modal.style.display = "none";
//     hide.style.display = "block";
//   }
// };

// delivery_Modal.style.display = "block";

var myDIV1 = document.getElementById("myDIV1");
var myDIV2 = document.getElementById("myDIV2");
var IV_btn = document.getElementById("toggleDivButtonIV");
var EC_btn = document.getElementById("toggleDivButtonEC");

var Defect = document.getElementById("Mydefect");
var InterLoss = document.getElementById("Myinterloss");
var Df_btn = document.getElementById("defectbutton");
var IL_btn = document.getElementById("interlossbutton");

IV_btn.onclick = function () {
  myDIV2.style.display = "none";
  myDIV1.style.display = "block";
  safety_Modal.style.display = "none";
  QC_Modal.style.display = "none";
  cost_Modal.style.display = "none";
  delivery_Modal.style.display = "none";
  Prod_Modal.style.display = "none";
  Energy_Modal.style.display = "none";
  hide.style.display = "none";
};

EC_btn.onclick = function () {
  myDIV2.style.display = "block";
  myDIV1.style.display = "none";
  safety_Modal.style.display = "none";
  QC_Modal.style.display = "none";
  cost_Modal.style.display = "none";
  delivery_Modal.style.display = "none";
  Prod_Modal.style.display = "none";
  Energy_Modal.style.display = "none";
  hide.style.display = "none";
};

Df_btn.onclick = function () {
  InterLoss.style.display = "none";
  Defect.style.display = "block";
  safety_Modal.style.display = "none";
  QC_Modal.style.display = "none";
  cost_Modal.style.display = "none";
  delivery_Modal.style.display = "none";
  Prod_Modal.style.display = "none";
  Energy_Modal.style.display = "none";
  hide.style.display = "none";
};

IL_btn.onclick = function () {
  InterLoss.style.display = "block";
  Defect.style.display = "none";
  safety_Modal.style.display = "none";
  QC_Modal.style.display = "none";
  cost_Modal.style.display = "none";
  delivery_Modal.style.display = "none";
  Prod_Modal.style.display = "none";
  Energy_Modal.style.display = "none";
  hide.style.display = "none";
};
