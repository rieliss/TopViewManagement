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
}
QC_Btn.onclick = function () {
    QC_Modal.style.display = "block";
    hide.style.display = "none";
}
cost_Btn.onclick = function () {
    cost_Modal.style.display = "block";
    hide.style.display = "none";
}
delivery_Btn.onclick = function () {
    delivery_Modal.style.display = "block";
    hide.style.display = "none";
}
Prod_Btn.onclick = function () {
    Prod_Modal.style.display = "block";
    hide.style.display = "none";
}
Energy_Btn.onclick = function () {
    Energy_Modal.style.display = "block";
    hide.style.display = "none";
}

span_safety.onclick = function () {
    safety_Modal.style.display = "none";
    hide.style.display = "block";
}
span_QC_.onclick = function () {
    QC_Modal.style.display = "none";
    hide.style.display = "block";
}

span_cost.onclick = function () {
    cost_Modal.style.display = "none";
    hide.style.display = "block";
}

span_delivery.onclick = function () {
    delivery_Modal.style.display = "none";
    hide.style.display = "block";
}

span_Prod.onclick = function () {
    Prod_Modal.style.display = "none";
    hide.style.display = "block";
}

span_Energy.onclick = function () {
    Energy_Modal.style.display = "none";
    hide.style.display = "block";
}

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        safety_Modal.style.display = "none";
        QC_Modal.style.display = "none";
        cost_Modal.style.display = "none";
        delivery_Modal.style.display = "none";
        Prod_Modal.style.display = "none";
        Energy_Modal.style.display = "none";
        hide.style.display = "block";
    }
})

window.onclick = function (event) {
    if (event.target == QC_Modal || event.target == safety_Modal || event.target == cost_Modal || event.target == delivery_Modal || event.target == Prod_Modal || event.target == Energy_Modal) {
        safety_Modal.style.display = "none";
        QC_Modal.style.display = "none";
        cost_Modal.style.display = "none";
        delivery_Modal.style.display = "none";
        Prod_Modal.style.display = "none";
        Energy_Modal.style.display = "none";
        hide.style.display = "block";
    }
}

Prod_Modal.style.display = "block"