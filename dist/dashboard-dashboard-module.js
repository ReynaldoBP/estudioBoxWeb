(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./src/app/_pipes/PipeRedSocial.ts":
/*!*****************************************!*\
  !*** ./src/app/_pipes/PipeRedSocial.ts ***!
  \*****************************************/
/*! exports provided: PipeRedSocial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipeRedSocial", function() { return PipeRedSocial; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PipeRedSocial = /** @class */ (function () {
    function PipeRedSocial() {
    }
    PipeRedSocial.prototype.transform = function (items, buscar) {
        if (!items || !buscar) {
            return items;
        }
        return items.find(function (item) {
            return item['DESCRIPCION'] == buscar.toUpperCase();
        });
    };
    PipeRedSocial = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filterRedSocial',
            pure: false
        })
    ], PipeRedSocial);
    return PipeRedSocial;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard1/dashboard1.component */ "./src/app/dashboard/dashboard1/dashboard1.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_2__["Dashboard1Component"],
                data: {
                    title: 'Dashboard 1'
                }
            },
        ]
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/dashboard/dashboard-routing.module.ts");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-chartist */ "./node_modules/ng-chartist/dist/ng-chartist.js");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng_chartist__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard1/dashboard1.component */ "./src/app/dashboard/dashboard1/dashboard1.component.ts");
/* harmony import */ var app_pipes_PipeRedSocial__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/_pipes/PipeRedSocial */ "./src/app/_pipes/PipeRedSocial.ts");
/* harmony import */ var app_pipes_PipeCliente__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/_pipes/PipeCliente */ "./src/app/_pipes/PipeCliente.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__["DashboardRoutingModule"],
                ng_chartist__WEBPACK_IMPORTED_MODULE_4__["ChartistModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__["NgSelectModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            ],
            exports: [],
            declarations: [
                _dashboard1_dashboard1_component__WEBPACK_IMPORTED_MODULE_6__["Dashboard1Component"],
                app_pipes_PipeRedSocial__WEBPACK_IMPORTED_MODULE_7__["PipeRedSocial"],
                app_pipes_PipeCliente__WEBPACK_IMPORTED_MODULE_8__["PipeClienteTotalGenero"]
            ],
            providers: [],
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard1/dashboard1.component.html":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashboard1/dashboard1.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Statistics cards Starts-->\r\n<div class=\"row\">\r\n\t<div class=\"col-sm-12\">\r\n\t\t<div class=\"card\">\r\n\t\t\t<div class=\"card-header\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-sm-6\" *ngIf=\"user.strTipoRol == 'ADMINISTRADOR'\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"projectinput5\">Criterios de Búsqueda</label>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-12\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<ng-select [items]=\"arrayRestaurante\" [multiple]=\"false\" [closeOnSelect]=\"true\"\r\n\t\t\t\t\t\t\t\t\t\t[hideSelected]=\"false\" bindLabel=\"strNombreComercial\" bindValue=\"intIdEmpresa\"\r\n\t\t\t\t\t\t\t\t\t\tplaceholder=\"Seleccione Empresas\" [(ngModel)]=\"objSelectEmpresa\"\r\n\t\t\t\t\t\t\t\t\t\t(change)=\"getDashboard(objSelectEmpresa)\">\r\n\t\t\t\t\t\t\t\t\t</ng-select>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-sm-6\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"projectinput5\">Rango de fechas</label>\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-6\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<select id=\"cmbMes\" [(ngModel)]=\"intAnioEncuestas\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\tname=\"cmbMes\" (change)=\"getDashboard('')\">\r\n\t\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let item of arrayAnio\" value=\"{{item.intIdAnio}}\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t{{item.strAnio}}\r\n\t\t\t\t\t\t\t\t\t\t\t</option>\r\n\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-6\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<select id=\"cmbMes\" [(ngModel)]=\"intMesEncuestas\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\tname=\"cmbMes\" (change)=\"getDashboard('')\">\r\n\t\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let item of arrayMonthNames\" value=\"{{item.intIdMes}}\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t{{item.strMes}}\r\n\t\t\t\t\t\t\t\t\t\t\t</option>\r\n\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-sm-6\" *ngIf=\"user.strTipoRol != 'ADMINISTRADOR'\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"projectinput5\">Sucursal</label>\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<ng-select [items]=\"arraySucursal\" [multiple]=\"false\" [closeOnSelect]=\"true\"\r\n\t\t\t\t\t\t\t\t\t\t\t[hideSelected]=\"false\" bindLabel=\"strNombre\" bindValue=\"intIdSucursal\"\r\n\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Seleccione\" [(ngModel)]=\"intSelectSucursal\"\r\n\t\t\t\t\t\t\t\t\t\t\t(change)=\"getDashboard('')\">\r\n\t\t\t\t\t\t\t\t\t\t</ng-select>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class=\"row\">\r\n\t<!--Card View de total de encuestas en el mes-->\r\n\t<div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\r\n\t\t<div class=\"card gradient-blackberry\">\r\n\t\t\t<div class=\"card-body\">\r\n\t\t\t\t<div class=\"card-block pt-2 pb-0\">\r\n\t\t\t\t\t<div class=\"media\">\r\n\t\t\t\t\t\t<div class=\"media-body white text-left\">\r\n\t\t\t\t\t\t\t<h3 class=\"font-large-1 mb-0\">{{intTotalEncuesta}}</h3>\r\n\t\t\t\t\t\t\t<span>{{'Encuestas ' + monthNames[intMesEncuestas-1]}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"media-right white text-right\">\r\n\t\t\t\t\t\t\t<i class=\"icon-note font-large-1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id=\"Widget-line-chart\" class=\"height-75 WidgetlineChart WidgetlineChartshadow mb-2\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"WidgetlineChart.data\" [type]=\"WidgetlineChart.type\"\r\n\t\t\t\t\t\t[options]=\"WidgetlineChart.options\" [responsiveOptions]=\"WidgetlineChart.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"WidgetlineChart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<!--Card View de total de empresas-->\r\n\t<div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\r\n\t\t<div class=\"card gradient-ibiza-sunset\">\r\n\t\t\t<div class=\"card-body\">\r\n\t\t\t\t<div class=\"card-block pt-2 pb-0\">\r\n\t\t\t\t\t<div class=\"media\">\r\n\t\t\t\t\t\t<div class=\"media-body white text-left\">\r\n\t\t\t\t\t\t\t<h3 class=\"font-large-1 mb-0\">\r\n\t\t\t\t\t\t\t\t{{user.strTipoRol=='ADMINISTRADOR'?intTotalEmpresas:intTotalSucursal}}</h3>\r\n\t\t\t\t\t\t\t<span>{{user.strTipoRol=='ADMINISTRADOR'?'Total Empresas':'Total Sucursales'}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"media-right white text-right\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-cutlery font-large-1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id=\"Widget-line-chart\" class=\"height-75 WidgetlineChart WidgetlineChartshadow mb-2\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"WidgetlineChart.data\" [type]=\"WidgetlineChart.type\"\r\n\t\t\t\t\t\t[options]=\"WidgetlineChart.options\" [responsiveOptions]=\"WidgetlineChart.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"WidgetlineChart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<!--Card View de total de usuarios-->\r\n\t<div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\r\n\t\t<div class=\"card gradient-green-tea\">\r\n\t\t\t<div class=\"card-body\">\r\n\t\t\t\t<div class=\"card-block pt-2 pb-0\">\r\n\t\t\t\t\t<div class=\"media\">\r\n\t\t\t\t\t\t<div class=\"media-body white text-left\">\r\n\t\t\t\t\t\t\t<h3 class=\"font-large-1 mb-0\">{{\r\n\t\t\t\t\t\t\t\tuser.strTipoRol=='ADMINISTRADOR'?totalClientes:totalClientes}}</h3>\r\n\t\t\t\t\t\t\t<span>{{user.strTipoRol=='ADMINISTRADOR'?'Total Usuarios':'Total Usuarios'}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"media-right white text-right\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-users font-large-1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id=\"Widget-line-chart\" class=\"height-75 WidgetlineChart WidgetlineChartshadow mb-2\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"WidgetlineChart.data\" [type]=\"WidgetlineChart.type\"\r\n\t\t\t\t\t\t[options]=\"WidgetlineChart.options\" [responsiveOptions]=\"WidgetlineChart.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"WidgetlineChart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div *ngIf=\"totalEncuestasSemestral && totalEncuestaSemanal\" class=\"row\" matchHeight=\"card\">\r\n\t<!--Card View de Encuestas semestrales-->\r\n\t<div class=\"col-xl-7 col-lg-12 col-md-12 col-12\">\r\n\t\t<div class=\"card\">\r\n\t\t\t<div class=\"card-header\">\r\n\t\t\t\t<h4 class=\"card-title\">Encuestas Semestrales</h4>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"card-body\">\r\n\t\t\t\t<p class=\"font-medium-2 text-muted text-center pb-2\">Últimos 6 meses</p>\r\n\t\t\t\t<div id=\"Stack-bar-chart\" class=\"height-350 Stackbarchart mb-2\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"Stackbarchart.data\" [type]=\"Stackbarchart.type\"\r\n\t\t\t\t\t\t[options]=\"Stackbarchart.options\" [responsiveOptions]=\"Stackbarchart.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"Stackbarchart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<!--Card View de Encuestas semanales-->\r\n\t<div class=\"col-xl-5 col-lg-12 col-md-12 col-12\">\r\n\t\t<div class=\"card gradient-blackberry height-490\">\r\n\t\t\t<div class=\"card-body\">\r\n\t\t\t\t<div class=\"card-block\">\r\n\t\t\t\t\t<h4 class=\"card-title white\">Encuestas Semanales</h4>\r\n\t\t\t\t\t<div *ngIf=\"totalEncuestaSemanal != null && totalEncuestaSemanal != ''\" class=\"p-2 text-center\">\r\n\t\t\t\t\t\t<a class=\"btn btn-raised btn-round bg-white mx-3 px-3\">Semana\r\n\t\t\t\t\t\t\t{{totalEncuestaSemanal[0].intSemana}}</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div *ngIf=\"totalEncuestaSemanal != null && totalEncuestaSemanal != ''\"\r\n\t\t\t\t\t\tclass=\"my-3 text-center white\">\r\n\t\t\t\t\t\t<a class=\"font-large-2 d-block mb-1\">{{totalEncuestaSemanal[0].intCantidad}}<span\r\n\t\t\t\t\t\t\t\tclass=\"ft-arrow-up font-large-2\"></span></a>\r\n\t\t\t\t\t\t<span *ngIf=\"totalEncuestaSemanal.length > 1\" class=\"font-medium-1\">Semana\r\n\t\t\t\t\t\t\t{{totalEncuestaSemanal[1].intSemana}} {{(totalEncuestaSemanal[0].intCantidad -\r\n\t\t\t\t\t\t\ttotalEncuestaSemanal[1].intCantidad)>=0?'+':''}}{{totalEncuestaSemanal[0].intCantidad -\r\n\t\t\t\t\t\t\ttotalEncuestaSemanal[1].intCantidad}}</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id=\"lineChart\" class=\"height-200 lineChart lineChartShadow\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"lineChart.data\" [type]=\"lineChart.type\" [options]=\"lineChart.options\"\r\n\t\t\t\t\t\t[responsiveOptions]=\"lineChart.responsiveOptions\" [events]=\"lineChart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div *ngIf=\"totalEncuestasPorArea\" class=\"row\" matchHeight=\"card\">\r\n\t<!--Card View de Encuestas por area-->\r\n\t<div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\r\n\t\t<div class=\"card\">\r\n\t\t\t<div class=\"card-header\">\r\n\t\t\t\t<h4 class=\"card-title\">Encuestas por Area</h4>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"card-body\">\r\n\t\t\t\t<p class=\"font-medium-2 text-muted text-center pb-2\">Total</p>\r\n\t\t\t\t<div id=\"Stack-bar-chart\" class=\"height-350 StackbarchartArea mb-2\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"StackbarchartArea.data\" [type]=\"StackbarchartArea.type\"\r\n\t\t\t\t\t\t[options]=\"StackbarchartArea.options\" [responsiveOptions]=\"StackbarchartArea.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"StackbarchartArea.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div *ngIf=\"boolMostrarGeneroEdad == 'SI' \" class=\"row\" matchHeight=\"card\">\r\n\t<!--<div class=\"row\" matchHeight=\"card\">-->\r\n\t<!--Diagrama de pie de género-->\r\n\t<div class=\"col-xl-5 col-lg-12\">\r\n\t\t<div class=\"card h-100\"> <!-- Asegura que la tarjeta ocupe el 100% de la altura disponible -->\r\n\t\t\t<div class=\"card-header\">\r\n\t\t\t\t<h4 class=\"card-title\">Género</h4>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"card-body d-flex flex-column\">\r\n\t\t\t\t<p class=\"font-medium-2 text-muted text-center\">{{monthNames[intMesEncuestas-1]}}</p>\r\n\t\t\t\t<div id=\"donut-dashboard-chart\" class=\"height-315 donut\">\r\n\t\t\t\t\t<x-chartist class=\"\" [data]=\"DonutChart.data\" [type]=\"DonutChart.type\"\r\n\t\t\t\t\t\t[options]=\"DonutChart.options\" [responsiveOptions]=\"DonutChart.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"DonutChart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"card-block\">\r\n\t\t\t\t\t<div class=\"row mb-3\">\r\n\t\t\t\t\t\t<div class=\"col\">\r\n\t\t\t\t\t\t\t<span class=\"mb-1 text-muted d-block\">{{clientesGeneroMensual | totalClienteGenero :\r\n\t\t\t\t\t\t\t\t'MASCULINO'}} - Masculino</span>\r\n\t\t\t\t\t\t\t<div class=\"progress\" style=\"height: 5px;\">\r\n\t\t\t\t\t\t\t\t<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 23%;\"\r\n\t\t\t\t\t\t\t\t\taria-valuenow=\"23\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col\">\r\n\t\t\t\t\t\t\t<span class=\"mb-1 text-muted d-block\">{{clientesGeneroMensual | totalClienteGenero :\r\n\t\t\t\t\t\t\t\t'FEMENINO'}} - Femenino</span>\r\n\t\t\t\t\t\t\t<div class=\"progress\" style=\"height: 5px;\">\r\n\t\t\t\t\t\t\t\t<div class=\"progress-bar bg-amber\" role=\"progressbar\" style=\"width: 14%;\"\r\n\t\t\t\t\t\t\t\t\taria-valuenow=\"14\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col\">\r\n\t\t\t\t\t\t\t<span class=\"mb-1 text-muted d-block\">{{clientesGeneroMensual | totalClienteGenero : 'SIN\r\n\t\t\t\t\t\t\t\tGENERO'}} - Sin Genero</span>\r\n\t\t\t\t\t\t\t<div class=\"progress\" style=\"height: 5px;\">\r\n\t\t\t\t\t\t\t\t<div class=\"progress-bar bg-cyan\" role=\"progressbar\" style=\"width: 14%;\"\r\n\t\t\t\t\t\t\t\t\taria-valuenow=\"14\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\t<!-- Diagrama de barra de edades -->\r\n\t<div class=\"col-xl-7 col-lg-13 col-12\">\r\n\t\t<div class=\"card h-100\">\r\n\t\t\t<div class=\"card-header\">\r\n\t\t\t\t<h4 class=\"card-title\">Edades</h4>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"card-body d-flex flex-column\">\r\n\t\t\t\t<p class=\"font-medium-2 text-muted text-center pb-2\">{{monthNames[intMesEncuestas-1]}}</p>\r\n\t\t\t\t<div id=\"Stack-bar-chart\" class=\"height-315 EdadesChart mb-2\">\r\n\t\t\t\t\t<x-chartist #chartistChart [data]=\"EdadesChart.data\" [type]=\"EdadesChart.type\"\r\n\t\t\t\t\t\t[options]=\"EdadesChart.options\" [responsiveOptions]=\"EdadesChart.responsiveOptions\"\r\n\t\t\t\t\t\t[events]=\"EdadesChart.events\">\r\n\t\t\t\t\t</x-chartist>\r\n\t\t\t\t</div>\r\n\t\t\t\t<p class=\"font-medium-2 text-muted text-center pb-1\">Ingresos sin Datos:\r\n\t\t\t\t\t{{intClientesEdadSinGeneracion}} = {{porcentajeTotal}}%</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard1/dashboard1.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashboard1/dashboard1.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host /deep/ .ct-grid {\n  stroke-dasharray: 0px;\n  stroke: rgba(0, 0, 0, 0.1); }\n\n:host /deep/ .ct-label {\n  font-size: 0.9rem; }\n\n:host /deep/ .lineArea .ct-series-a .ct-area {\n  fill-opacity: 0.7;\n  fill: url(\"/dashboard/dashboard1#gradient1\") !important; }\n\n:host /deep/ .lineArea .ct-series-b .ct-area {\n  fill: url(\"/dashboard/dashboard1#gradient\") !important;\n  fill-opacity: 0.9; }\n\n:host /deep/ .lineArea .ct-line {\n  stroke-width: 0px; }\n\n:host /deep/ .lineArea .ct-point {\n  stroke-width: 0px; }\n\n:host /deep/ .Stackbarchart .ct-series-a .ct-bar {\n  stroke: url(\"/dashboard/dashboard1#linear\") !important; }\n\n:host /deep/ .Stackbarchart .ct-series-b .ct-bar {\n  stroke: #e9e9e9; }\n\n:host /deep/ .StackbarchartArea .ct-series-a .ct-bar {\n  stroke: url(\"/dashboard/dashboard1#linear\") !important; }\n\n:host /deep/ .StackbarchartArea .ct-series-b .ct-bar {\n  stroke: #e9e9e9; }\n\n:host /deep/ .EdadesChart .ct-series-a .ct-bar {\n  fill: url(\"/dashboard/dashboard1#gradient2\") !important; }\n\n:host /deep/ .EdadesChart .ct-series-b .ct-bar {\n  stroke: #e9e9e9; }\n\n:host /deep/ .lineArea2 .ct-series-a .ct-area {\n  fill: url(\"/dashboard/dashboard1#gradient2\") !important; }\n\n:host /deep/ .lineArea2 .ct-series-b .ct-area {\n  fill: url(\"/dashboard/dashboard1#gradient3\") !important; }\n\n:host /deep/ .lineArea2 .ct-point-circle {\n  stroke-width: 2px;\n  fill: white; }\n\n:host /deep/ .lineArea2 .ct-series-b .ct-point-circle {\n  stroke: #843cf7; }\n\n:host /deep/ .lineArea2 .ct-series-b .ct-line {\n  stroke: #A675F4; }\n\n:host /deep/ .lineArea2 .ct-series-a .ct-point-circle {\n  stroke: #31afb2; }\n\n:host /deep/ .lineArea2 .ct-line {\n  fill: none;\n  stroke-width: 2px; }\n\n:host /deep/ .lineChart .ct-point-circle {\n  stroke-width: 2px;\n  fill: white; }\n\n:host /deep/ .lineChart .ct-series-a .ct-point-circle {\n  stroke: white; }\n\n:host /deep/ .lineChart .ct-line {\n  fill: none;\n  stroke: white;\n  stroke-width: 1px; }\n\n:host /deep/ .lineChart .ct-label {\n  color: #FFF; }\n\n:host /deep/ .lineChartShadow {\n  -webkit-filter: drop-shadow(0px 25px 8px rgba(0, 0, 0, 0.3));\n  filter: drop-shadow(0px 25px 8px rgba(0, 0, 0, 0.3));\n  /* Same syntax as box-shadow, except \r\n                                                       for the spread property */ }\n\n:host /deep/ .donut .ct-done .ct-slice-donut {\n  stroke: #28a745;\n  stroke-width: 24px !important; }\n\n:host /deep/ .donut .ct-progress .ct-slice-donut {\n  stroke: #ffc107;\n  stroke-width: 16px !important; }\n\n:host /deep/ .donut .ct-outstanding .ct-slice-donut {\n  stroke: #17a2b8;\n  stroke-width: 8px !important; }\n\n:host /deep/ .donut .ct-label {\n  text-anchor: middle;\n  alignment-baseline: middle;\n  font-size: 12px;\n  fill: #0c081f; }\n\n:host /deep/ .BarChart .ct-series-a .ct-bar:nth-of-type(4n+1) {\n  stroke: url(\"/dashboard/dashboard1#gradient7\"); }\n\n:host /deep/ .BarChart .ct-series-a .ct-bar:nth-of-type(4n+2) {\n  stroke: url(\"/dashboard/dashboard1#gradient5\"); }\n\n:host /deep/ .BarChart .ct-series-a .ct-bar:nth-of-type(4n+3) {\n  stroke: url(\"/dashboard/dashboard1#gradient6\"); }\n\n:host /deep/ .BarChart .ct-series-a .ct-bar:nth-of-type(4n+4) {\n  stroke: url(\"/dashboard/dashboard1#gradient4\"); }\n\n:host /deep/ .BarChartShadow {\n  -webkit-filter: drop-shadow(0px 20px 8px rgba(0, 0, 0, 0.3));\n  filter: drop-shadow(0px 20px 8px rgba(0, 0, 0, 0.3));\n  /* Same syntax as box-shadow, except \r\n                                                       for the spread property */ }\n\n:host /deep/ .WidgetlineChart .ct-point {\n  stroke-width: 0px; }\n\n:host /deep/ .WidgetlineChart .ct-line {\n  stroke: #fff; }\n\n:host /deep/ .WidgetlineChart .ct-grid {\n  stroke-dasharray: 0px;\n  stroke: rgba(255, 255, 255, 0.2); }\n\n:host /deep/ .WidgetlineChartshadow {\n  -webkit-filter: drop-shadow(0px 15px 5px rgba(0, 0, 0, 0.8));\n  filter: drop-shadow(0px 15px 5px rgba(0, 0, 0, 0.8));\n  /* Same syntax as box-shadow, except \r\n                                                       for the spread property */ }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZDEvQzpcXHhhbXBwXFxodGRvY3NcXGVzdHVkaW9Cb3hXZWIvc3JjXFxhcHBcXGRhc2hib2FyZFxcZGFzaGJvYXJkMVxcZGFzaGJvYXJkMS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZDEvZGFzaGJvYXJkMS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLHFCQUFxQjtFQUNyQiwwQkFBMEIsRUFBQTs7QUFHOUI7RUFDSSxpQkFBaUIsRUFBQTs7QUFLckI7RUFDSSxpQkFBaUI7RUFDakIsdURBQTZELEVBQUE7O0FBR2pFO0VBQ0ksc0RBQTREO0VBQzVELGlCQUFpQixFQUFBOztBQUdyQjtFQUNJLGlCQUFpQixFQUFBOztBQUdyQjtFQUNJLGlCQUFpQixFQUFBOztBQU9yQjtFQUdZLHNEQUE0RCxFQUFBOztBQUh4RTtFQVNZLGVBQWUsRUFBQTs7QUFLM0I7RUFHWSxzREFBNEQsRUFBQTs7QUFIeEU7RUFTWSxlQUFlLEVBQUE7O0FBSzNCO0VBR1ksdURBQTZELEVBQUE7O0FBSHpFO0VBU1ksZUFBZSxFQUFBOztBQVMzQjtFQUNJLHVEQUE2RCxFQUFBOztBQUdqRTtFQUNJLHVEQUE2RCxFQUFBOztBQUdqRTtFQUNJLGlCQUFpQjtFQUNqQixXQUFXLEVBQUE7O0FBR2Y7RUFDSSxlQUFlLEVBQUE7O0FBR25CO0VBQ0ksZUFBZSxFQUFBOztBQUduQjtFQUNJLGVBQWUsRUFBQTs7QUFHbkI7RUFDSSxVQUFVO0VBQ1YsaUJBQWlCLEVBQUE7O0FBT3JCO0VBQ0ksaUJBQWlCO0VBQ2pCLFdBQVcsRUFBQTs7QUFHZjtFQUNJLGFBQWEsRUFBQTs7QUFHakI7RUFDSSxVQUFVO0VBQ1YsYUFBYTtFQUNiLGlCQUFpQixFQUFBOztBQUdyQjtFQUNJLFdBQVcsRUFBQTs7QUFHZjtFQUNJLDREQUE0RDtFQUM1RCxvREFBb0Q7RUFDcEQ7Z0ZDeEQ0RSxFRHlEQzs7QUFNakY7RUFDSSxlQUFlO0VBQ2YsNkJBQTZCLEVBQUE7O0FBR2pDO0VBQ0ksZUFBZTtFQUNmLDZCQUE2QixFQUFBOztBQUdqQztFQUNJLGVBQWU7RUFDZiw0QkFBNEIsRUFBQTs7QUFHaEM7RUFDSSxtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLGVBQWU7RUFDZixhQUFhLEVBQUE7O0FBT2pCO0VBQ0ksOENBQW9ELEVBQUE7O0FBR3hEO0VBQ0ksOENBQW9ELEVBQUE7O0FBR3hEO0VBQ0ksOENBQW9ELEVBQUE7O0FBR3hEO0VBQ0ksOENBQW9ELEVBQUE7O0FBR3hEO0VBQ0ksNERBQTREO0VBQzVELG9EQUFvRDtFQUNwRDtnRkN4RTRFLEVEeUVDOztBQU9qRjtFQUNJLGlCQUFpQixFQUFBOztBQUdyQjtFQUNJLFlBQVksRUFBQTs7QUFJaEI7RUFDSSxxQkFBcUI7RUFDckIsZ0NBQWdDLEVBQUE7O0FBR3BDO0VBQ0ksNERBQTREO0VBQzVELG9EQUFvRDtFQUNwRDtnRkNqRjRFLEVEa0ZDIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZDEvZGFzaGJvYXJkMS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvc2Fzcy9zY3NzL2dyYWRpZW50LXZhcmlhYmxlc1wiO1xyXG5cclxuOmhvc3QgL2RlZXAvIC5jdC1ncmlkIHtcclxuICAgIHN0cm9rZS1kYXNoYXJyYXk6IDBweDtcclxuICAgIHN0cm9rZTogcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLmN0LWxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG59XHJcblxyXG4vLyBMaW5lIHdpdGggQXJlYSBDaGFydCBDU1MgU3RhcnRzXHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhIC5jdC1zZXJpZXMtYSAuY3QtYXJlYSB7XHJcbiAgICBmaWxsLW9wYWNpdHk6IDAuNztcclxuICAgIGZpbGw6IHVybCgkZGFzaGJvYXJkMS1ncmFkaWVudC1wYXRoICsgICNncmFkaWVudDEpICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAubGluZUFyZWEgLmN0LXNlcmllcy1iIC5jdC1hcmVhIHtcclxuICAgIGZpbGw6IHVybCgkZGFzaGJvYXJkMS1ncmFkaWVudC1wYXRoICsgICNncmFkaWVudCkgIWltcG9ydGFudDtcclxuICAgIGZpbGwtb3BhY2l0eTogMC45O1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhIC5jdC1saW5lIHtcclxuICAgIHN0cm9rZS13aWR0aDogMHB4O1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhIC5jdC1wb2ludCB7XHJcbiAgICBzdHJva2Utd2lkdGg6IDBweDtcclxufVxyXG5cclxuLy8gTGluZSB3aXRoIEFyZWEgQ2hhcnQgMSBDU1MgRW5kc1xyXG5cclxuLy8gU3RhY2sgQmFyIENoYXJ0IENTUyBTdGFydHNcclxuXHJcbjpob3N0IC9kZWVwLyAuU3RhY2tiYXJjaGFydCB7XHJcbiAgICAuY3Qtc2VyaWVzLWEge1xyXG4gICAgICAgIC5jdC1iYXIge1xyXG4gICAgICAgICAgICBzdHJva2U6IHVybCgkZGFzaGJvYXJkMS1ncmFkaWVudC1wYXRoICsgICNsaW5lYXIpICFpbXBvcnRhbnRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmN0LXNlcmllcy1iIHtcclxuICAgICAgICAuY3QtYmFyIHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAjZTllOWU5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5TdGFja2JhcmNoYXJ0QXJlYSB7XHJcbiAgICAuY3Qtc2VyaWVzLWEge1xyXG4gICAgICAgIC5jdC1iYXIge1xyXG4gICAgICAgICAgICBzdHJva2U6IHVybCgkZGFzaGJvYXJkMS1ncmFkaWVudC1wYXRoICsgICNsaW5lYXIpICFpbXBvcnRhbnRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmN0LXNlcmllcy1iIHtcclxuICAgICAgICAuY3QtYmFyIHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAjZTllOWU5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5FZGFkZXNDaGFydCB7XHJcbiAgICAuY3Qtc2VyaWVzLWEge1xyXG4gICAgICAgIC5jdC1iYXIge1xyXG4gICAgICAgICAgICBmaWxsOiB1cmwoJGRhc2hib2FyZDEtZ3JhZGllbnQtcGF0aCArICAjZ3JhZGllbnQyKSAhaW1wb3J0YW50XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5jdC1zZXJpZXMtYiB7XHJcbiAgICAgICAgLmN0LWJhciB7XHJcbiAgICAgICAgICAgIHN0cm9rZTogI2U5ZTllOTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFN0YWNrIEJhciBDaGFydCBDU1MgRW5kc1xyXG5cclxuLy8gTGluZSB3aXRoIEFyZWEgQ2hhcnQgMiBDU1MgU3RhcnRzXHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhMiAuY3Qtc2VyaWVzLWEgLmN0LWFyZWEge1xyXG4gICAgZmlsbDogdXJsKCRkYXNoYm9hcmQxLWdyYWRpZW50LXBhdGggKyAgI2dyYWRpZW50MikgIWltcG9ydGFudDtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYTIgLmN0LXNlcmllcy1iIC5jdC1hcmVhIHtcclxuICAgIGZpbGw6IHVybCgkZGFzaGJvYXJkMS1ncmFkaWVudC1wYXRoICsgICNncmFkaWVudDMpICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAubGluZUFyZWEyIC5jdC1wb2ludC1jaXJjbGUge1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAycHg7XHJcbiAgICBmaWxsOiB3aGl0ZTtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYTIgLmN0LXNlcmllcy1iIC5jdC1wb2ludC1jaXJjbGUge1xyXG4gICAgc3Ryb2tlOiAjODQzY2Y3O1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhMiAuY3Qtc2VyaWVzLWIgLmN0LWxpbmUge1xyXG4gICAgc3Ryb2tlOiAjQTY3NUY0O1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhMiAuY3Qtc2VyaWVzLWEgLmN0LXBvaW50LWNpcmNsZSB7XHJcbiAgICBzdHJva2U6ICMzMWFmYjI7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAubGluZUFyZWEyIC5jdC1saW5lIHtcclxuICAgIGZpbGw6IG5vbmU7XHJcbiAgICBzdHJva2Utd2lkdGg6IDJweDtcclxufVxyXG5cclxuLy8gTGluZSB3aXRoIEFyZWEgQ2hhcnQgMiBDU1MgRW5kc1xyXG5cclxuLy8gTGluZSBDaGFydCBDU1MgU3RhcnRzXHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVDaGFydCAuY3QtcG9pbnQtY2lyY2xlIHtcclxuICAgIHN0cm9rZS13aWR0aDogMnB4O1xyXG4gICAgZmlsbDogd2hpdGU7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAubGluZUNoYXJ0IC5jdC1zZXJpZXMtYSAuY3QtcG9pbnQtY2lyY2xlIHtcclxuICAgIHN0cm9rZTogd2hpdGU7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAubGluZUNoYXJ0IC5jdC1saW5lIHtcclxuICAgIGZpbGw6IG5vbmU7XHJcbiAgICBzdHJva2U6IHdoaXRlO1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAxcHg7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAubGluZUNoYXJ0IC5jdC1sYWJlbCB7XHJcbiAgICBjb2xvcjogI0ZGRjtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5saW5lQ2hhcnRTaGFkb3cge1xyXG4gICAgLXdlYmtpdC1maWx0ZXI6IGRyb3Atc2hhZG93KDBweCAyNXB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMykpO1xyXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMjVweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcclxuICAgIC8qIFNhbWUgc3ludGF4IGFzIGJveC1zaGFkb3csIGV4Y2VwdCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgc3ByZWFkIHByb3BlcnR5ICovXHJcbn1cclxuXHJcbi8vIExpbmUgQ2hhcnQgIENTUyBFbmRzXHJcblxyXG4vLyBEb251dCBDaGFydCAgQ1NTIEVuZHNcclxuOmhvc3QgL2RlZXAvIC5kb251dCAuY3QtZG9uZSAuY3Qtc2xpY2UtZG9udXQge1xyXG4gICAgc3Ryb2tlOiAjMjhhNzQ1O1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAyNHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAuZG9udXQgLmN0LXByb2dyZXNzIC5jdC1zbGljZS1kb251dCB7XHJcbiAgICBzdHJva2U6ICNmZmMxMDc7XHJcbiAgICBzdHJva2Utd2lkdGg6IDE2cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5kb251dCAuY3Qtb3V0c3RhbmRpbmcgLmN0LXNsaWNlLWRvbnV0IHtcclxuICAgIHN0cm9rZTogIzE3YTJiODtcclxuICAgIHN0cm9rZS13aWR0aDogOHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAuZG9udXQgLmN0LWxhYmVsIHtcclxuICAgIHRleHQtYW5jaG9yOiBtaWRkbGU7XHJcbiAgICBhbGlnbm1lbnQtYmFzZWxpbmU6IG1pZGRsZTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZpbGw6ICMwYzA4MWY7XHJcbn1cclxuXHJcbi8vIERvbnV0IENoYXJ0ICBDU1MgRW5kc1xyXG5cclxuLy8gQmFyIENoYXJ0IENTUyBTdGFydHNcclxuXHJcbjpob3N0IC9kZWVwLyAuQmFyQ2hhcnQgLmN0LXNlcmllcy1hIC5jdC1iYXI6bnRoLW9mLXR5cGUoNG4rMSkge1xyXG4gICAgc3Ryb2tlOiB1cmwoJGRhc2hib2FyZDEtZ3JhZGllbnQtcGF0aCArICAjZ3JhZGllbnQ3KTtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5CYXJDaGFydCAuY3Qtc2VyaWVzLWEgLmN0LWJhcjpudGgtb2YtdHlwZSg0bisyKSB7XHJcbiAgICBzdHJva2U6IHVybCgkZGFzaGJvYXJkMS1ncmFkaWVudC1wYXRoICsgICNncmFkaWVudDUpO1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLkJhckNoYXJ0IC5jdC1zZXJpZXMtYSAuY3QtYmFyOm50aC1vZi10eXBlKDRuKzMpIHtcclxuICAgIHN0cm9rZTogdXJsKCRkYXNoYm9hcmQxLWdyYWRpZW50LXBhdGggKyAgI2dyYWRpZW50Nik7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAuQmFyQ2hhcnQgLmN0LXNlcmllcy1hIC5jdC1iYXI6bnRoLW9mLXR5cGUoNG4rNCkge1xyXG4gICAgc3Ryb2tlOiB1cmwoJGRhc2hib2FyZDEtZ3JhZGllbnQtcGF0aCArICAjZ3JhZGllbnQ0KTtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5CYXJDaGFydFNoYWRvdyB7XHJcbiAgICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMHB4IDIwcHggOHB4IHJnYmEoMCwgMCwgMCwgMC4zKSk7XHJcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDBweCAyMHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMykpO1xyXG4gICAgLyogU2FtZSBzeW50YXggYXMgYm94LXNoYWRvdywgZXhjZXB0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBzcHJlYWQgcHJvcGVydHkgKi9cclxufVxyXG5cclxuLy8gQmFyIENoYXJ0IENTUyBFbmRzXHJcblxyXG4vLyBXaWRnZXQgbGluZSBDaGFydCBDU1MgU3RhcnRzXHJcblxyXG46aG9zdCAvZGVlcC8gLldpZGdldGxpbmVDaGFydCAuY3QtcG9pbnQge1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAwcHg7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAuV2lkZ2V0bGluZUNoYXJ0IC5jdC1saW5lIHtcclxuICAgIHN0cm9rZTogI2ZmZjtcclxufVxyXG5cclxuXHJcbjpob3N0IC9kZWVwLyAuV2lkZ2V0bGluZUNoYXJ0IC5jdC1ncmlkIHtcclxuICAgIHN0cm9rZS1kYXNoYXJyYXk6IDBweDtcclxuICAgIHN0cm9rZTogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLldpZGdldGxpbmVDaGFydHNoYWRvdyB7XHJcbiAgICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMHB4IDE1cHggNXB4IHJnYmEoMCwgMCwgMCwgMC44KSk7XHJcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDBweCAxNXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuOCkpO1xyXG4gICAgLyogU2FtZSBzeW50YXggYXMgYm94LXNoYWRvdywgZXhjZXB0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBzcHJlYWQgcHJvcGVydHkgKi9cclxufVxyXG5cclxuLy8gV2lkZ2V0IGxpbmUgQ2hhcnQgQ1NTIEVuZHMiLCI6aG9zdCAvZGVlcC8gLmN0LWdyaWQge1xuICBzdHJva2UtZGFzaGFycmF5OiAwcHg7XG4gIHN0cm9rZTogcmdiYSgwLCAwLCAwLCAwLjEpOyB9XG5cbjpob3N0IC9kZWVwLyAuY3QtbGFiZWwge1xuICBmb250LXNpemU6IDAuOXJlbTsgfVxuXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhIC5jdC1zZXJpZXMtYSAuY3QtYXJlYSB7XG4gIGZpbGwtb3BhY2l0eTogMC43O1xuICBmaWxsOiB1cmwoXCIvZGFzaGJvYXJkL2Rhc2hib2FyZDEjZ3JhZGllbnQxXCIpICFpbXBvcnRhbnQ7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYSAuY3Qtc2VyaWVzLWIgLmN0LWFyZWEge1xuICBmaWxsOiB1cmwoXCIvZGFzaGJvYXJkL2Rhc2hib2FyZDEjZ3JhZGllbnRcIikgIWltcG9ydGFudDtcbiAgZmlsbC1vcGFjaXR5OiAwLjk7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYSAuY3QtbGluZSB7XG4gIHN0cm9rZS13aWR0aDogMHB4OyB9XG5cbjpob3N0IC9kZWVwLyAubGluZUFyZWEgLmN0LXBvaW50IHtcbiAgc3Ryb2tlLXdpZHRoOiAwcHg7IH1cblxuOmhvc3QgL2RlZXAvIC5TdGFja2JhcmNoYXJ0IC5jdC1zZXJpZXMtYSAuY3QtYmFyIHtcbiAgc3Ryb2tlOiB1cmwoXCIvZGFzaGJvYXJkL2Rhc2hib2FyZDEjbGluZWFyXCIpICFpbXBvcnRhbnQ7IH1cblxuOmhvc3QgL2RlZXAvIC5TdGFja2JhcmNoYXJ0IC5jdC1zZXJpZXMtYiAuY3QtYmFyIHtcbiAgc3Ryb2tlOiAjZTllOWU5OyB9XG5cbjpob3N0IC9kZWVwLyAuU3RhY2tiYXJjaGFydEFyZWEgLmN0LXNlcmllcy1hIC5jdC1iYXIge1xuICBzdHJva2U6IHVybChcIi9kYXNoYm9hcmQvZGFzaGJvYXJkMSNsaW5lYXJcIikgIWltcG9ydGFudDsgfVxuXG46aG9zdCAvZGVlcC8gLlN0YWNrYmFyY2hhcnRBcmVhIC5jdC1zZXJpZXMtYiAuY3QtYmFyIHtcbiAgc3Ryb2tlOiAjZTllOWU5OyB9XG5cbjpob3N0IC9kZWVwLyAuRWRhZGVzQ2hhcnQgLmN0LXNlcmllcy1hIC5jdC1iYXIge1xuICBmaWxsOiB1cmwoXCIvZGFzaGJvYXJkL2Rhc2hib2FyZDEjZ3JhZGllbnQyXCIpICFpbXBvcnRhbnQ7IH1cblxuOmhvc3QgL2RlZXAvIC5FZGFkZXNDaGFydCAuY3Qtc2VyaWVzLWIgLmN0LWJhciB7XG4gIHN0cm9rZTogI2U5ZTllOTsgfVxuXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhMiAuY3Qtc2VyaWVzLWEgLmN0LWFyZWEge1xuICBmaWxsOiB1cmwoXCIvZGFzaGJvYXJkL2Rhc2hib2FyZDEjZ3JhZGllbnQyXCIpICFpbXBvcnRhbnQ7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYTIgLmN0LXNlcmllcy1iIC5jdC1hcmVhIHtcbiAgZmlsbDogdXJsKFwiL2Rhc2hib2FyZC9kYXNoYm9hcmQxI2dyYWRpZW50M1wiKSAhaW1wb3J0YW50OyB9XG5cbjpob3N0IC9kZWVwLyAubGluZUFyZWEyIC5jdC1wb2ludC1jaXJjbGUge1xuICBzdHJva2Utd2lkdGg6IDJweDtcbiAgZmlsbDogd2hpdGU7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYTIgLmN0LXNlcmllcy1iIC5jdC1wb2ludC1jaXJjbGUge1xuICBzdHJva2U6ICM4NDNjZjc7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYTIgLmN0LXNlcmllcy1iIC5jdC1saW5lIHtcbiAgc3Ryb2tlOiAjQTY3NUY0OyB9XG5cbjpob3N0IC9kZWVwLyAubGluZUFyZWEyIC5jdC1zZXJpZXMtYSAuY3QtcG9pbnQtY2lyY2xlIHtcbiAgc3Ryb2tlOiAjMzFhZmIyOyB9XG5cbjpob3N0IC9kZWVwLyAubGluZUFyZWEyIC5jdC1saW5lIHtcbiAgZmlsbDogbm9uZTtcbiAgc3Ryb2tlLXdpZHRoOiAycHg7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQ2hhcnQgLmN0LXBvaW50LWNpcmNsZSB7XG4gIHN0cm9rZS13aWR0aDogMnB4O1xuICBmaWxsOiB3aGl0ZTsgfVxuXG46aG9zdCAvZGVlcC8gLmxpbmVDaGFydCAuY3Qtc2VyaWVzLWEgLmN0LXBvaW50LWNpcmNsZSB7XG4gIHN0cm9rZTogd2hpdGU7IH1cblxuOmhvc3QgL2RlZXAvIC5saW5lQ2hhcnQgLmN0LWxpbmUge1xuICBmaWxsOiBub25lO1xuICBzdHJva2U6IHdoaXRlO1xuICBzdHJva2Utd2lkdGg6IDFweDsgfVxuXG46aG9zdCAvZGVlcC8gLmxpbmVDaGFydCAuY3QtbGFiZWwge1xuICBjb2xvcjogI0ZGRjsgfVxuXG46aG9zdCAvZGVlcC8gLmxpbmVDaGFydFNoYWRvdyB7XG4gIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMjVweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMjVweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcbiAgLyogU2FtZSBzeW50YXggYXMgYm94LXNoYWRvdywgZXhjZXB0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBzcHJlYWQgcHJvcGVydHkgKi8gfVxuXG46aG9zdCAvZGVlcC8gLmRvbnV0IC5jdC1kb25lIC5jdC1zbGljZS1kb251dCB7XG4gIHN0cm9rZTogIzI4YTc0NTtcbiAgc3Ryb2tlLXdpZHRoOiAyNHB4ICFpbXBvcnRhbnQ7IH1cblxuOmhvc3QgL2RlZXAvIC5kb251dCAuY3QtcHJvZ3Jlc3MgLmN0LXNsaWNlLWRvbnV0IHtcbiAgc3Ryb2tlOiAjZmZjMTA3O1xuICBzdHJva2Utd2lkdGg6IDE2cHggIWltcG9ydGFudDsgfVxuXG46aG9zdCAvZGVlcC8gLmRvbnV0IC5jdC1vdXRzdGFuZGluZyAuY3Qtc2xpY2UtZG9udXQge1xuICBzdHJva2U6ICMxN2EyYjg7XG4gIHN0cm9rZS13aWR0aDogOHB4ICFpbXBvcnRhbnQ7IH1cblxuOmhvc3QgL2RlZXAvIC5kb251dCAuY3QtbGFiZWwge1xuICB0ZXh0LWFuY2hvcjogbWlkZGxlO1xuICBhbGlnbm1lbnQtYmFzZWxpbmU6IG1pZGRsZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmaWxsOiAjMGMwODFmOyB9XG5cbjpob3N0IC9kZWVwLyAuQmFyQ2hhcnQgLmN0LXNlcmllcy1hIC5jdC1iYXI6bnRoLW9mLXR5cGUoNG4rMSkge1xuICBzdHJva2U6IHVybChcIi9kYXNoYm9hcmQvZGFzaGJvYXJkMSNncmFkaWVudDdcIik7IH1cblxuOmhvc3QgL2RlZXAvIC5CYXJDaGFydCAuY3Qtc2VyaWVzLWEgLmN0LWJhcjpudGgtb2YtdHlwZSg0bisyKSB7XG4gIHN0cm9rZTogdXJsKFwiL2Rhc2hib2FyZC9kYXNoYm9hcmQxI2dyYWRpZW50NVwiKTsgfVxuXG46aG9zdCAvZGVlcC8gLkJhckNoYXJ0IC5jdC1zZXJpZXMtYSAuY3QtYmFyOm50aC1vZi10eXBlKDRuKzMpIHtcbiAgc3Ryb2tlOiB1cmwoXCIvZGFzaGJvYXJkL2Rhc2hib2FyZDEjZ3JhZGllbnQ2XCIpOyB9XG5cbjpob3N0IC9kZWVwLyAuQmFyQ2hhcnQgLmN0LXNlcmllcy1hIC5jdC1iYXI6bnRoLW9mLXR5cGUoNG4rNCkge1xuICBzdHJva2U6IHVybChcIi9kYXNoYm9hcmQvZGFzaGJvYXJkMSNncmFkaWVudDRcIik7IH1cblxuOmhvc3QgL2RlZXAvIC5CYXJDaGFydFNoYWRvdyB7XG4gIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMjBweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMjBweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcbiAgLyogU2FtZSBzeW50YXggYXMgYm94LXNoYWRvdywgZXhjZXB0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBzcHJlYWQgcHJvcGVydHkgKi8gfVxuXG46aG9zdCAvZGVlcC8gLldpZGdldGxpbmVDaGFydCAuY3QtcG9pbnQge1xuICBzdHJva2Utd2lkdGg6IDBweDsgfVxuXG46aG9zdCAvZGVlcC8gLldpZGdldGxpbmVDaGFydCAuY3QtbGluZSB7XG4gIHN0cm9rZTogI2ZmZjsgfVxuXG46aG9zdCAvZGVlcC8gLldpZGdldGxpbmVDaGFydCAuY3QtZ3JpZCB7XG4gIHN0cm9rZS1kYXNoYXJyYXk6IDBweDtcbiAgc3Ryb2tlOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7IH1cblxuOmhvc3QgL2RlZXAvIC5XaWRnZXRsaW5lQ2hhcnRzaGFkb3cge1xuICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMHB4IDE1cHggNXB4IHJnYmEoMCwgMCwgMCwgMC44KSk7XG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMHB4IDE1cHggNXB4IHJnYmEoMCwgMCwgMCwgMC44KSk7XG4gIC8qIFNhbWUgc3ludGF4IGFzIGJveC1zaGFkb3csIGV4Y2VwdCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgc3ByZWFkIHByb3BlcnR5ICovIH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/dashboard/dashboard1/dashboard1.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dashboard/dashboard1/dashboard1.component.ts ***!
  \**************************************************************/
/*! exports provided: Dashboard1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard1Component", function() { return Dashboard1Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chartist */ "./node_modules/chartist/dist/chartist.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chartist__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_services_cliente_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/_services/cliente.service */ "./src/app/_services/cliente.service.ts");
/* harmony import */ var app_services_encuesta_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/_services/encuesta.service */ "./src/app/_services/encuesta.service.ts");
/* harmony import */ var app_services_sucursal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/_services/sucursal.service */ "./src/app/_services/sucursal.service.ts");
/* harmony import */ var app_services_empresa_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/_services/empresa.service */ "./src/app/_services/empresa.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var data = __webpack_require__(/*! ../../shared/data/chartist.json */ "./src/app/shared/data/chartist.json");
var Dashboard1Component = /** @class */ (function () {
    function Dashboard1Component(objSucursalService, objEmpresaService, objClienteService, objEncuestaService, toastr) {
        var _this = this;
        this.objSucursalService = objSucursalService;
        this.objEmpresaService = objEmpresaService;
        this.objClienteService = objClienteService;
        this.objEncuestaService = objEncuestaService;
        this.toastr = toastr;
        this.objParametrosEmpresa = {
            strEstado: "ACTIVO",
            strContador: "SI"
        };
        this.objParametrosSucursal = {
            strEstado: "ACTIVO",
            strContador: "SI",
            intIdUsuario: ""
        };
        this.date = new Date();
        this.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        this.parametros = {
            fechaInicio: '',
            fechaFin: '',
        };
        // Line area chart configuration Starts
        this.lineArea = {
            type: 'Line',
            data: data['lineAreaDashboard'],
            options: {
                low: 0,
                showArea: true,
                fullWidth: true,
                onlyInteger: true,
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                },
                axisX: {
                    showGrid: false
                }
            },
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient',
                        x1: 0,
                        y1: 1,
                        x2: 1,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(0, 201, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(146, 254, 157, 1)'
                    });
                    defs.elem('linearGradient', {
                        id: 'gradient1',
                        x1: 0,
                        y1: 1,
                        x2: 1,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(132, 60, 247, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(56, 184, 242, 1)'
                    });
                },
            },
        };
        // Line area chart configuration Ends
        // Stacked Bar chart configuration Starts
        this.Stackbarchart = {
            type: 'Bar',
            data: {
                labels: [],
                series: [[], []]
            },
            options: {
                stackBars: true,
                fullWidth: true,
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    showGrid: false,
                    showLabel: false,
                    offset: 0
                },
                chartPadding: 30
            },
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'linear',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(0, 201, 255,1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(17,228,183, 1)'
                    });
                },
                draw: function (data) {
                    if (data.type === 'bar') {
                        data.element.attr({
                            style: 'stroke-width: 5px',
                            x1: data.x1 + 0.001
                        });
                    }
                }
            },
        };
        // Stacked Bar chart configuration Starts
        this.StackbarchartArea = {
            type: 'Bar',
            data: {
                labels: [],
                series: [[], []]
            },
            options: {
                stackBars: true,
                fullWidth: true,
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    showGrid: false,
                    showLabel: false,
                    offset: 0
                },
                chartPadding: 30
            },
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'linear',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(0, 201, 255,1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(17,228,183, 1)'
                    });
                },
                draw: function (data) {
                    if (data.type === 'bar') {
                        data.element.attr({
                            style: 'stroke-width: 5px',
                            x1: data.x1 + 0.001
                        });
                    }
                }
            },
        };
        this.EdadesChart = {
            type: 'Bar',
            data: {
                labels: [],
                series: [
                    [],
                    []
                ]
            },
            options: {
                stackBars: true,
                fullWidth: true,
                seriesBarDistance: 10,
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    showGrid: false,
                    showLabel: true,
                    offset: 0
                },
                chartPadding: 60,
            },
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient2',
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgb(255, 133, 51)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgb(204, 0, 0)'
                    });
                },
                draw: function (data) {
                    if (data.type === 'bar') {
                        data.element.attr({
                            style: 'stroke-width: 15px',
                            x1: data.x1 + 0.001
                        });
                        _this.contadorBarrasEdades++;
                        if (_this.totalClientesEdadMensual && _this.contadorBarrasEdades <= _this.totalBarrasEdades) {
                            var percentage = (data.value.y / _this.totalClientesEdadMensual * 100).toFixed(2) + '%';
                            data.group.elem('text', {
                                dx: data.x2 - 0,
                                dy: data.y1 - 170,
                                'text-anchor': 'middle',
                                class: 'ct-bar-label'
                            }).text(data.value.y + " = " + percentage);
                        }
                    }
                    else if (data.type === 'label') {
                        data.element.attr({
                            y: 240
                        });
                    }
                }
            },
        };
        // Stacked Bar chart configuration Ends
        // Line area chart 2 configuration Starts
        this.lineArea2 = {
            type: 'Line',
            data: data['lineArea2'],
            options: {
                showArea: true,
                fullWidth: true,
                lineSmooth: chartist__WEBPACK_IMPORTED_MODULE_1__["Interpolation"].none(),
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                }
            },
            responsiveOptions: [
                ['screen and (max-width: 640px) and (min-width: 381px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 2 === 0 ? value : null;
                            }
                        }
                    }],
                ['screen and (max-width: 380px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 3 === 0 ? value : null;
                            }
                        }
                    }]
            ],
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient2',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-opacity': '0.2',
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-opacity': '0.2',
                        'stop-color': 'rgba(0, 201, 255, 1)'
                    });
                    defs.elem('linearGradient', {
                        id: 'gradient3',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0.3,
                        'stop-opacity': '0.2',
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-opacity': '0.2',
                        'stop-color': 'rgba(132, 60, 247, 1)'
                    });
                },
                draw: function (data) {
                    var circleRadius = 4;
                    if (data.type === 'point') {
                        var circle = new chartist__WEBPACK_IMPORTED_MODULE_1__["Svg"]('circle', {
                            cx: data.x,
                            cy: data.y,
                            r: circleRadius,
                            class: 'ct-point-circle'
                        });
                        data.element.replace(circle);
                    }
                    else if (data.type === 'label') {
                        // adjust label position for rotation
                        var dX = data.width / 2 + (30 - data.width);
                        data.element.attr({ x: data.element.attr('x') - dX });
                    }
                }
            },
        };
        // Line area chart 2 configuration Ends
        // Line chart configuration Starts
        this.lineChart = {
            type: 'Line', data: data['LineDashboard'],
            options: {
                axisX: {
                    showGrid: false
                },
                axisY: {
                    showGrid: false,
                    showLabel: false,
                    low: 0,
                    high: 100,
                    offset: 0,
                },
                fullWidth: true,
                offset: 0,
            },
            events: {
                draw: function (data) {
                    var circleRadius = 4;
                    if (data.type === 'point') {
                        var circle = new chartist__WEBPACK_IMPORTED_MODULE_1__["Svg"]('circle', {
                            cx: data.x,
                            cy: data.y,
                            r: circleRadius,
                            class: 'ct-point-circle'
                        });
                        data.element.replace(circle);
                    }
                    else if (data.type === 'label') {
                        // adjust label position for rotation
                        var dX = data.width / 2 + (30 - data.width);
                        data.element.attr({ x: data.element.attr('x') - dX });
                    }
                }
            },
        };
        // Line chart configuration Ends
        // Donut chart configuration Starts
        this.DonutChart = {
            type: 'Pie',
            data: {
                series: [
                    {
                        name: "Masculino",
                        className: "ct-done",
                        value: 23
                    },
                    {
                        name: "Femenino",
                        className: "ct-progress",
                        value: 14
                    },
                    {
                        name: "Sin Género",
                        className: "ct-outstanding",
                        value: 14
                    }
                ],
                labels: ['Masculino', 'Femenino', 'Sin Género'],
            },
            options: {
                donut: true,
                startAngle: 0,
                showAllTooltips: true,
                chartPadding: 30,
                labelOffset: 50,
                labelDirection: 'explode',
                showLabel: true,
                legend: {
                    position: 'left',
                    placement: 'outside'
                },
            },
            responsiveOptions: [],
        };
        // Donut chart configuration Ends
        //  Bar chart configuration Starts
        this.BarChart = {
            type: 'Bar', data: {
                labels: [],
                series: [
                    []
                ]
            }, options: {
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    showGrid: false,
                    showLabel: false,
                    offset: 0
                },
                low: 0,
                high: 60,
            },
            responsiveOptions: [
                ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0];
                            }
                        }
                    }]
            ]
        };
        // Bar chart configuration Ends
        // line chart configuration Starts
        this.WidgetlineChart = {
            type: 'Line', data: data['WidgetlineChart'],
            options: {
                axisX: {
                    showGrid: true,
                    showLabel: false,
                    offset: 0,
                },
                axisY: {
                    showGrid: false,
                    low: 40,
                    showLabel: false,
                    offset: 0,
                },
                lineSmooth: chartist__WEBPACK_IMPORTED_MODULE_1__["Interpolation"].cardinal({
                    tension: 0
                }),
                fullWidth: true,
            },
        };
        this.nivelSatisfaccion = 0;
        this.objSelectEmpresa = null;
        this.intAnioEncuestas = this.date.getFullYear();
        this.intMesEncuestas = this.date.getMonth() + 1;
        this.arrayMonthNames = [
            { strMes: "Enero", intIdMes: 1 },
            { strMes: "Febrero", intIdMes: 2 },
            { strMes: "Marzo", intIdMes: 3 },
            { strMes: "Abril", intIdMes: 4 },
            { strMes: "Mayo", intIdMes: 5 },
            { strMes: "Junio", intIdMes: 6 },
            { strMes: "Julio", intIdMes: 7 },
            { strMes: "Agosto", intIdMes: 8 },
            { strMes: "Septiembre", intIdMes: 9 },
            { strMes: "Octubre", intIdMes: 10 },
            { strMes: "Noviembre", intIdMes: 11 },
            { strMes: "Diciembre", intIdMes: 12 }
        ];
        this.arrayAnio = [
            { strAnio: "2023", intIdAnio: 2023 },
            { strAnio: "2024", intIdAnio: 2024 },
            { strAnio: "2025", intIdAnio: 2025 },
            { strAnio: "2026", intIdAnio: 2026 },
            { strAnio: "2027", intIdAnio: 2027 }
        ];
        this.boolMostrarGeneroEdad = "SI";
        this.intSelectSucursal = null;
        this.arrayParametrosSucursal = {
            strEstado: "ACTIVO",
            intIdUsuario: ""
        };
        this.getPermisos("Dashboard");
        this.user = JSON.parse(localStorage.getItem('usuario'));
    }
    Dashboard1Component.prototype.ngOnInit = function () {
        this.getDashboard(this.objSelectEmpresa);
    };
    Dashboard1Component.prototype.getDashboard = function (objSelectEmpresa) {
        this.boolMostrarGeneroEdad = this.user.intIdUsuario == 14 ? "NO" : "SI";
        if (this.getAccion('VER')) {
            console.log(this.user);
            this.objParametrosSucursal.intIdUsuario = this.user.intIdUsuario;
            var intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString();
            var intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString();
            this.getTotalEncuestaMensual();
            this.getTotalEncuestaSemanal();
            this.getTotalEncuestaSemestral();
            this.getTotalEncuestaPorArea();
            this.getTotalCliente();
            this.getTotalClientePorEdad(intMesFiltro, intAnioFiltro);
            this.getPromedioClteGenero();
            if (this.user.strTipoRol == "ADMINISTRADOR") {
                this.getTotalEmpresas();
                this.getEmpresas();
            }
            else if (this.user.strTipoRol == "EMPRESA") {
                this.getTotalSucursal();
                this.getSucursales();
            }
            else {
                this.parametros.fechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
                this.parametros.fechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
            }
        }
    };
    Dashboard1Component.prototype.getWeek = function () {
        var firstDayOfYear = new Date(this.date.getFullYear(), 0, 1);
        var pastDaysOfYear = (this.date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };
    Dashboard1Component.prototype.getPermisos = function (descModulo) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'));
        this.acciones = this.permisos.filter(function (item) { return item['DESCRIPCION_MODULO'] == descModulo; });
    };
    Dashboard1Component.prototype.getAccion = function (descAccion) {
        return (this.acciones.find(function (item) { return item['DESCRIPCION_ACCION'] == descAccion; }) != undefined);
    };
    Dashboard1Component.prototype.getEmpresas = function () {
        var _this = this;
        this.objParametrosEmpresa.strContador = "NO";
        this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
            .subscribe(function (data) {
            if (data['intStatus'] != 200) {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
            else {
                _this.arrayRestaurante = data["arrayEmpresa"];
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getSucursales = function () {
        var _this = this;
        this.arrayParametrosSucursal.intIdUsuario = this.user.intIdUsuario;
        this.objSucursalService.getSucursal(this.arrayParametrosSucursal)
            .subscribe(function (data) {
            _this.arraySucursal = data["arraySucursal"];
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalEmpresas = function () {
        var _this = this;
        this.objParametrosEmpresa.strContador = "SI";
        this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
            .subscribe(function (data) {
            if (data['intStatus'] != 200) {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
            else {
                _this.intTotalEmpresas = data['arrayEmpresa'][0]['intCantidad'];
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalSucursal = function () {
        var _this = this;
        this.objSucursalService.getSucursal(this.objParametrosSucursal)
            .subscribe(function (data) {
            if (data['intStatus'] != 200) {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
            else {
                _this.intTotalSucursal = data['arraySucursal'][0]['intCantidad'];
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalCliente = function () {
        var _this = this;
        this.objClienteService.getTotalCliente(this.user.intIdUsuario)
            .subscribe(function (data) {
            if (data["arrayData"][0]["intCantidad"] != null && data["arrayData"][0]["intCantidad"] != "") {
                _this.totalClientes = data["arrayData"][0]["intCantidad"];
            }
            else {
                _this.totalClientes = '0';
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalEncuestaMensual = function () {
        var _this = this;
        var intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString();
        var intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString();
        this.objEncuestaService.getTotalEncuestaMensual(intMesFiltro, intAnioFiltro, this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(function (data) {
            if (data["intStatus"] == 200) {
                _this.intTotalEncuesta = data["arrayData"][0]["intCantidad"];
            }
            else {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalEncuestaSemestral = function () {
        var _this = this;
        this.objEncuestaService.getTotalEncuestaSemestral(this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(function (data) {
            if (data["intStatus"] == 200) {
                _this.totalEncuestasSemestral = data['arrayData'];
                if (_this.totalEncuestasSemestral != null && _this.totalEncuestasSemestral != '') {
                    var maxValue_1 = _this.totalEncuestasSemestral.reduce(function (prev, current) {
                        return (Number.parseInt(prev.intCantidad) > Number.parseInt(current.intCantidad)) ? prev : current;
                    });
                    _this.Stackbarchart.data = {
                        labels: _this.totalEncuestasSemestral.map(function (item) { return item.intCantidad + "\n \n" + _this.monthNames[item.intMes - 1]; }),
                        series: [_this.totalEncuestasSemestral.map(function (item) { return item.intCantidad; }), _this.totalEncuestasSemestral.map(function (item) { return maxValue_1.intCantidad - item.intCantidad; })
                        ]
                    };
                }
            }
            else {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalEncuestaPorArea = function () {
        var _this = this;
        var intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString();
        var intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString();
        this.objEncuestaService.getTotalEncuestaPorArea(intMesFiltro, intAnioFiltro, this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(function (data) {
            if (data["intStatus"] == 200) {
                _this.totalEncuestasPorArea = data['arrayData'];
                if (_this.totalEncuestasPorArea != null && _this.totalEncuestasPorArea != '') {
                    var maxValue_2 = _this.totalEncuestasPorArea.reduce(function (prev, current) {
                        return (Number.parseInt(prev.intCantidad) > Number.parseInt(current.intCantidad)) ? prev : current;
                    });
                    _this.StackbarchartArea.data = {
                        labels: _this.totalEncuestasPorArea.map(function (item) { return item.intCantidad + "\n \n" + item.strArea; }),
                        series: [_this.totalEncuestasPorArea.map(function (item) { return item.intCantidad; }), _this.totalEncuestasPorArea.map(function (item) { return maxValue_2.intCantidad - item.intCantidad; })
                        ]
                    };
                }
            }
            else {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getTotalEncuestaSemanal = function () {
        var _this = this;
        this.objEncuestaService.getTotalEncuestaSemanal(this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(function (data) {
            if (data['intStatus'] == 200) {
                _this.totalEncuestaSemanal = data['arrayData'];
            }
            else {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component.prototype.getPromedioClteGenero = function () {
        var _this = this;
        var intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString();
        var intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString();
        this.objEncuestaService.getPromedioClteGenero(intMesFiltro, intAnioFiltro, this.user.intIdUsuario, this.objSelectEmpresa)
            .subscribe(function (data) {
            if (data["intStatus"] == 200) {
                _this.clientesGeneroMensual = data["arrayData"];
                _this.DonutChart.data = {
                    series: [
                        {
                            name: "Masculino",
                            className: "ct-done",
                            value: _this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'MASCULINO'; })
                                .map(function (element) { return Number.parseInt(element.intCantidad); })
                                .reduce(function (prev, current) {
                                return (prev + current);
                            }, 0)
                        },
                        {
                            name: "Femenino",
                            className: "ct-progress",
                            value: _this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'FEMENINO'; })
                                .map(function (element) { return Number.parseInt(element.intCantidad); })
                                .reduce(function (prev, current) {
                                return (prev + current);
                            }, 0)
                        },
                        {
                            name: "Sin Genero",
                            className: "ct-outstanding",
                            value: _this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'SIN GENERO'; })
                                .map(function (element) { return Number.parseInt(element.intCantidad); })
                                .reduce(function (prev, current) {
                                return (prev + current);
                            }, 0)
                        }
                    ],
                    labels: [
                        (((_this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'MASCULINO'; })
                            .map(function (element) { return Number.parseInt(element.intCantidad); })
                            .reduce(function (prev, current) {
                            return (prev + current);
                        }, 0)) / (_this.clientesGeneroMensual.map(function (element) { return Number.parseInt(element.intCantidad); })
                            .reduce(function (prev, current) {
                            return (prev + current);
                        }, 0))) * 100).toFixed(2) + "%",
                        (((_this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'FEMENINO'; })
                            .map(function (element) { return Number.parseInt(element.intCantidad); })
                            .reduce(function (prev, current) {
                            return (prev + current);
                        }, 0)) / (_this.clientesGeneroMensual.map(function (element) { return Number.parseInt(element.intCantidad); })
                            .reduce(function (prev, current) {
                            return (prev + current);
                        }, 0))) * 100).toFixed(2) + "%",
                        (_this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'SIN GENERO'; })
                            .map(function (element) { return Number.parseInt(element.intCantidad); })
                            .reduce(function (prev, current) {
                            return (prev + current);
                        }, 0)) != 0 ?
                            (((_this.clientesGeneroMensual.filter(function (item) { return item.intGenero == 'SIN GENERO'; })
                                .map(function (element) { return Number.parseInt(element.intCantidad); })
                                .reduce(function (prev, current) {
                                return (prev + current);
                            }, 0)) / (_this.clientesGeneroMensual.map(function (element) { return Number.parseInt(element.intCantidad); })
                                .reduce(function (prev, current) {
                                return (prev + current);
                            }, 0))) * 100).toFixed(2) + "%" : "0%",
                    ],
                };
            }
            else {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    // Guarda el total de clientes
    Dashboard1Component.prototype.getTotalClientePorEdad = function (intMes, intAnio) {
        var _this = this;
        this.objClienteService.getTotalClientePorEdad(intMes, intAnio, this.user.intIdUsuario, this.objSelectEmpresa)
            .subscribe(function (data) {
            if (data["intStatus"] == 200) {
                if (data["arrayData"] != null && data["arrayData"] != '') {
                    _this.objClientesEdadSinGeneracion = data["arrayData"].filter(function (element) { return element.strGeneracion == null; });
                    _this.intClientesEdadSinGeneracion = _this.objClientesEdadSinGeneracion[0].intCantidad;
                    _this.clientesEdadMensual = data["arrayData"].filter(function (element) { return element.strGeneracion !== null; });
                    _this.totalClientesEdadMensual = _this.clientesEdadMensual.reduce(function (sum, item) { return sum + item.intCantidad; }, 0) + _this.intClientesEdadSinGeneracion;
                    _this.totalBarrasEdades = data["arrayData"].length - 1;
                    _this.contadorBarrasEdades = 0;
                    _this.porcentajeTotal = (_this.intClientesEdadSinGeneracion * 100) / _this.totalClientesEdadMensual;
                    _this.porcentajeTotal = Number.parseInt(_this.porcentajeTotal.toFixed(2));
                    var maxValue_3 = _this.clientesEdadMensual.reduce(function (prev, current) {
                        return (Number.parseInt(prev.intCantidad) > Number.parseInt(current.intCantidad)) ? prev : current;
                    });
                    var labels_1 = [];
                    _this.clientesEdadMensual.forEach(function (element) {
                        labels_1.push(element['strGeneracion']);
                    });
                    console.log("lamamos a chart--------------" + _this.totalBarrasEdades);
                    _this.EdadesChart.data = {
                        labels: labels_1,
                        series: [
                            _this.clientesEdadMensual.map(function (item) { return item.intCantidad; }),
                            _this.clientesEdadMensual.map(function (item) { return maxValue_3.intCantidad - item.intCantidad; })
                        ]
                    };
                    _this.EdadesChart.options.plugins = [
                        chartist__WEBPACK_IMPORTED_MODULE_1__["plugins"].tooltip({
                            anchorToPoint: true,
                            appendToBody: true,
                            pointClass: 'ct-point'
                        })
                    ];
                    // Aquí deberías forzar la actualización del gráfico si es necesario
                    // Esto depende de cómo estás manejando el gráfico en tu aplicación
                    // Por ejemplo, si estás utilizando una biblioteca específica para Chartist
                }
            }
            else {
                _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
            }
        }, function (error) {
            _this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
        });
    };
    Dashboard1Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard1',
            template: __webpack_require__(/*! ./dashboard1.component.html */ "./src/app/dashboard/dashboard1/dashboard1.component.html"),
            styles: [__webpack_require__(/*! ./dashboard1.component.scss */ "./src/app/dashboard/dashboard1/dashboard1.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_sucursal_service__WEBPACK_IMPORTED_MODULE_4__["SucursalService"],
            app_services_empresa_service__WEBPACK_IMPORTED_MODULE_5__["EmpresaService"],
            app_services_cliente_service__WEBPACK_IMPORTED_MODULE_2__["ClienteService"],
            app_services_encuesta_service__WEBPACK_IMPORTED_MODULE_3__["EncuestaService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"]])
    ], Dashboard1Component);
    return Dashboard1Component;
}());



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map