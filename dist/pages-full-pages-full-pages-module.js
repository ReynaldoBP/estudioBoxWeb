(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-full-pages-full-pages-module"],{

/***/ "./src/app/pages/full-pages/faq/faq.component.html":
/*!*********************************************************!*\
  !*** ./src/app/pages/full-pages/faq/faq.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-sm-12\">\r\n    <div class=\"content-header\">FAQs</div>\r\n    <p class=\"content-sub-header\">We're here to help</p>\r\n  </div>\r\n</div>\r\n<!-- faq starts -->\r\n<section id=\"faq\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card gradient-purple-bliss white text-center p-4\">\r\n        <div class=\"card-header\">\r\n          <h1>We're here to help!!</h1>\r\n          <p><em>If you have any question you can ask below or enter what you are looking for!</em></p>\r\n        </div>\r\n        <div class=\"card-block\">\r\n          <fieldset class=\"form-group col-xl-12 col-lg-10 col-10\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search in faqs..\" (input)=\"filter($event.target.value)\" #messageInput>\r\n          </fieldset>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-block\">\r\n          <ngb-accordion [closeOthers]=\"true\">\r\n            <ngb-panel [id]=\"faq.faqId\" *ngFor=\"let faq of faqs\">\r\n                <ng-template ngbPanelTitle>\r\n                   <h5><i class=\"icon-question mr-2\"></i> <span> {{faq.title}}</span></h5>\r\n                  </ng-template>\r\n              <ng-template ngbPanelContent>\r\n                <div class=\"card-block\">\r\n                  {{faq.content}}\r\n                </div>\r\n              </ng-template>\r\n            </ngb-panel>           \r\n          </ngb-accordion>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n<!-- faq Ends -->"

/***/ }),

/***/ "./src/app/pages/full-pages/faq/faq.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/pages/full-pages/faq/faq.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvZmFxL2ZhcS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/full-pages/faq/faq.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/full-pages/faq/faq.component.ts ***!
  \*******************************************************/
/*! exports provided: FaqComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqComponent", function() { return FaqComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _faq_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faq.service */ "./src/app/pages/full-pages/faq/faq.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaqComponent = /** @class */ (function () {
    function FaqComponent(faqService) {
        this.faqService = faqService;
        this.faqs = faqService.faqs;
    }
    FaqComponent.prototype.filter = function (searchValue) {
        if (searchValue === '') {
            this.faqs = this.faqService.faqs;
        }
        else {
            this.faqs = this.faqService.faqs.filter(function (faqs) { return faqs.title.toUpperCase().indexOf(searchValue.toUpperCase()) != -1 || faqs.content.toUpperCase().indexOf(searchValue.toUpperCase()) != -1; });
        }
    };
    FaqComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-faq',
            template: __webpack_require__(/*! ./faq.component.html */ "./src/app/pages/full-pages/faq/faq.component.html"),
            providers: [_faq_service__WEBPACK_IMPORTED_MODULE_1__["FaqService"]],
            styles: [__webpack_require__(/*! ./faq.component.scss */ "./src/app/pages/full-pages/faq/faq.component.scss")]
        }),
        __metadata("design:paramtypes", [_faq_service__WEBPACK_IMPORTED_MODULE_1__["FaqService"]])
    ], FaqComponent);
    return FaqComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/faq/faq.model.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/full-pages/faq/faq.model.ts ***!
  \***************************************************/
/*! exports provided: FAQ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAQ", function() { return FAQ; });
var FAQ = /** @class */ (function () {
    function FAQ(faqId, title, content) {
        this.faqId = faqId;
        this.title = title;
        this.content = content;
    }
    return FAQ;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/faq/faq.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/full-pages/faq/faq.service.ts ***!
  \*****************************************************/
/*! exports provided: FaqService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqService", function() { return FaqService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _faq_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faq.model */ "./src/app/pages/full-pages/faq/faq.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaqService = /** @class */ (function () {
    function FaqService() {
        this.faqs = [
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n             Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n             Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](2, 'Vestibulum hendrerit eros id finibus fermentum?', "Nam tincidunt rhoncus dolor nec imperdiet. Ut ut mauris tortor. Nulla cursus mattis elit, sed egestas augue laoreet id.\n             Etiam eu velit felis. Duis at vehicula ligula, et suscipit nunc."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](3, 'Nunc maximus turpis et vulputate euismod?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n            Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n            Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](4, 'Vivamus pulvinar diam at viverra sagittis?', "Nam tincidunt rhoncus dolor nec imperdiet. Ut ut mauris tortor. Nulla cursus mattis elit, sed egestas augue laoreet id. Etiam eu velit felis.\n             Duis at vehicula ligula, et suscipit nunc."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](5, 'Sed elementum nisl ac lectus luctus viverra?', "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](6, 'Nulla ut tortor et arcu porttitor sollicitudin a a odio?', "Sed sit amet feugiat mi. Morbi dui dui, ultrices id commodo in, commodo ut erat. Ut vitae condimentum lorem. Cras eu viverra metus, fringilla tincidunt est. Aenean cursus,\n             lacus ut posuere convallis, est dolor tincidunt nunc, nec viverra justo lorem a enim."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](7, 'Phasellus imperdiet eros vitae mi malesuada consectetur?', "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](8, 'Duis at metus eleifend, elementum mauris eu, tincidunt du?', "Sed sit amet feugiat mi. Morbi dui dui, ultrices id commodo in, commodo ut erat. Ut vitae condimentum lorem. Cras eu viverra metus, fringilla tincidunt est.\n             Aenean cursus, lacus ut posuere convallis, est dolor tincidunt nunc, nec viverra justo lorem a enim"),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](9, 'Sed sit amet lacus sagittis, viverra ex at, volutpat leo?', "Vivamus eu consectetur dui. Pellentesque eu mi et lacus mollis tempor. Etiam sed lobortis sapien. Mauris ultrices bibendum elit, at egestas felis elementum vitae.\n             Mauris viverra nulla vitae pulvinar sollicitudin. Morbi non iaculis tortor. In hac habitasse platea dictumst"),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](10, 'Proin facilisis magna congue mattis mattis?', "Integer ornare elementum augue, in scelerisque magna efficitur non. Suspendisse laoreet purus nec augue malesuada auctor. Donec mollis eleifend auctor. Aliquam arcu erat, aliquam placerat risus at, fermentum efficitur nibh.\n             Ut sed viverra neque, nec hendrerit tortor. "),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](11, 'Suspendisse eget nibh ut urna tincidunt efficitur?', "Vivamus eu consectetur dui. Pellentesque eu mi et lacus mollis tempor. Etiam sed lobortis sapien. Mauris ultrices bibendum elit, at egestas felis elementum vitae. Mauris viverra nulla vitae pulvinar sollicitudin.\n             Morbi non iaculis tortor. In hac habitasse platea dictumst"),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](12, 'Fusce sed velit ut nibh blandit posuere?', "Integer ornare elementum augue, in scelerisque magna efficitur non. Suspendisse laoreet purus nec augue malesuada auctor. Donec mollis eleifend auctor. Aliquam arcu erat, aliquam placerat risus at, fermentum efficitur nibh.\n             Ut sed viverra neque, nec hendrerit tortor. "),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](13, 'Etiam auctor nisi non sollicitudin aliquet?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n            Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n            Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](14, 'Donec sit amet orci sit amet tellus laoreet tempus?', "Integer ornare elementum augue, in scelerisque magna efficitur non. Suspendisse laoreet purus nec augue malesuada auctor. Donec mollis eleifend auctor. Aliquam arcu erat, aliquam placerat risus at, fermentum efficitur nibh.\n             Ut sed viverra neque, nec hendrerit tortor. "),
            new _faq_model__WEBPACK_IMPORTED_MODULE_1__["FAQ"](15, 'Nullam consequat urna ac nunc lobortis ullamcorper?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n            Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n            Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
        ];
    }
    FaqService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FaqService);
    return FaqService;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/full-pages-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/full-pages/full-pages-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: FullPagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullPagesRoutingModule", function() { return FullPagesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _gallery_gallery_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery/gallery-page.component */ "./src/app/pages/full-pages/gallery/gallery-page.component.ts");
/* harmony import */ var _invoice_invoice_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invoice/invoice-page.component */ "./src/app/pages/full-pages/invoice/invoice-page.component.ts");
/* harmony import */ var _timeline_horizontal_horizontal_timeline_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeline/horizontal/horizontal-timeline-page.component */ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.ts");
/* harmony import */ var _timeline_vertical_vertical_timeline_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./timeline/vertical/vertical-timeline-page.component */ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.ts");
/* harmony import */ var _user_profile_user_profile_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-profile/user-profile-page.component */ "./src/app/pages/full-pages/user-profile/user-profile-page.component.ts");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search/search.component */ "./src/app/pages/full-pages/search/search.component.ts");
/* harmony import */ var _faq_faq_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./faq/faq.component */ "./src/app/pages/full-pages/faq/faq.component.ts");
/* harmony import */ var _knowledge_base_knowledge_base_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./knowledge-base/knowledge-base.component */ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.ts");
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
                path: 'gallery',
                component: _gallery_gallery_page_component__WEBPACK_IMPORTED_MODULE_2__["GalleryPageComponent"],
                data: {
                    title: 'Gallery Page'
                }
            },
            {
                path: 'invoice',
                component: _invoice_invoice_page_component__WEBPACK_IMPORTED_MODULE_3__["InvoicePageComponent"],
                data: {
                    title: 'Invoice Page'
                }
            },
            {
                path: 'horizontaltimeline',
                component: _timeline_horizontal_horizontal_timeline_page_component__WEBPACK_IMPORTED_MODULE_4__["HorizontalTimelinePageComponent"],
                data: {
                    title: 'Horizontal Timeline Page'
                }
            },
            {
                path: 'verticaltimeline',
                component: _timeline_vertical_vertical_timeline_page_component__WEBPACK_IMPORTED_MODULE_5__["VerticalTimelinePageComponent"],
                data: {
                    title: 'Vertical Timeline Page'
                }
            },
            {
                path: 'profile/:id',
                component: _user_profile_user_profile_page_component__WEBPACK_IMPORTED_MODULE_6__["UserProfilePageComponent"],
                data: {
                    title: 'User Profile Page'
                }
            },
            {
                path: 'search',
                component: _search_search_component__WEBPACK_IMPORTED_MODULE_7__["SearchComponent"],
                data: {
                    title: 'Search'
                }
            },
            {
                path: 'faq',
                component: _faq_faq_component__WEBPACK_IMPORTED_MODULE_8__["FaqComponent"],
                data: {
                    title: 'FAQ'
                }
            },
            {
                path: 'kb',
                component: _knowledge_base_knowledge_base_component__WEBPACK_IMPORTED_MODULE_9__["KnowledgeBaseComponent"],
                data: {
                    title: 'Knowledge Base'
                }
            }
        ]
    }
];
var FullPagesRoutingModule = /** @class */ (function () {
    function FullPagesRoutingModule() {
    }
    FullPagesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], FullPagesRoutingModule);
    return FullPagesRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/full-pages.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/full-pages/full-pages.module.ts ***!
  \*******************************************************/
/*! exports provided: FullPagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullPagesModule", function() { return FullPagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _full_pages_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./full-pages-routing.module */ "./src/app/pages/full-pages/full-pages-routing.module.ts");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-chartist */ "./node_modules/ng-chartist/dist/ng-chartist.js");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng_chartist__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _gallery_gallery_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gallery/gallery-page.component */ "./src/app/pages/full-pages/gallery/gallery-page.component.ts");
/* harmony import */ var _invoice_invoice_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./invoice/invoice-page.component */ "./src/app/pages/full-pages/invoice/invoice-page.component.ts");
/* harmony import */ var _timeline_horizontal_horizontal_timeline_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./timeline/horizontal/horizontal-timeline-page.component */ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.ts");
/* harmony import */ var _timeline_horizontal_component_horizontal_timeline_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./timeline/horizontal/component/horizontal-timeline.component */ "./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.ts");
/* harmony import */ var _timeline_vertical_vertical_timeline_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./timeline/vertical/vertical-timeline-page.component */ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.ts");
/* harmony import */ var _user_profile_user_profile_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./user-profile/user-profile-page.component */ "./src/app/pages/full-pages/user-profile/user-profile-page.component.ts");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./search/search.component */ "./src/app/pages/full-pages/search/search.component.ts");
/* harmony import */ var _faq_faq_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./faq/faq.component */ "./src/app/pages/full-pages/faq/faq.component.ts");
/* harmony import */ var _knowledge_base_knowledge_base_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./knowledge-base/knowledge-base.component */ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.ts");
/* harmony import */ var app_pipes_SharingModule__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/_pipes/SharingModule */ "./src/app/_pipes/SharingModule.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var FullPagesModule = /** @class */ (function () {
    function FullPagesModule() {
    }
    FullPagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _full_pages_routing_module__WEBPACK_IMPORTED_MODULE_3__["FullPagesRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                ng_chartist__WEBPACK_IMPORTED_MODULE_4__["ChartistModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmCoreModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
                app_pipes_SharingModule__WEBPACK_IMPORTED_MODULE_16__["SharingModule"].forRoot(),
            ],
            declarations: [
                _gallery_gallery_page_component__WEBPACK_IMPORTED_MODULE_7__["GalleryPageComponent"],
                _invoice_invoice_page_component__WEBPACK_IMPORTED_MODULE_8__["InvoicePageComponent"],
                _timeline_horizontal_horizontal_timeline_page_component__WEBPACK_IMPORTED_MODULE_9__["HorizontalTimelinePageComponent"],
                _timeline_horizontal_component_horizontal_timeline_component__WEBPACK_IMPORTED_MODULE_10__["HorizontalTimelineComponent"],
                _timeline_vertical_vertical_timeline_page_component__WEBPACK_IMPORTED_MODULE_11__["VerticalTimelinePageComponent"],
                _user_profile_user_profile_page_component__WEBPACK_IMPORTED_MODULE_12__["UserProfilePageComponent"],
                _search_search_component__WEBPACK_IMPORTED_MODULE_13__["SearchComponent"],
                _faq_faq_component__WEBPACK_IMPORTED_MODULE_14__["FaqComponent"],
                _knowledge_base_knowledge_base_component__WEBPACK_IMPORTED_MODULE_15__["KnowledgeBaseComponent"]
            ]
        })
    ], FullPagesModule);
    return FullPagesModule;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/gallery/gallery-page.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/full-pages/gallery/gallery-page.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Gallery Hover Effect Starts-->\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"content-header\">Hover Effects</div>\r\n        <p class=\"content-sub-header\">Image gallery grid with 30 subtle hover effect. Try to hover below demo images to show each hover effect.</p>\r\n    </div>\r\n</div>\r\n<section id=\"hover-effects\" class=\"card\">\r\n  <div class=\"card-body\">\r\n    <div class=\"card-block my-gallery\" itemscope itemtype=\"http://schema.org/ImageGallery\">\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Lily</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-lily\">\r\n              <img src=\"assets/img/gallery/12.jpg\" alt=\"img12\" />\r\n              <figcaption>\r\n                <div>\r\n                  <h2>Nice\r\n                    <span>Lily</span>\r\n                  </h2>\r\n                  <p>Lily likes to play with crayons and pencils</p>\r\n                </div>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-lily\">\r\n              <img src=\"assets/img/gallery/1.jpg\" alt=\"img1\" />\r\n              <figcaption>\r\n                <div>\r\n                  <h2>Nice\r\n                    <span>Lily</span>\r\n                  </h2>\r\n                  <p>Lily likes to play with crayons and pencils</p>\r\n                </div>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Sadie</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-sadie\">\r\n              <img src=\"assets/img/gallery/2.jpg\" alt=\"img02\" />\r\n              <figcaption>\r\n                <h2>Holy\r\n                  <span>Sadie</span>\r\n                </h2>\r\n                <p>Sadie never took her eyes off me.\r\n                  <br>She had a dark soul.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-sadie\">\r\n              <img src=\"assets/img/gallery/14.jpg\" alt=\"img14\" />\r\n              <figcaption>\r\n                <h2>Holy\r\n                  <span>Sadie</span>\r\n                </h2>\r\n                <p>Sadie never took her eyes off me.\r\n                  <br>She had a dark soul.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Honey</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-honey\">\r\n              <img src=\"assets/img/gallery/4.jpg\" alt=\"img04\" />\r\n              <figcaption>\r\n                <h2>Dreamy\r\n                  <span>Honey</span> <i>Now</i></h2>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-honey\">\r\n              <img src=\"assets/img/gallery/5.jpg\" alt=\"img05\" />\r\n              <figcaption>\r\n                <h2>Dreamy\r\n                  <span>Honey</span> <i>Now</i></h2>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Layla</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-layla\">\r\n              <img src=\"assets/img/gallery/6.jpg\" alt=\"img06\" />\r\n              <figcaption>\r\n                <h2>Crazy\r\n                  <span>Layla</span>\r\n                </h2>\r\n                <p>When Layla appears, she brings an eternal summer along.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-layla\">\r\n              <img src=\"assets/img/gallery/3.jpg\" alt=\"img03\" />\r\n              <figcaption>\r\n                <h2>Crazy\r\n                  <span>Layla</span>\r\n                </h2>\r\n                <p>When Layla appears, she brings an eternal summer along.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Zoe</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-zoe\">\r\n              <img src=\"assets/img/gallery/25.jpg\" alt=\"img25\" />\r\n              <figcaption>\r\n                <h2>Creative\r\n                  <span>Zoe</span>\r\n                </h2>\r\n                <p class=\"icon-links\">\r\n                  <a class=\"mr-1\"><i class=\"ft-heart\"></i></a>\r\n                  <a class=\"mr-1\"><i class=\"ft-eye\"></i></a>\r\n                  <a class=\"mr-1\"><i class=\"ft-edit\"></i></a>\r\n                </p>\r\n                <p class=\"description\">Zoe never had the patience of her sisters. She deliberately punched the bear in his face.</p>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-zoe\">\r\n              <img src=\"assets/img/gallery/26.jpg\" alt=\"img26\" />\r\n              <figcaption>\r\n                <h2>Creative\r\n                  <span>Zoe</span>\r\n                </h2>\r\n                <p class=\"icon-links\">\r\n                  <a class=\"mr-1\"><i class=\"ft-heart\"></i></a>\r\n                  <a class=\"mr-1\"><i class=\"ft-eye\"></i></a>\r\n                  <a class=\"mr-1\"><i class=\"ft-edit\"></i></a>\r\n                </p>\r\n                <p class=\"description\">Zoe never had the patience of her sisters. She deliberately punched the bear in his face.</p>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Oscar</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-oscar\">\r\n              <img src=\"assets/img/gallery/9.jpg\" alt=\"img09\" />\r\n              <figcaption>\r\n                <h2>Warm\r\n                  <span>Oscar</span>\r\n                </h2>\r\n                <p>Oscar is a decent man. He used to clean porches with pleasure.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-oscar\">\r\n              <img src=\"assets/img/gallery/10.jpg\" alt=\"img10\" />\r\n              <figcaption>\r\n                <h2>Warm\r\n                  <span>Oscar</span>\r\n                </h2>\r\n                <p>Oscar is a decent man. He used to clean porches with pleasure.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Marley</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-marley\">\r\n              <img src=\"assets/img/gallery/11.jpg\" alt=\"img11\" />\r\n              <figcaption>\r\n                <h2>Sweet\r\n                  <span>Marley</span>\r\n                </h2>\r\n                <p>Marley tried to convince her but she was not interested.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-marley\">\r\n              <img src=\"assets/img/gallery/12.jpg\" alt=\"img12\" />\r\n              <figcaption>\r\n                <h2>Sweet\r\n                  <span>Marley</span>\r\n                </h2>\r\n                <p>Marley tried to convince her but she was not interested.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Ruby</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-ruby\">\r\n              <img src=\"assets/img/gallery/13.jpg\" alt=\"img13\" />\r\n              <figcaption>\r\n                <h2>Glowing\r\n                  <span>Ruby</span>\r\n                </h2>\r\n                <p>Ruby did not need any help. Everybody knew that.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-ruby\">\r\n              <img src=\"assets/img/gallery/14.jpg\" alt=\"img14\" />\r\n              <figcaption>\r\n                <h2>Glowing\r\n                  <span>Ruby</span>\r\n                </h2>\r\n                <p>Ruby did not need any help. Everybody knew that.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Roxy</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-roxy\">\r\n              <img src=\"assets/img/gallery/15.jpg\" alt=\"img15\" />\r\n              <figcaption>\r\n                <h2>Charming\r\n                  <span>Roxy</span>\r\n                </h2>\r\n                <p>Roxy was my best friend. She'd cross any border for me.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-roxy\">\r\n              <img src=\"assets/img/gallery/1.jpg\" alt=\"img01\" />\r\n              <figcaption>\r\n                <h2>Charming\r\n                  <span>Roxy</span>\r\n                </h2>\r\n                <p>Roxy was my best friend. She'd cross any border for me.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Bubba</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-bubba\">\r\n              <img src=\"assets/img/gallery/2.jpg\" alt=\"img02\" />\r\n              <figcaption>\r\n                <h2>Fresh\r\n                  <span>Bubba</span>\r\n                </h2>\r\n                <p>Bubba likes to appear out of thin air.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-bubba\">\r\n              <img src=\"assets/img/gallery/16.jpg\" alt=\"img16\" />\r\n              <figcaption>\r\n                <h2>Fresh\r\n                  <span>Bubba</span>\r\n                </h2>\r\n                <p>Bubba likes to appear out of thin air.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Romeo</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-romeo\">\r\n              <img src=\"assets/img/gallery/17.jpg\" alt=\"img17\" />\r\n              <figcaption>\r\n                <h2>Wild\r\n                  <span>Romeo</span>\r\n                </h2>\r\n                <p>Romeo never knows what he wants. He seemed to be very cross about something.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-romeo\">\r\n              <img src=\"assets/img/gallery/18.jpg\" alt=\"img18\" />\r\n              <figcaption>\r\n                <h2>Wild\r\n                  <span>Romeo</span>\r\n                </h2>\r\n                <p>Romeo never knows what he wants. He seemed to be very cross about something.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Dexter</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-dexter\">\r\n              <img src=\"assets/img/gallery/19.jpg\" alt=\"img19\" />\r\n              <figcaption>\r\n                <h2>Strange\r\n                  <span>Dexter</span>\r\n                </h2>\r\n                <p>Dexter had his own strange way. You could watch him training ants.\r\n                </p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-dexter\">\r\n              <img src=\"assets/img/gallery/12.jpg\" alt=\"img12\" />\r\n              <figcaption>\r\n                <h2>Strange\r\n                  <span>Dexter</span>\r\n                </h2>\r\n                <p>Dexter had his own strange way. You could watch him training ants.\r\n                </p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Sarah</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-sarah\">\r\n              <img src=\"assets/img/gallery/13.jpg\" alt=\"img13\" />\r\n              <figcaption>\r\n                <h2>Free\r\n                  <span>Sarah</span>\r\n                </h2>\r\n                <p>Sarah likes to watch clouds. She's quite depressed.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-sarah\">\r\n              <img src=\"assets/img/gallery/20.jpg\" alt=\"img20\" />\r\n              <figcaption>\r\n                <h2>Free\r\n                  <span>Sarah</span>\r\n                </h2>\r\n                <p>Sarah likes to watch clouds. She's quite depressed.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Chico</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-chico\">\r\n              <img src=\"assets/img/gallery/15.jpg\" alt=\"img15\" />\r\n              <figcaption>\r\n                <h2>Silly\r\n                  <span>Chico</span>\r\n                </h2>\r\n                <p>Chico's main fear was missing the morning bus.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-chico\">\r\n              <img src=\"assets/img/gallery/4.jpg\" alt=\"img04\" />\r\n              <figcaption>\r\n                <h2>Silly\r\n                  <span>Chico</span>\r\n                </h2>\r\n                <p>Chico's main fear was missing the morning bus.</p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"grid-hover\">\r\n        <h5 class=\"text-bold-400 text-uppercase\">Milo</h5>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-milo\">\r\n              <img src=\"assets/img/gallery/11.jpg\" alt=\"img11\" />\r\n              <figcaption>\r\n                <h2>Faithful\r\n                  <span>Milo</span>\r\n                </h2>\r\n                <p>Milo went to the woods. He took a fun ride and never came back.\r\n                </p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n          <div class=\"col-md-6 col-12\">\r\n            <figure class=\"effect-milo\">\r\n              <img src=\"assets/img/gallery/3.jpg\" alt=\"img03\" />\r\n              <figcaption>\r\n                <h2>Faithful\r\n                  <span>Milo</span>\r\n                </h2>\r\n                <p>Milo went to the woods. He took a fun ride and never came back.\r\n                </p>\r\n                <a>View more</a>\r\n              </figcaption>\r\n            </figure>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n<!--Gallery Hover Effect Starts-->\r\n"

/***/ }),

/***/ "./src/app/pages/full-pages/gallery/gallery-page.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/full-pages/gallery/gallery-page.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvZ2FsbGVyeS9nYWxsZXJ5LXBhZ2UuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/full-pages/gallery/gallery-page.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/full-pages/gallery/gallery-page.component.ts ***!
  \********************************************************************/
/*! exports provided: GalleryPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryPageComponent", function() { return GalleryPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GalleryPageComponent = /** @class */ (function () {
    function GalleryPageComponent() {
    }
    GalleryPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-gallery-page',
            template: __webpack_require__(/*! ./gallery-page.component.html */ "./src/app/pages/full-pages/gallery/gallery-page.component.html"),
            styles: [__webpack_require__(/*! ./gallery-page.component.scss */ "./src/app/pages/full-pages/gallery/gallery-page.component.scss")]
        })
    ], GalleryPageComponent);
    return GalleryPageComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/invoice/invoice-page.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/full-pages/invoice/invoice-page.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Invoice template starts-->\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <h4>Invoice</h4>\r\n    </div>\r\n</div>\r\n<section class=\"invoice-template\">\r\n    <div class=\"card\">\r\n        <div class=\"card-body p-3\">\r\n            <div id=\"invoice-template\" class=\"card-block\">\r\n                <!-- Invoice Company Details -->\r\n                <div id=\"invoice-company-details\" class=\"row\">\r\n                    <div class=\"col-6 text-left\">\r\n                        <img src=\"assets/img/logos/logo-big-black.png\" alt=\"company logo\" class=\"mb-2\" width=\"70\">\r\n                        <ul class=\"px-0 list-unstyled\">\r\n                            <li class=\"text-bold-800\">Pixinvent Creative Studio</li>\r\n                            <li>4025 Oak Avenue,</li>\r\n                            <li>Melbourne,</li>\r\n                            <li>Florida 32940,</li>\r\n                            <li>USA</li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"col-6 text-right\">\r\n                        <h2>INVOICE</h2>\r\n                        <p class=\"pb-3\"># INV-001001</p>\r\n                        <ul class=\"px-0 list-unstyled\">\r\n                            <li>Balance Due</li>\r\n                            <li class=\"lead text-bold-800\">$ 12,000.00</li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <!--/ Invoice Company Details -->\r\n                <!-- Invoice Customer Details -->\r\n                <div id=\"invoice-customer-details\" class=\"row pt-2\">\r\n                    <div class=\"col-sm-12 text-left\">\r\n                        <p class=\"text-muted\">Bill To</p>\r\n                    </div>\r\n                    <div class=\"col-6 text-left\">\r\n                        <ul class=\"px-0 list-unstyled\">\r\n                            <li class=\"text-bold-800\">Mr. Bret Lezama</li>\r\n                            <li>4879 Westfall Avenue,</li>\r\n                            <li>Albuquerque,</li>\r\n                            <li>New Mexico-87102.</li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"col-6 text-right\">\r\n                        <p><span class=\"text-muted\">Invoice Date :</span> 06/05/2016</p>\r\n                        <p><span class=\"text-muted\">Terms :</span> Due on Receipt</p>\r\n                        <p><span class=\"text-muted\">Due Date :</span> 10/05/2016</p>\r\n                    </div>\r\n                </div>\r\n                <!--/ Invoice Customer Details -->\r\n                <!-- Invoice Items Details -->\r\n                <div id=\"invoice-items-details\" class=\"pt-2\">\r\n                    <div class=\"row\">\r\n                        <div class=\"table-responsive col-sm-12\">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>#</th>\r\n                                        <th>Item &amp; Description</th>\r\n                                        <th class=\"text-right\">Rate</th>\r\n                                        <th class=\"text-right\">Hours</th>\r\n                                        <th class=\"text-right\">Amount</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr>\r\n                                        <th scope=\"row\">1</th>\r\n                                        <td>\r\n                                            <p>Create PSD for mobile APP</p>\r\n                                            <p class=\"text-muted\">Simply dummy text of the printing and typesetting industry.</p>\r\n                                        </td>\r\n                                        <td class=\"text-right\">$ 20.00/hr</td>\r\n                                        <td class=\"text-right\">120</td>\r\n                                        <td class=\"text-right\">$ 2400.00</td>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <th scope=\"row\">2</th>\r\n                                        <td>\r\n                                            <p>iOS Application Development</p>\r\n                                            <p class=\"text-muted\">Pellentesque maximus feugiat lorem at cursus.</p>\r\n                                        </td>\r\n                                        <td class=\"text-right\">$ 25.00/hr</td>\r\n                                        <td class=\"text-right\">260</td>\r\n                                        <td class=\"text-right\">$ 6500.00</td>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <th scope=\"row\">3</th>\r\n                                        <td>\r\n                                            <p>WordPress Template Development</p>\r\n                                            <p class=\"text-muted\">Vestibulum euismod est eu elit convallis.</p>\r\n                                        </td>\r\n                                        <td class=\"text-right\">$ 20.00/hr</td>\r\n                                        <td class=\"text-right\">300</td>\r\n                                        <td class=\"text-right\">$ 6000.00</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6 col-sm-12 text-left\">\r\n                            <p class=\"lead\">Payment Methods:</p>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-12\">\r\n                                    <table class=\"table table-borderless table-sm\">\r\n                                        <tbody>\r\n                                            <tr>\r\n                                                <td>Bank name:</td>\r\n                                                <td class=\"text-right\">ABC Bank, USA</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>Acc name:</td>\r\n                                                <td class=\"text-right\">Amanda Orton</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>IBAN:</td>\r\n                                                <td class=\"text-right\">FGS165461646546AA</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>SWIFT code:</td>\r\n                                                <td class=\"text-right\">BTNPP34</td>\r\n                                            </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6 col-sm-12\">\r\n                            <p class=\"lead\">Total due</p>\r\n                            <div class=\"table-responsive\">\r\n                                <table class=\"table\">\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <td>Sub Total</td>\r\n                                            <td class=\"text-right\">$ 14,900.00</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td>TAX (12%)</td>\r\n                                            <td class=\"text-right\">$ 1,788.00</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td class=\"text-bold-800\">Total</td>\r\n                                            <td class=\"text-bold-800 text-right\"> $ 16,688.00</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td>Payment Made</td>\r\n                                            <td class=\"pink text-right\">(-) $ 4,688.00</td>\r\n                                        </tr>\r\n                                        <tr class=\"bg-grey bg-lighten-4\">\r\n                                            <td class=\"text-bold-800\">Balance Due</td>\r\n                                            <td class=\"text-bold-800 text-right\">$ 12,000.00</td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                            <div class=\"text-center\">\r\n                                <p>Authorized person</p>\r\n                                <img src=\"assets/img/pages/signature-scan.png\" alt=\"signature\" class=\"width-250\">\r\n                                <h6>Amanda Orton</h6>\r\n                                <p class=\"text-muted\">Managing Director</p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <!-- Invoice Footer -->\r\n                <div id=\"invoice-footer\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-9 col-sm-12\">\r\n                            <h6>Terms &amp; Condition</h6>\r\n                            <p>You know, being a test pilot isn't always the healthiest business in the world. We predict too\r\n                                much for the next year and yet far too little for the next 10.</p>\r\n                        </div>\r\n                        <div class=\"col-md-3 col-sm-12 text-center\">\r\n                            <button type=\"button\" class=\"btn btn-primary btn-raised my-1\"><i class=\"fa fa-paper-plane-o\"></i> Send Invoice</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <!--/ Invoice Footer -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--Invoice template ends-->"

/***/ }),

/***/ "./src/app/pages/full-pages/invoice/invoice-page.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/full-pages/invoice/invoice-page.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvaW52b2ljZS9pbnZvaWNlLXBhZ2UuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/full-pages/invoice/invoice-page.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/full-pages/invoice/invoice-page.component.ts ***!
  \********************************************************************/
/*! exports provided: InvoicePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoicePageComponent", function() { return InvoicePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var InvoicePageComponent = /** @class */ (function () {
    function InvoicePageComponent() {
    }
    InvoicePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-invoice-page',
            template: __webpack_require__(/*! ./invoice-page.component.html */ "./src/app/pages/full-pages/invoice/invoice-page.component.html"),
            styles: [__webpack_require__(/*! ./invoice-page.component.scss */ "./src/app/pages/full-pages/invoice/invoice-page.component.scss")]
        })
    ], InvoicePageComponent);
    return InvoicePageComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/full-pages/knowledge-base/knowledge-base.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-sm-12\">\r\n    <div class=\"content-header\">Knowledge Base</div>\r\n    <p class=\"content-sub-header\"></p>\r\n  </div>\r\n</div>\r\n<!-- Apex template Knowledge Base starts -->\r\n<section id=\"kb\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-4 col-lg-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"ft-bell font-large-1 float-left mr-2\"></i>\r\n\t\t\t\t\t<h4 class=\"card-title mb-0\">Getting Started</h4>\r\n          <p class=\"card-text\">Vestibulum consequat odio sit amet eros fermentum.</p>\r\n\t\t\t\t</div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">            \r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Activating an Account and Logging in')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Activating an Account and Logging in\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'User Profile')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> User Profile\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Using the Dashboard')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Using the Dashboard\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Subscribing to Email Alerts')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Subscribing to Email Alerts\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Changing a Password')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Changing a Password\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <a class=\"card-link primary\">See all articles (20)</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-4 col-lg-12\">\r\n      <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <i class=\"ft-book font-large-1 float-left mr-2\"></i>\r\n            <h4 class=\"card-title\">User Guides</h4>\r\n            <p class=\"card-text\">Vestibulum consequat odio sit amet eros fermentum.</p>\r\n          </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Files Overview')\">\r\n                <span class=\"badge bg-warning float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Files Overview\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Search Overview')\">\r\n                <span class=\"badge bg-warning float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Search Overview\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Using Tasks')\">\r\n                <span class=\"badge bg-warning float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Using Tasks\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Events')\">\r\n                <span class=\"badge bg-warning float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Events\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Blogs')\">\r\n                <span class=\"badge bg-warning float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Blogs\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <a class=\"card-link primary\">See all articles (13)</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-4 col-lg-12\">\r\n      <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <i class=\"ft-file-text font-large-1 float-left mr-2\"></i>\r\n            <h4 class=\"card-title\">Files</h4>\r\n            <p class=\"card-text\">Vestibulum consequat odio sit amet eros fermentum.</p>\r\n          </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Basic Files Module Features')\">\r\n                <span class=\"badge bg-info float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Basic Files Module Features\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'How to Add a Single File')\">\r\n                <span class=\"badge bg-info float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> How to Add a Single File\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Drag-and-Drop upload files and folders')\">\r\n                <span class=\"badge bg-info float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Drag-and-Drop upload files and folders\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Searching Files')\">\r\n                <span class=\"badge bg-info float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Searching Files\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Digital Rights Management')\">\r\n                <span class=\"badge bg-info float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Digital Rights Management\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <a class=\"card-link primary\">See all articles (7)</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-4 col-lg-12\">\r\n      <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <i class=\"ft-user font-large-1 float-left mr-2\"></i>\r\n            <h4 class=\"card-title\">Managing Users</h4>\r\n            <p class=\"card-text\">Vestibulum consequat odio sit amet eros fermentum.</p>\r\n          </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Inviting and Managing Users')\">\r\n                <span class=\"badge bg-success float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Inviting and Managing Users\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Creating and Managing Groups')\">\r\n                <span class=\"badge bg-success float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Creating and Managing Groups\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Granting Roles')\">\r\n                <span class=\"badge bg-success float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Granting Roles\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Quick Guide: Organizing Security Groups')\">\r\n                <span class=\"badge bg-success float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Quick Guide: Organizing Security Groups\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'What to Do if a User is Unable to Login')\">\r\n                <span class=\"badge bg-success float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> What to Do if a User is Unable to Login\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <a class=\"card-link primary\">See all articles (11)</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-4 col-lg-12\">\r\n      <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <i class=\"ft-unlock font-large-1 float-left mr-2\"></i>\r\n            <h4 class=\"card-title\">Site Administration</h4>\r\n            <p class=\"card-text\">Vestibulum consequat odio sit amet eros fermentum.</p>\r\n          </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Introduction to the Site Admin Module')\">\r\n                <span class=\"badge bg-danger float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Introduction to the Site Admin Module\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'How to Create a Virtual Deal Room')\">\r\n                <span class=\"badge bg-danger float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> How to Create a Virtual Deal Room\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Best Practices for Setting up a New Site')\">\r\n                <span class=\"badge bg-danger float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Best Practices for Setting up a New Site\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'General Settings')\">\r\n                <span class=\"badge bg-danger float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> General Settings\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Advanced Settings')\">\r\n                <span class=\"badge bg-danger float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Advanced Settings\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <a class=\"card-link primary\">See all articles (21)</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-4 col-lg-12\">\r\n      <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <i class=\"ft-airplay font-large-1 float-left mr-2\"></i>\r\n            <h4 class=\"card-title\">System Administration</h4>\r\n            <p class=\"card-text\">Vestibulum consequat odio sit amet eros fermentum.</p>\r\n          </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <ul class=\"list-group\">\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'System Administration Overview')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> System Administration Overview\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Creating Sites')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Creating Sites\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'User Administration')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> User Administration\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Org Administration')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Org Administration\r\n              </li>\r\n              <li class=\"list-group-item cursor-pointer\" (click)=\"GetDetails(content, 'Site Category System Settings')\">\r\n                <span class=\"badge bg-primary float-left mr-2\">\r\n                  <i class=\"ft-file-text\"></i>\r\n                </span> Site Category System Settings\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <a class=\"card-link primary\">See all articles (17)</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Apex template Knowledge Base Ends -->\r\n\r\n  <ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header bg-info\">\r\n      <h4 class=\"modal-title white\">{{title}}</h4>\r\n      <button type=\"button\" class=\"close white\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\" id=\"kbModal-body\">\r\n      <p class=\"text-bold-500\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n      <p>Curabitur et congue orci. Nullam tempor, lectus vitae facilisis consectetur, enim dolor sodales nunc, ut venenatis\r\n        ipsum massa non eros. Integer tristique consequat sagittis. Sed vitae sapien lobortis, viverra turpis non, hendrerit\r\n        erat. Vivamus luctus, nisl et dignissim pretium, quam risus sollicitudin augue, ut mollis erat neque a lectus. Donec\r\n        et ex vitae orci pretium volutpat eget sed est. Nunc ornare mauris nunc, id ullamcorper libero finibus id. Fusce\r\n        imperdiet laoreet suscipit. Nunc sagittis arcu non sem euismod auctor. Sed tellus odio, posuere id molestie quis,\r\n        egestas sit amet turpis. Duis velit diam, dictum a semper eu, ultricies id neque. Integer nec eros placerat lacus\r\n        bibendum viverra in eu urna.</p>\r\n      <p class=\"text-bold-500\">Suspendisse auctor nisl interdum arcu blandit, sed aliquam leo volutpat.</p>\r\n      <p>Donec laoreet in nibh vel maximus. Donec posuere aliquam lacus a congue. Interdum et malesuada fames ac ante ipsum\r\n        primis in faucibus. Aenean semper fringilla arcu, non auctor ante. Ut efficitur euismod scelerisque. Cras accumsan\r\n        orci rhoncus elementum auctor. Phasellus maximus volutpat nunc ut tincidunt. Lorem ipsum dolor sit amet, consectetur\r\n        adipiscing elit. Pellentesque aliquet tincidunt neque, et volutpat est dictum non. Nulla hendrerit leo sit amet nisl\r\n        blandit, quis pharetra lacus ultrices. Etiam pretium ipsum eu dui consectetur maximus. Vivamus pretium luctus lorem,\r\n        eu viverra velit malesuada at. Nam risus orci, gravida ut convallis et, cursus id velit.</p>\r\n        <p class=\"text-bold-500\"> Phasellus maximus volutpat nunc ut tincidunt.</p>\r\n        <p>Donec laoreet in nibh vel maximus. Donec posuere aliquam lacus a congue. Interdum et malesuada fames ac ante ipsum\r\n          primis in faucibus. Aenean semper fringilla arcu, non auctor ante. Ut efficitur euismod scelerisque. Cras accumsan\r\n          orci rhoncus elementum auctor. Phasellus maximus volutpat nunc ut tincidunt. Lorem ipsum dolor sit amet, consectetur\r\n          adipiscing elit. Pellentesque aliquet tincidunt neque, et volutpat est dictum non. Nulla hendrerit leo sit amet nisl\r\n          blandit, quis pharetra lacus ultrices. Etiam pretium ipsum eu dui consectetur maximus. Vivamus pretium luctus lorem,\r\n          eu viverra velit malesuada at. Nam risus orci, gravida ut convallis et, cursus id velit.</p>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-info btn-raised\" (click)=\"c('Close click')\">Close</button>\r\n    </div>\r\n  </ng-template>\r\n\r\n</section>"

/***/ }),

/***/ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/full-pages/knowledge-base/knowledge-base.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMva25vd2xlZGdlLWJhc2Uva25vd2xlZGdlLWJhc2UuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/full-pages/knowledge-base/knowledge-base.component.ts ***!
  \*****************************************************************************/
/*! exports provided: KnowledgeBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KnowledgeBaseComponent", function() { return KnowledgeBaseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var KnowledgeBaseComponent = /** @class */ (function () {
    function KnowledgeBaseComponent(modalService) {
        this.modalService = modalService;
    }
    KnowledgeBaseComponent.prototype.GetDetails = function (content, titleText) {
        this.title = titleText;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
        }, function (reason) {
        });
    };
    KnowledgeBaseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-knowledge-base',
            template: __webpack_require__(/*! ./knowledge-base.component.html */ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.html"),
            styles: [__webpack_require__(/*! ./knowledge-base.component.scss */ "./src/app/pages/full-pages/knowledge-base/knowledge-base.component.scss")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], KnowledgeBaseComponent);
    return KnowledgeBaseComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/search/search.component.html":
/*!***************************************************************!*\
  !*** ./src/app/pages/full-pages/search/search.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Search form-->\r\n<section id=\"search-website\" class=\"card overflow-hidden\">\r\n  <div class=\"card-header\">\r\n      <h4 class=\"card-title\">Website search results</h4>\r\n\r\n  </div>\r\n  <div class=\"card-body\">\r\n      <div class=\"card-block pb-0\">\r\n        <form action=\"#\">\r\n          <fieldset class=\"form-group position-relative has-icon-right mb-0\">\r\n              <input type=\"text\" class=\"form-control form-control-lg input-lg\" id=\"iconLeft\" placeholder=\"Apex Admin Template\">\r\n              <div class=\"form-control-position\">\r\n                  <i class=\"ft-mic font-medium-4\"></i>\r\n              </div>\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n      <!--Search Navbar-->\r\n      <div id=\"search-nav\" class=\"card-block\">\r\n          <ul class=\"nav nav-inline\">\r\n              <li class=\"nav-item\">\r\n                  <a class=\"nav-link active\"><i class=\"fa fa-link\"></i> Website</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                  <a class=\"nav-link\"><i class=\"fa fa-file-image-o\"></i> Images</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                  <a class=\"nav-link\"><i class=\"fa fa-file-video-o\"></i> Videos</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                  <a class=\"nav-link\"><i class=\"fa fa-map-o\"></i> Maps</a>\r\n              </li>\r\n              <li class=\"dropdown nav-item float-right mt-1\">\r\n                  <a  class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\r\n                      <i class=\"fa fa-cog\"></i> <span class=\"caret\"></span>\r\n                  </a>\r\n                  <ul class=\"dropdown-menu dropdown-menu-right\">\r\n                      <li class=\"dropdown-item\"><a  class=\"dropdown-link\">Languages</a></li>\r\n                      <li class=\"dropdown-item\"><a  class=\"dropdown-link\">Search Settings</a></li>\r\n                      <li class=\"dropdown-item\"><a  class=\"dropdown-link\">History</a></li>\r\n                      <li class=\"dropdown-item\"><a  class=\"dropdown-link\">Search Help</a></li>\r\n                  </ul>\r\n              </li>\r\n          </ul>\r\n      </div>\r\n      <!--/ Search Navbar-->\r\n      <!--Search Result-->\r\n      <div id=\"search-results\" class=\"card-block\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-8\">\r\n              <p class=\"text-muted font-small-3\">About 68,00,000 results (0.58 seconds) </p>\r\n              <ul class=\"media-list row\">\r\n                  <!--search with list-->\r\n                  <li class=\"media\">\r\n                      <div class=\"media-body\">\r\n                          <p class=\"lead mb-0\"><a ><span class=\"text-bold-600\">Apex</span> - Responsive Angular 5 Admin Template</a></p>\r\n                          <p class=\"mb-0\"><a  class=\"teal darken-1\">https://pixinvent.com/<span class=\"text-bold-600\">Apex</span>/ <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                          <ul class=\"list-inline list-inline-pipe text-muted\">\r\n                              <li>\r\n                                  <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                  <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                  <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                  <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                  <i class=\"fa fa-star yellow darken-2\"></i> &nbsp;5 stars\r\n                              </li>\r\n                              <li>590 votes</li>\r\n                              <li>US$ 28.00</li>\r\n                              <li>In stock</li>\r\n                          </ul>\r\n                          <p><span class=\"text-muted\">Oct 24, 2017 - </span><span class=\"text-bold-600\">Apex</span> nec nisl lobortis erat rutrum dignissim. Colonel <span class=\"text-bold-600\">Responsive Angular 5 Admin Template</span> Ut tellus dui, rhoncus quis vulputate non, sodales ac ex. Fusce interdum efficitur purus quis viverra...</p>\r\n                          <div class=\"website-detailed-list mx-1 my-1\">\r\n                              <div class=\"row\">\r\n                                  <div class=\"col-md-6\">\r\n                                      <div class=\"content-group\">\r\n                                          <div class=\"media-body\">\r\n                                              <p class=\"mb-0\"><a class=\"teal darken-1\">Dashboard</a></p>\r\n                                              <p>Donec vitae ante ipsum. In aliquet, urna id varius mattis...</p>\r\n                                          </div>\r\n                                      </div>\r\n                                      <div class=\"content-group\">\r\n                                          <div class=\"media-body\">\r\n                                              <p class=\"mb-0\"><a class=\"teal darken-1\">Form Components</a></p>\r\n                                              <p>Velit mi sodales turpis, nec consectetur leo elit.</p>\r\n                                          </div>\r\n                                      </div>\r\n                                      <div class=\"content-group\">\r\n                                          <div class=\"media-body\">\r\n                                              <p class=\"mb-0\"><a class=\"teal darken-1\">Charts</a></p>\r\n                                              <p>Vestibulum nec orci placerat, euismod turpis egestas...</p>\r\n                                          </div>\r\n                                      </div>\r\n                                  </div>\r\n                                  <div class=\"col-md-6\">\r\n                                      <div class=\"content-group\">\r\n                                          <div class=\"media-body\">\r\n                                              <p class=\"mb-0\"><a class=\"teal darken-1\">UI Components</a></p>\r\n                                              <p>Nam in velit iaculis, vestibulum ex a, porta sapien...</p>\r\n                                          </div>\r\n                                      </div>\r\n                                      <div class=\"content-group\">\r\n                                          <div class=\"media-body\">\r\n                                              <p class=\"mb-0\"><a class=\"teal darken-1\">Support</a></p>\r\n                                              <p>Donec ullamcorper est vel dui commodo dictum.</p>\r\n                                          </div>\r\n                                      </div>\r\n                                      <div class=\"content-group\">\r\n                                          <div class=\"media-body\">\r\n                                              <p class=\"mb-0\"><a class=\"teal darken-1\">Documentation</a></p>\r\n                                              <p>Ut rhoncus massa diam, in commodo enim posuere quis mosito...</p>\r\n                                          </div>\r\n                                      </div>\r\n                                  </div>\r\n                              </div>\r\n                          </div>\r\n                      </div>\r\n                  </li>\r\n                  <!--search with image-->\r\n                  <li class=\"media\">\r\n                      <div class=\"media-left\">\r\n                          <a >\r\n                              <img class=\"media-object width-150\" src=\"assets/img/width-600/portfolio-14.jpg\" alt=\"Generic placeholder image\">\r\n                          </a>\r\n                      </div>\r\n                      <div class=\"media-body media-search\">\r\n                        <p class=\"lead mb-0\"><a class=\"teal darken-1\"><span class=\"text-bold-600\">Attire bench</span> -  Quick win shoot me an email</a></p>\r\n                        <p class=\"mb-0\"><a class=\"teal darken-1\">https://pixinvent.com/<span class=\"text-bold-600\">Apex</span>/ <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                        <ul class=\"list-inline list-inline-pipe text-muted\">\r\n                            <li>\r\n                                <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                <i class=\"fa fa-star yellow darken-2\"></i>\r\n                                <i class=\"fa fa-star-half yellow darken-2\"></i> &nbsp;4.5 stars\r\n                            </li>\r\n                            <li>50 votes</li>\r\n                            <li>US$ 40.00</li>\r\n                            <li>In stock</li>\r\n                        </ul>\r\n                        <p><span class=\"text-muted\">Oct 24, 2017 - </span> We need to dialog around <span class=\"text-bold-600\">Apex Admin</span> your choice of work attire bench mark, or win-win-win. Quick win shoot me an email. Proceduralize i don't want to drain the whole swamp, i just want to shoot some alligators yet old boys club.</p>\r\n                      </div>\r\n                  </li>\r\n                  <!--search with video-->\r\n                  <li class=\"media\">\r\n                    <div class=\"media-left media-search\">\r\n                        <iframe width=\"150\" height=\"110\" src=\"https://www.youtube.com/embed/SsE5U7ta9Lw?rel=0&amp;controls=0&amp;showinfo=0\"></iframe>\r\n                    </div>\r\n                    <div class=\"media-body\">\r\n                      <p class=\"lead mb-0\"><a class=\"teal darken-1\"><span class=\"text-bold-600\">The Table</span> - for what do you feel you would bring to</a></p>\r\n                      <p class=\"mb-0\"><a  class=\"teal darken-1\">http://youtube.com/<span class=\"text-bold-600\">Apex</span>/ <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                      <ul class=\"list-inline list-inline-pipe text-muted\">\r\n                          <li>Oct 24, 2017</li>\r\n                          <li>1M Views</li>\r\n                          <li>Uploaded by PlayStation</li>\r\n                      </ul>\r\n                      <p><span class=\"text-bold-600\">Proceduralize</span> Not the long pole in my tent. Get buy-in pixel pushing, and quick win . What's the status on the deliverables for eow? goalposts golden goose, and take five.</p>\r\n                    </div>\r\n                  </li>\r\n                  <li class=\"media\">\r\n                    <div class=\"media-body\">\r\n                      <p class=\"lead mb-0\"><a class=\"teal darken-1\"><span class=\"text-bold-600\">Microdosing</span> - deep v actually schlitz chia</a></p>\r\n                      <p class=\"mb-0\"><a  class=\"teal darken-1\">http://themeforest.net/<span class=\"text-bold-600\">Apex</span>/microdosing <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                      <p>Lobortis erat rutrum dignissim. Colonel <span class=\"text-bold-600\">Responsive Angular 5 Admin Template</span> Ut tellus dui, rhoncus quis vulputate non, sodales ac ex. Fusce interdum efficitur purus quis viverra. Vivamus eros urna, scelerisque ac enim...</p>\r\n                    </div>\r\n                  </li>\r\n                  <li class=\"media\">\r\n                    <div class=\"media-body\">\r\n                      <p class=\"lead mb-0\"><a class=\"teal darken-1\">Aesthetic neutra <span class=\"text-bold-600\">freegan</span>, mlkshk literally</a></p>\r\n                      <p class=\"mb-0\"><a  class=\"teal darken-1\">http://envato.com/literally/<span class=\"text-bold-600\">Apex</span>/ <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                      <p><span class=\"text-muted\">June 30, 2016 - </span><span class=\"text-bold-600\">Humblebrag</span> mixtape tumblr small batch, marfa blog mumblecore retro sustainable bitters normcore brunch whatever helvetica. <span class=\"text-bold-600\">Humblebrag mumblecore </span>beard irony, XOXO craft beer kogi letterpress freegan vegan disrupt...</p>\r\n                    </div>\r\n                  </li>\r\n                  <li class=\"media\">\r\n                    <div class=\"media-body\">\r\n                      <p class=\"lead mb-0\"><a class=\"teal darken-1\"><span class=\"text-bold-600\">iCell</span> -  disrupt butcher pitchfork.</a></p>\r\n                      <p class=\"mb-0\"><a  class=\"teal darken-1\">http://google.com/<span class=\"text-bold-600\">icell</span>/ <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                      <ul class=\"list-inline list-inline-pipe text-muted\">\r\n                          <li>\r\n                              <i class=\"fa fa-star yellow darken-2\"></i>\r\n                              <i class=\"fa fa-star yellow darken-2\"></i>\r\n                              <i class=\"fa fa-star-half yellow darken-2\"></i>\r\n                              <i class=\"fa fa-star-outline yellow darken-2\"></i>\r\n                              <i class=\"fa fa-star-outline yellow darken-2\"></i> &nbsp;2.5 stars\r\n                          </li>\r\n                          <li>590 votes</li>\r\n                          <li>US$ 399.00</li>\r\n                          <li>In stock</li>\r\n                      </ul>\r\n                      <p><span class=\"text-muted\">March 23, 2016 - </span>Church-key selfies bitters man bun post-ironic. <span class=\"text-bold-600\">8-bit 3 wolf moon</span> drinking vinegar, direct trade plaid cred hashtag offal. Fap XOXO chambray, intelligentsia kogi keytar flexitarian cardigan kale chips food truck.</p>\r\n                    </div>\r\n                  </li>\r\n                  <li class=\"media\">\r\n                      <div class=\"media-body\">\r\n                          <p class=\"lead mb-0\"><a class=\"teal darken-1\"><span class=\"text-bold-600\">Run it</span> - up the flagpole, ping the boss</a></p>\r\n                          <p class=\"mb-0\"><a  class=\"teal darken-1\">http://mail.example.com/<span class=\"text-bold-600\">run</span>/ <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a></p>\r\n                          <p>Pixel pushing horsehead offer that jerk from finance really threw me under the bus, but best practices new economy and take five, punch the tree, and come back in here with a clear head...</p>\r\n                      </div>\r\n                  </li>\r\n              </ul>\r\n              <div class=\"text-center\">\r\n                  <nav aria-label=\"Page navigation\">\r\n                      <ul class=\"pagination pagination-separate pagination-round pagination-flat\">\r\n                          <li class=\"page-item\">\r\n                              <a class=\"page-link\"  aria-label=\"Previous\">\r\n                                  <span aria-hidden=\"true\">« Prev</span>\r\n                                  <span class=\"sr-only\">Previous</span>\r\n                              </a>\r\n                          </li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" >1</a></li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" >2</a></li>\r\n                          <li class=\"page-item active\"><a class=\"page-link\" >3</a></li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" >4</a></li>\r\n                          <li class=\"page-item\"><a class=\"page-link\" >5</a></li>\r\n                          <li class=\"page-item\">\r\n                              <a class=\"page-link\"  aria-label=\"Next\">\r\n                                  <span aria-hidden=\"true\">Next »</span>\r\n                                  <span class=\"sr-only\">Next</span>\r\n                              </a>\r\n                          </li>\r\n                      </ul>\r\n                  </nav>\r\n              </div>\r\n          </div>\r\n          <div class=\"col-lg-4\">\r\n              <div class=\"card\">\r\n                  <div class=\"card-block px-0\">\r\n                      <h4 class=\"card-title\">Apex</h4>\r\n                      <h6 class=\"card-subtitle text-muted\">Responsive Angular 5 Admin Template</h6>\r\n                  </div>\r\n                  <img class=\"img-fluid\" src=\"assets/img/width-600/portfolio-3.jpg\" alt=\"logo\">\r\n                  <div class=\"card-block px-0\">\r\n                      <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.<a >Wikipedia</a></p>\r\n                      <ul class=\"list-group mb-2\">\r\n                          <li class=\"list-group-item\"><strong>Website :</strong> <a  class=\"card-link\">https://pixinvent.com/</a></li>\r\n                          <li class=\"list-group-item\"><strong>Customer service :</strong> 022 8888 9999</li>\r\n                          <li class=\"list-group-item\"><strong>Founder :</strong> PIXINVENT</li>\r\n                          <li class=\"list-group-item\"><strong>Founded :</strong> 2017</li>\r\n                          <li class=\"list-group-item\"><strong>Support:</strong> <a >support@pixinvent.com</a></li>\r\n                      </ul>\r\n                      <div class=\"py-1 text-center\">\r\n                          <a  class=\"btn btn-social-icon mr-1 mb-1 btn-outline-facebook\"><span class=\"fa fa-facebook\"></span></a>\r\n                          <a  class=\"btn btn-social-icon mr-1 mb-1 btn-outline-twitter\"><span class=\"fa fa-twitter\"></span></a>\r\n                          <a  class=\"btn btn-social-icon mr-1 mb-1 btn-outline-linkedin\"><span class=\"fa fa-linkedin font-medium-4\"></span></a>\r\n                          <a  class=\"btn btn-social-icon mr-1 mb-1 btn-outline-github\"><span class=\"fa fa-github font-medium-4\"></span></a>\r\n                      </div>\r\n                  </div>\r\n                  <div class=\"card-block px-0\">\r\n                      <p class=\"text-bold-600\">People also search for</p>\r\n                      <div class=\"row\">\r\n                          <div class=\"col-md-4\">\r\n                              <img class=\"img-fluid rounded\" src=\"assets/img/gallery/11.jpg\" alt=\"Image description\">\r\n                              <a  class=\"font-small-2\">Ashoka</a>\r\n                          </div>\r\n                          <div class=\"col-md-4\">\r\n                              <img class=\"img-fluid rounded\" src=\"assets/img/gallery/12.jpg\" alt=\"Image description\">\r\n                              <a  class=\"font-small-2\">Materialize</a>\r\n                          </div>\r\n                          <div class=\"col-md-4\">\r\n                              <img class=\"img-fluid rounded\" src=\"assets/img/gallery/13.jpg\" alt=\"Image description\">\r\n                              <a  class=\"font-small-2\">HTML </a>\r\n                          </div>\r\n                          <div class=\"col-md-4\">\r\n                              <img class=\"img-fluid rounded\" src=\"assets/img/gallery/14.jpg\" alt=\"Image description\">\r\n                              <a  class=\"font-small-2\">Ashoka</a>\r\n                          </div>\r\n                          <div class=\"col-md-4\">\r\n                              <img class=\"img-fluid rounded\" src=\"assets/img/gallery/25.jpg\" alt=\"Image description\">\r\n                              <a  class=\"font-small-2\">Materialize</a>\r\n                          </div>\r\n                          <div class=\"col-md-4\">\r\n                              <img class=\"img-fluid rounded\" src=\"assets/img/gallery/23.jpg\" alt=\"Image description\">\r\n                              <a  class=\"font-small-2\">HTML </a>\r\n                          </div>\r\n                      </div>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </div>\r\n</section>\r\n<!--/ Search form -->\r\n"

/***/ }),

/***/ "./src/app/pages/full-pages/search/search.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/full-pages/search/search.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/full-pages/search/search.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/full-pages/search/search.component.ts ***!
  \*************************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchComponent = /** @class */ (function () {
    function SearchComponent() {
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-search',
            template: __webpack_require__(/*! ./search.component.html */ "./src/app/pages/full-pages/search/search.component.html"),
            styles: [__webpack_require__(/*! ./search.component.scss */ "./src/app/pages/full-pages/search/search.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"cd-horizontal-timeline\" [ngClass]=\"{'loaded': loaded}\">\r\n  <div class=\"timeline\">\r\n    <div class=\"events-wrapper\">\r\n      <div class=\"events\" #eventsWrapper [style.width.px]=\"eventsWrapperWidth\">\r\n        <ol>\r\n          <li *ngFor=\"let item of timelineElements; let index = index\">\r\n            <a #timelineEvents href=\"#\" [ngClass]=\"{'selected': item.selected, 'older-event': index < selectedIndex}\"\r\n               (click)=\"onEventClick($event, item)\">{{item.date | date:dateFormatTop}}</a>\r\n            <span></span>\r\n          </li>\r\n        </ol>\r\n        <span class=\"filling-line\" aria-hidden=\"true\" #fillingLine></span>\r\n      </div>\r\n    </div>\r\n\r\n    <ul class=\"cd-timeline-navigation\">\r\n      <li>\r\n        <a href=\"#\" (click)=\"onScrollClick($event, false)\" class=\"prev\" [ngClass]=\"{'inactive':prevLinkInactive}\">Prev</a>\r\n      </li>\r\n      <li>\r\n        <a href=\"#\" (click)=\"onScrollClick($event, true)\" class=\"next\" [ngClass]=\"{'inactive':nextLinkInactive}\">Next</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n  <div class=\"events-content\" *ngIf=\"showContent\">\r\n    <ol>\r\n      <li *ngFor=\"let item of timelineElements; let index = index\"\r\n          [@contentState]=\"item.selected ? 'active' : (index < selectedIndex ? 'left' : 'right')\">\r\n        <h2 class=\"text-bold-500\">{{item.title}}</h2>\r\n        <em>{{item.date | date:dateFormat}}</em>\r\n        <p>{{item.content}}</p>\r\n      </li>\r\n    </ol>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvdGltZWxpbmUvaG9yaXpvbnRhbC9jb21wb25lbnQvaG9yaXpvbnRhbC10aW1lbGluZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: HorizontalTimelineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalTimelineComponent", function() { return HorizontalTimelineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HorizontalTimelineComponent = /** @class */ (function () {
    function HorizontalTimelineComponent(_cdr) {
        this._cdr = _cdr;
        this.prevLinkInactive = true;
        this.nextLinkInactive = false;
        this.loaded = false;
        this.selectedIndex = 0;
        this.eventsWrapperWidth = 0;
        this._viewInitialized = false;
        this._timelineWrapperWidth = 720;
        this._eventsMinDistance = 80;
        this._dateFormat = 'dd.MM.yyyy';
        this._dateFormatTop = 'dd MMM';
        this._disabled = false;
        this._showContent = false;
    }
    HorizontalTimelineComponent_1 = HorizontalTimelineComponent;
    Object.defineProperty(HorizontalTimelineComponent.prototype, "timelineWrapperWidth", {
        set: function (value) {
            this._timelineWrapperWidth = value;
            this._cdr.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "eventsMinDistance", {
        set: function (value) {
            this._eventsMinDistance = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "timelineElements", {
        get: function () {
            return this._timelineElements;
        },
        set: function (value) {
            this._timelineElements = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "dateFormat", {
        get: function () {
            return this._dateFormat;
        },
        set: function (value) {
            this._dateFormat = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "dateFormatTop", {
        get: function () {
            return this._dateFormatTop;
        },
        set: function (value) {
            this._dateFormatTop = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "disabled", {
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "showContent", {
        get: function () {
            return this._showContent;
        },
        set: function (value) {
            this._showContent = value;
            this._cdr.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    HorizontalTimelineComponent.pxToNumber = function (val) {
        return Number(val.replace('px', ''));
    };
    HorizontalTimelineComponent.getElementWidth = function (element) {
        var computedStyle = window.getComputedStyle(element);
        if (!computedStyle.width) {
            return 0;
        }
        return HorizontalTimelineComponent_1.pxToNumber(computedStyle.width);
    };
    HorizontalTimelineComponent.parentElement = function (element, tagName) {
        if (!element || !element.parentNode) {
            return null;
        }
        var parent = element.parentNode;
        while (true) {
            if (parent.tagName.toLowerCase() == tagName) {
                return parent;
            }
            parent = parent.parentNode;
            if (!parent) {
                return null;
            }
        }
    };
    HorizontalTimelineComponent.getTranslateValue = function (timeline) {
        var timelineStyle = window.getComputedStyle(timeline);
        var timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
            timelineStyle.getPropertyValue('-moz-transform') ||
            timelineStyle.getPropertyValue('-ms-transform') ||
            timelineStyle.getPropertyValue('-o-transform') ||
            timelineStyle.getPropertyValue('transform');
        var translateValue = 0;
        if (timelineTranslate.indexOf('(') >= 0) {
            var timelineTranslateStr = timelineTranslate
                .split('(')[1]
                .split(')')[0]
                .split(',')[4];
            translateValue = Number(timelineTranslateStr);
        }
        return translateValue;
    };
    HorizontalTimelineComponent.setTransformValue = function (element, property, value) {
        element.style['-webkit-transform'] = property + '(' + value + ')';
        element.style['-moz-transform'] = property + '(' + value + ')';
        element.style['-ms-transform'] = property + '(' + value + ')';
        element.style['-o-transform'] = property + '(' + value + ')';
        element.style['transform'] = property + '(' + value + ')';
    };
    HorizontalTimelineComponent.dayDiff = function (first, second) {
        return Math.round(second.getTime() - first.getTime());
    };
    HorizontalTimelineComponent.minLapse = function (elements) {
        if (elements && elements.length && elements.length === 1) {
            return 0;
        }
        var result = 0;
        for (var i = 1; i < elements.length; i++) {
            var distance = HorizontalTimelineComponent_1.dayDiff(elements[i - 1].date, elements[i].date);
            result = result ? Math.min(result, distance) : distance;
        }
        return result;
    };
    HorizontalTimelineComponent.prototype.ngAfterViewInit = function () {
        this._cdr.detach();
        this._viewInitialized = true;
        this.initView();
    };
    HorizontalTimelineComponent.prototype.onScrollClick = function (event, forward) {
        event.preventDefault();
        this.updateSlide(this.eventsWrapperWidth, forward);
        this._cdr.detectChanges();
    };
    HorizontalTimelineComponent.prototype.onEventClick = function (event, selectedItem) {
        event.preventDefault();
        if (this._disabled) {
            return;
        }
        var element = event.target;
        // detect click on the a single event - show new event content
        var visibleItem = this._timelineElements[0];
        this._timelineElements.forEach(function (item) {
            if (item.selected && item != selectedItem) {
                visibleItem = item;
                item.selected = false;
            }
        });
        this.selectedIndex = this._timelineElements.indexOf(selectedItem);
        selectedItem.selected = true;
        this.updateFilling(element);
        this._cdr.detectChanges();
    };
    HorizontalTimelineComponent.prototype.initTimeline = function (timeLines) {
        var eventsMinLapse = HorizontalTimelineComponent_1.minLapse(timeLines);
        // assign a left position to the single events along the timeline
        this.setDatePosition(timeLines, this._eventsMinDistance, eventsMinLapse);
        // assign a width to the timeline
        this.setTimelineWidth(timeLines, this._eventsMinDistance, eventsMinLapse);
        // the timeline has been initialize - show it
        this.loaded = true;
    };
    HorizontalTimelineComponent.prototype.updateSlide = function (timelineTotWidth, forward) {
        var translateValue = HorizontalTimelineComponent_1.getTranslateValue(this.eventsWrapper.nativeElement);
        if (forward) {
            this.translateTimeline(translateValue - this._timelineWrapperWidth + this._eventsMinDistance, this._timelineWrapperWidth - timelineTotWidth);
        }
        else {
            this.translateTimeline(translateValue + this._timelineWrapperWidth - this._eventsMinDistance, null);
        }
    };
    HorizontalTimelineComponent.prototype.updateTimelinePosition = function (element) {
        var eventStyle = window.getComputedStyle(element);
        var eventLeft = HorizontalTimelineComponent_1.pxToNumber(eventStyle.getPropertyValue('left'));
        var translateValue = HorizontalTimelineComponent_1.getTranslateValue(this.eventsWrapper.nativeElement);
        if (eventLeft > this._timelineWrapperWidth - translateValue) {
            this.translateTimeline(-eventLeft + this._timelineWrapperWidth / 2, this._timelineWrapperWidth - this.eventsWrapperWidth);
        }
    };
    HorizontalTimelineComponent.prototype.translateTimeline = function (value, totWidth) {
        // only negative translate value
        value = (value > 0) ? 0 : value;
        // do not translate more than timeline width
        value = (!(totWidth === null) && value < totWidth) ? totWidth : value;
        HorizontalTimelineComponent_1.setTransformValue(this.eventsWrapper.nativeElement, 'translateX', value + 'px');
        // update navigation arrows visibility
        this.prevLinkInactive = value === 0;
        this.nextLinkInactive = value === totWidth;
    };
    HorizontalTimelineComponent.prototype.setTimelineWidth = function (elements, width, eventsMinLapse) {
        var timeSpan = 100;
        if (elements.length > 1) {
            timeSpan = HorizontalTimelineComponent_1.dayDiff(elements[0].date, elements[elements.length - 1].date);
        }
        var timeSpanNorm = timeSpan / eventsMinLapse;
        timeSpanNorm = Math.round(timeSpanNorm) + 4;
        this.eventsWrapperWidth = timeSpanNorm * width;
        var aHref = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];
        this.updateFilling(aHref);
        this.updateTimelinePosition(aHref);
        return this.eventsWrapperWidth;
    };
    HorizontalTimelineComponent.prototype.updateFilling = function (element) {
        // change .filling-line length according to the selected event
        var eventStyle = window.getComputedStyle(element);
        var eventLeft = eventStyle.getPropertyValue('left');
        var eventWidth = eventStyle.getPropertyValue('width');
        var eventLeftNum = HorizontalTimelineComponent_1.pxToNumber(eventLeft) + HorizontalTimelineComponent_1.pxToNumber(eventWidth) / 2;
        var scaleValue = eventLeftNum / this.eventsWrapperWidth;
        HorizontalTimelineComponent_1.setTransformValue(this.fillingLine.nativeElement, 'scaleX', scaleValue);
    };
    HorizontalTimelineComponent.prototype.initView = function () {
        if (!this._viewInitialized) {
            return;
        }
        if (this._timelineElements && this._timelineElements.length) {
            for (var i = 0; i < this._timelineElements.length; i++) {
                if (this._timelineElements[i].selected) {
                    this.selectedIndex = i;
                    break;
                }
            }
            this.initTimeline(this._timelineElements);
        }
        this._cdr.detectChanges();
    };
    HorizontalTimelineComponent.prototype.setDatePosition = function (elements, min, eventsMinLapse) {
        var timelineEventsArray = this.timelineEvents.toArray();
        var i = 0;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var component = elements_1[_i];
            var distance = HorizontalTimelineComponent_1.dayDiff(elements[0].date, component.date);
            var distanceNorm = Math.round(distance / eventsMinLapse);
            timelineEventsArray[i].nativeElement.style.left = distanceNorm * min + 'px';
            // span
            var span = timelineEventsArray[i].nativeElement.parentElement.children[1];
            var spanWidth = HorizontalTimelineComponent_1.getElementWidth(span);
            span.style.left = distanceNorm * min + spanWidth / 2 + 'px';
            i++;
        }
    };
    var HorizontalTimelineComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('eventsWrapper'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], HorizontalTimelineComponent.prototype, "eventsWrapper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fillingLine'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], HorizontalTimelineComponent.prototype, "fillingLine", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('timelineEvents'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], HorizontalTimelineComponent.prototype, "timelineEvents", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], HorizontalTimelineComponent.prototype, "timelineWrapperWidth", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], HorizontalTimelineComponent.prototype, "eventsMinDistance", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], HorizontalTimelineComponent.prototype, "timelineElements", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], HorizontalTimelineComponent.prototype, "dateFormat", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], HorizontalTimelineComponent.prototype, "dateFormatTop", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], HorizontalTimelineComponent.prototype, "disabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], HorizontalTimelineComponent.prototype, "showContent", null);
    HorizontalTimelineComponent = HorizontalTimelineComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'horizontal-timeline',
            template: __webpack_require__(/*! ./horizontal-timeline.component.html */ "./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('contentState', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('active', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        position: 'relative', 'z-index': 2, opacity: 1,
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('right => active', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(100%)'
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('400ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
                        ]))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('active => right', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(-100%)'
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('400ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                        ]))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('active => left', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(-100%)'
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('400ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
                        ]))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('left => active', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(100%)'
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('400ms ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
                        ]))
                    ]),
                ])
            ],
            styles: [__webpack_require__(/*! ./horizontal-timeline.component.scss */ "./src/app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], HorizontalTimelineComponent);
    return HorizontalTimelineComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Horizontal Timeline Starts-->\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"content-header\">Horizontal Timeline</div>\r\n        <p class=\"content-sub-header\">This horizontal timeline contain date based post timeline.</p>\r\n    </div>\r\n</div>\r\n<div class=\"card\">\r\n\t<div class=\"card-body\">\r\n\t\t<div class=\"card-block\">\r\n\t\t\t<horizontal-timeline [timelineElements]=\"timeline\" [showContent]=\"true\"></horizontal-timeline>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<!--Horizontal Timeline Starts-->"

/***/ }),

/***/ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvdGltZWxpbmUvaG9yaXpvbnRhbC9ob3Jpem9udGFsLXRpbWVsaW5lLXBhZ2UuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.ts ***!
  \********************************************************************************************/
/*! exports provided: HorizontalTimelinePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalTimelinePageComponent", function() { return HorizontalTimelinePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HorizontalTimelinePageComponent = /** @class */ (function () {
    function HorizontalTimelinePageComponent() {
        this.content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae \n    ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, \n    ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam \n    quisquam, quae, temporibus dolores porro doloribus.";
        this.timeline = [
            { date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
            { date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
            { date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
            { date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
            { date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
            { date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
            { date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
            { date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
            { date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
            { date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
            { date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
        ];
    }
    HorizontalTimelinePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-horizontal-timeline-page',
            template: __webpack_require__(/*! ./horizontal-timeline-page.component.html */ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.html"),
            styles: [__webpack_require__(/*! ./horizontal-timeline-page.component.scss */ "./src/app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component.scss")]
        })
    ], HorizontalTimelinePageComponent);
    return HorizontalTimelinePageComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Vertical Timeline Starts-->\r\n<section id=\"timeline\" class=\"timeline-center timeline-wrapper\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n      <div class=\"content-header\">Vertical Timeline</div>\r\n      <p class=\"content-sub-header\">This vertical timeline contain post with photos, videos, charts and map to make timeline more effective.</p>\r\n    </div>\r\n  </div>\r\n  <h3 class=\"page-title text-center\">Timeline</h3>\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <li class=\"timeline-group\">\r\n      <a class=\"btn btn-raised btn-primary\"><i class=\"fa fa-calendar-o\"></i> Today</a>\r\n    </li>\r\n  </ul>\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <li class=\"timeline-item\">\r\n      <div class=\"timeline-badge\">\r\n        <span class=\"bg-red bg-lighten-1\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Portfolio project work\"><i class=\"fa fa-plane\"></i></span>\r\n      </div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <h4 class=\"card-title mb-0\"><a>Portfolio project work</a></h4>\r\n          <div class=\"card-subtitle text-muted mt-0\">\r\n            <span class=\"font-small-3\">5 hours ago</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <img class=\"img-fluid\" src=\"assets/img/photos/01.jpg\" alt=\"Timeline Image 1\">\r\n          <div class=\"card-body\">\r\n            <div class=\"card-block\">\r\n              <p class=\"card-text\">Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a ligula.\r\n                Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.</p>\r\n              <div class=\"list-inline mb-1\">\r\n                <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-thumbs-o-up\"></span> Like</a>\r\n                </span>\r\n                <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-commenting-o\"></span> Comment</a>\r\n                </span>\r\n                <span><a class=\"primary\"><span class=\"fa fa-share-alt\"></span> Share</a>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"card-footer px-0 py-0\">\r\n            <div class=\"card-block \">\r\n              <div class=\"media\">\r\n                <div class=\"media-left\">\r\n                  <a>\r\n                      <span class=\"avatar avatar-online\"><img src=\"assets/img/portrait/small/avatar-s-1.png\" alt=\"avatar\" width=\"50\"></span>\r\n                    </a>\r\n                </div>\r\n                <div class=\"media-body\">\r\n                  <p class=\"text-bold-600 mb-0\"><a>Jason Ansley</a></p>\r\n                  <p class=\"m-0\">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.</p>\r\n                  <div class=\"list-inline mb-1\">\r\n                    <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-thumbs-o-up\"></span> Like</a>\r\n                    </span>\r\n                    <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-commenting-o\"></span> Replay</a>\r\n                    </span>\r\n                  </div>\r\n                  <div class=\"media\">\r\n                    <div class=\"media-left\">\r\n                      <a>\r\n                          <span class=\"avatar avatar-online\"><img src=\"assets/img/portrait/small/avatar-s-18.png\" alt=\"avatar\" width=\"50\"></span>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"media-body\">\r\n                      <p class=\"text-bold-600 mb-0\"><a>Janice Johnston</a></p>\r\n                      <p>Gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</p>\r\n                      <div class=\"list-inline mb-1\">\r\n                        <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-thumbs-o-up\"></span> Like</a>\r\n                        </span>\r\n                        <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-commenting-o\"></span> Replay</a>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"card-block\">\r\n              <form>\r\n                <fieldset class=\"form-group position-relative has-icon-left mb-0\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Write comments...\">\r\n                  <div class=\"form-control-position\">\r\n                    <i class=\"fa fa-dashcube\"></i>\r\n                  </div>\r\n                </fieldset>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class=\"timeline-item mt-5\">\r\n      <div class=\"timeline-badge\">\r\n        <span class=\"avatar avatar-online\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Eu pid nunc urna integer\"><img src=\"assets/img/portrait/small/avatar-s-14.png\" alt=\"avatar\" width=\"40\"></span>\r\n      </div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <h4 class=\"card-title mb-0\"><a>Sofia Orav</a></h4>\r\n          <div class=\"card-subtitle text-muted mt-0\">\r\n            <span class=\"font-small-3\">8 hours ago</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"embed-responsive embed-responsive-4by3\">\r\n            <iframe src=\"https://player.vimeo.com/video/118589137?title=0&byline=0\"></iframe>\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div class=\"card-block\">\r\n              <p class=\"card-text\">Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a ligula.\r\n                Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.</p>\r\n              <p class=\"card-text\">Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus sagittis ut\r\n                nunc elit! Sociis in et? Rhoncus, vel dignissim in scelerisque. Dolor lacus pulvinar adipiscing adipiscing\r\n                montes! Elementum risus adipiscing non, cras scelerisque risus penatibus? Massa vut, habitasse, tincidunt!</p>\r\n              <div class=\"list-inline mb-1\">\r\n                <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-thumbs-o-up\"></span> Like</a>\r\n                </span>\r\n                <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-commenting-o\"></span> Comment</a>\r\n                </span>\r\n                <span><a class=\"primary\"><span class=\"fa fa-share-alt\"></span> Share</a>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"card-footer px-0 py-0\">\r\n            <div class=\"card-block \">\r\n              <form>\r\n                <fieldset class=\"form-group position-relative has-icon-left mb-0\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Write comments...\">\r\n                  <div class=\"form-control-position\">\r\n                    <i class=\"fa fa-dashcube\"></i>\r\n                  </div>\r\n                </fieldset>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n\r\n    <li class=\"timeline-item block\">\r\n      <div class=\"timeline-badge\"><a title=\"\" data-context=\"inverse\" data-container=\"body\" class=\"border-silc\" data-original-title=\"block highlight\"></a></div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <div class=\"text-center\">\r\n            <p><i class=\"fa fa-bar-chart font-medium-4\"></i></p>\r\n            <h4>Campaign Report</h4>\r\n            <p class=\"timeline-date\">18 hours ago</p>\r\n            <p>Rhoncus, vel dignissim in scelerisque. Dolor lacus pulvinar adipiscing adipiscing montes! Elementum risus adipiscing\r\n              non, cras scelerisque risus penatibus? Massa vut, habitasse, tincidunt!</p>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <div class=\"chart-container\">\r\n              <div id=\"stacked-column\" class=\"height-400 echart-container overflow-hidden lineArea1\">\r\n                <x-chartist class=\"\" [data]=\"lineArea1.data\" [type]=\"lineArea1.type\" [options]=\"lineArea1.options\" [responsiveOptions]=\"lineArea1.responsiveOptions\"\r\n                  [events]=\"lineArea1.events\">\r\n                </x-chartist>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n  <!-- 2016 -->\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <li class=\"timeline-group\">\r\n      <a class=\"btn btn-raised btn-primary\"><i class=\"fa fa-calendar-o\"></i> 2016</a>\r\n    </li>\r\n  </ul>\r\n  <ul class=\"timeline\">\r\n\r\n    <li class=\"timeline-line\"></li>\r\n    <!-- /.timeline-line -->\r\n\r\n    <li class=\"timeline-item\">\r\n      <div class=\"timeline-badge\">\r\n        <span class=\"avatar avatar-online\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Eu pid nunc urna integer\"><img src=\"assets/img/portrait/small/avatar-s-5.png\" alt=\"avatar\" width=\"40\"></span>\r\n      </div>\r\n      <div class=\"timeline-card card card-inverse\">\r\n        <img class=\"card-img img-fluid\" src=\"assets/img/photos/02.jpg\" alt=\"Card image\">\r\n        <div class=\"card-img-overlay bg-overlay\">\r\n          <h4 class=\"card-title\">Good Morning</h4>\r\n          <p class=\"card-text\"><small>26 Aug, 2016 at 2.00 A.M</small></p>\r\n        </div>\r\n      </div>\r\n    </li>\r\n\r\n    <li class=\"timeline-item mt-5\">\r\n      <div class=\"timeline-badge\">\r\n        <span class=\"bg-teal bg-lighten-1\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Nullam facilisis fermentum\"><i class=\"fa fa-check-square-o\"></i></span>\r\n      </div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <h4 class=\"mb-0 card-title\"><a>Sofia Orav</a></h4>\r\n          <div class=\"card-subtitle text-muted mt-0\">\r\n            <span class=\"font-small-3\">18 June, 2016 at 4.50 P.M</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-body\">\r\n            <div class=\"card-block\">\r\n              <p class=\"card-text\">Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a ligula.\r\n                Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.</p>\r\n              <ul class=\"list-group icheck-task\">\r\n                <li class=\"list-group-item\">\r\n                  <div class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\r\n                    <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"1st-item\">\r\n                    <label class=\"custom-control-label\" for=\"1st-item\">Cras justo odio</label>\r\n                  </div>\r\n                </li>\r\n                <li class=\"list-group-item\">\r\n                  <div class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\r\n                    <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"2nd-item\">\r\n                    <label class=\"custom-control-label\" for=\"2nd-item\">checked Dapibus ac facilisis in</label>\r\n                  </div>\r\n                </li>\r\n                <li class=\"list-group-item\">\r\n                  <div class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\r\n                    <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"3rd-item\">\r\n                    <label class=\"custom-control-label\" for=\"3rd-item\">Morbi leo risus</label>\r\n                  </div>\r\n                </li>\r\n                <li class=\"list-group-item\">\r\n                  <div class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\r\n                    <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"4th-item\">\r\n                    <label class=\"custom-control-label\" for=\"4th-item\">disabled Porta ac consectetur ac</label>\r\n                  </div>\r\n                </li>\r\n                <li class=\"list-group-item\">\r\n                  <div class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\r\n                    <input type=\"checkbox\" class=\"custom-control-input\" checked id=\"5th-item\">\r\n                    <label class=\"custom-control-label\" for=\"5th-item\">Vestibulum at eros</label>\r\n                  </div>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n          <div class=\"card-footer px-0 py-0\">\r\n            <div class=\"card-block \">\r\n              <form>\r\n                <fieldset class=\"form-group position-relative has-icon-left mb-0\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Write comments...\">\r\n                  <div class=\"form-control-position\">\r\n                    <i class=\"fa fa-dashcube\"></i>\r\n                  </div>\r\n                </fieldset>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n\r\n  <!-- 2015 -->\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <li class=\"timeline-group\">\r\n      <a class=\"btn btn-raised btn-primary\"><i class=\"fa fa-calendar-o\"></i> 2015</a>\r\n    </li>\r\n  </ul>\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <!-- /.timeline-line -->\r\n    <li class=\"timeline-item block\">\r\n      <div class=\"timeline-badge\"><a title=\"\" data-context=\"inverse\" data-container=\"body\" class=\"border-silc\" data-original-title=\"block highlight\"></a></div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <div class=\"text-center\">\r\n            <p class=\"mt-1\"><i class=\"fa fa-file-image-o font-medium-4\"></i></p>\r\n            <h4>Media Gallery</h4>\r\n            <p class=\"timeline-date\">July 1, 2015</p>\r\n            <p>Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus sagittis ut nunc\r\n              elit! Sociis in et?</p>\r\n          </div>\r\n        </div>\r\n        <!-- Image grid -->\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block my-gallery\" itemscope itemtype=\"http://schema.org/ImageGallery\">\r\n            <div class=\"row\">\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/1.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/2.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/3.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/4.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n            </div>\r\n            <div class=\"row\">\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/5.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/6.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/7.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/8.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n            </div>\r\n            <div class=\"row\">\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/9.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/10.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/11.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n              <figure class=\"col-md-3 col-sm-6 col-12\" itemprop=\"associatedMedia\" itemscope itemtype=\"http://schema.org/ImageObject\">\r\n                <a itemprop=\"contentUrl\" data-size=\"480x360\">\r\n                      <img class=\"img-thumbnail img-fluid\" src=\"assets/img/gallery/12.jpg\" itemprop=\"thumbnail\" alt=\"Image description\" />\r\n                  </a>\r\n              </figure>\r\n            </div>\r\n          </div>\r\n          <!--/ Image grid -->\r\n        </div>\r\n        <!--/ PhotoSwipe -->\r\n      </div>\r\n    </li>\r\n    <li class=\"timeline-item\">\r\n      <div class=\"timeline-badge\">\r\n        <span class=\"bg-warning bg-darken-1\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Application API Support\"><i class=\"fa fa-life-ring\"></i></span>\r\n      </div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <div class=\"media\">\r\n            <div class=\"media-left\">\r\n              <a>\r\n                  <span class=\"avatar avatar-md avatar-busy\"><img src=\"assets/img/portrait/small/avatar-s-18.png\" alt=\"avatar\" width=\"50\"></span>\r\n                  <i></i>\r\n                </a>\r\n            </div>\r\n            <div class=\"media-body\">\r\n              <h4 class=\"card-title mb-0\"><a>Application API Support</a></h4>\r\n              <div class=\"card-subtitle text-muted mt-0\">\r\n                <span class=\"font-small-3\">15 Oct, 2015 at 8.00 A.M</span>\r\n                <span class=\"tag tag-pill tag-default tag-warning float-right\">High</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <img class=\"img-fluid\" src=\"assets/img/photos/03.jpg\" alt=\"Timeline Image 1\">\r\n          <div class=\"card-body\">\r\n            <div class=\"card-block\">\r\n              <p class=\"card-text\">Nullam facilisis fermentum aliquam. Suspendisse ornare dolor vitae libero hendrerit auctor lacinia a ligula.\r\n                Curabitur elit tellus, porta ut orci sed, fermentum bibendum nisi.</p>\r\n              <div class=\"list-inline mb-1\">\r\n                <span class=\"pr-1\"><a class=\"primary\"><span class=\"fa fa-commenting-o\"></span> Comment</a>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"card-footer px-0 py-0\">\r\n            <div class=\"card-block\">\r\n              <div class=\"media\">\r\n                <div class=\"media-left\">\r\n                  <a>\r\n                      <span class=\"avatar avatar-online\"><img src=\"assets/img/portrait/small/avatar-s-4.png\" alt=\"avatar\" width=\"50\"></span>\r\n                    </a>\r\n                </div>\r\n                <div class=\"media-body\">\r\n                  <p class=\"text-bold-600 mb-0\"><a>Crystal Lawson</a></p>\r\n                  <p class=\"m-0\">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.</p>\r\n                  <div class=\"media\">\r\n                    <div class=\"media-left\">\r\n                      <a>\r\n                          <span class=\"avatar avatar-online\"><img src=\"assets/img/portrait/small/avatar-s-6.png\" alt=\"avatar\" width=\"50\"></span>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"media-body\">\r\n                      <p class=\"text-bold-600 mb-0\"><a>Rafila Găitan</a></p>\r\n                      <p>Gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</p>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <form>\r\n                <fieldset class=\"form-group position-relative has-icon-left mb-0\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Write comments...\">\r\n                  <div class=\"form-control-position\">\r\n                    <i class=\"fa fa-dashcube\"></i>\r\n                  </div>\r\n                </fieldset>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class=\"timeline-item mt-5\">\r\n      <div class=\"timeline-badge\">\r\n        <span class=\"bg-amber bg-darken-1\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Quote of the day\"><i class=\"fa fa-smile-o\"></i></span>\r\n      </div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <h4 class=\"card-title mb-0\"><a>Quote of the day</a></h4>\r\n          <div class=\"card-subtitle text-muted mt-0\">\r\n            <span class=\"font-small-3\">03 March, 2015 at 5 P.M</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <img class=\"img-fluid\" src=\"assets/img/photos/04.jpg\" alt=\"Timeline Image 1\">\r\n          <div class=\"card-block\">\r\n            <blockquote class=\"card-blockquote\">\r\n              <p class=\"card-text\">Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus sagittis ut\r\n                nunc elit! Sociis in et?</p>\r\n              <div>Someone famous in <cite title=\"Source Title\"> - Source Title</cite></div>\r\n            </blockquote>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n\r\n  <!-- 2014 -->\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <li class=\"timeline-group\">\r\n      <a class=\"btn btn-raised btn-primary\"><i class=\"fa fa-calendar-o\"></i> 2014</a>\r\n    </li>\r\n  </ul>\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <!-- /.timeline-line -->\r\n    <li class=\"timeline-item block\">\r\n      <div class=\"timeline-badge\"><a title=\"\" data-context=\"inverse\" data-container=\"body\" class=\"border-silc\" data-original-title=\"block highlight\"></a></div>\r\n      <div class=\"timeline-card card border-grey border-lighten-2\">\r\n        <div class=\"card-header\">\r\n          <div class=\"text-center\">\r\n            <p><i class=\"fa fa-map-marker font-medium-4\"></i></p>\r\n            <h4>Moved to Brooklyn</h4>\r\n            <p class=\"timeline-date\">Jan 1, 2014</p>\r\n            <p>Eu pid nunc urna integer, sed, cras tortor scelerisque penatibus facilisis a pulvinar, rhoncus sagittis ut nunc\r\n              elit! Sociis in et? Rhoncus, vel dignissim in scelerisque. Dolor lacus pulvinar adipiscing adipiscing montes!\r\n              Elementum risus adipiscing non, cras scelerisque risus penatibus? Massa vut, habitasse, tincidunt!</p>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"card-block\">\r\n            <div id=\"moved-brooklyn\" class=\"height-450\">\r\n              <agm-map [latitude]=\"lat\" [longitude]=\"lng\">\r\n                <agm-marker [latitude]=\"lat\" [longitude]=\"lng\"></agm-marker>\r\n              </agm-map>\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n  <!-- 2014 -->\r\n  <ul class=\"timeline\">\r\n    <li class=\"timeline-line\"></li>\r\n    <li class=\"timeline-group\">\r\n      <a class=\"btn btn-raised btn-primary\"><i class=\"fa fa-calendar-o\"></i> Founded in 2013</a>\r\n    </li>\r\n  </ul>\r\n</section>\r\n<!--Vertical Timeline Ends-->"

/***/ }),

/***/ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host /deep/ .ct-area {\n  stroke: none;\n  fill-opacity: 0.1; }\n\n:host /deep/ .ct-grid {\n  stroke-dasharray: 0px;\n  stroke: rgba(0, 0, 0, 0.1); }\n\n:host /deep/ .ct-label {\n  font-size: 0.9rem; }\n\n:host /deep/ .lineArea1 .ct-series-a .ct-area {\n  fill-opacity: 0.3;\n  fill: #FF586B; }\n\n:host /deep/ .lineArea1 .ct-series-b .ct-area {\n  fill: #FF586B;\n  fill-opacity: 0.6; }\n\n:host /deep/ .lineArea1 .ct-line {\n  stroke: #FF586B;\n  stroke-width: 0px; }\n\n:host /deep/ .lineArea1 .ct-point {\n  stroke-width: 0px; }\n\nagm-map {\n  height: 450px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZnVsbC1wYWdlcy90aW1lbGluZS92ZXJ0aWNhbC9DOlxceGFtcHBcXGh0ZG9jc1xcZXN0dWRpb0JveFdlYi9zcmNcXGFwcFxccGFnZXNcXGZ1bGwtcGFnZXNcXHRpbWVsaW5lXFx2ZXJ0aWNhbFxcdmVydGljYWwtdGltZWxpbmUtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxxQkFBcUI7RUFDckIsMEJBQTBCLEVBQUE7O0FBRzlCO0VBQ0ksaUJBQWlCLEVBQUE7O0FBS3JCO0VBQ0ksaUJBQWlCO0VBQ2pCLGFBQWEsRUFBQTs7QUFHakI7RUFDSSxhQUFhO0VBQ2IsaUJBQWlCLEVBQUE7O0FBRXJCO0VBQ0ksZUFBZTtFQUNmLGlCQUFpQixFQUFBOztBQUVyQjtFQUNJLGlCQUFpQixFQUFBOztBQUtyQjtFQUNJLGFBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Z1bGwtcGFnZXMvdGltZWxpbmUvdmVydGljYWwvdmVydGljYWwtdGltZWxpbmUtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IC9kZWVwLyAuY3QtYXJlYSB7XHJcbiAgICBzdHJva2U6IG5vbmU7XHJcbiAgICBmaWxsLW9wYWNpdHk6IDAuMTtcclxufVxyXG5cclxuOmhvc3QgL2RlZXAvIC5jdC1ncmlke1xyXG4gICAgc3Ryb2tlLWRhc2hhcnJheTogMHB4O1xyXG4gICAgc3Ryb2tlOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbjpob3N0IC9kZWVwLyAuY3QtbGFiZWx7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG5cclxuLy8gTGluZSB3aXRoIEFyZWEgQ2hhcnQgMSBDU1MgU3RhcnRzXHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhMSAuY3Qtc2VyaWVzLWEgLmN0LWFyZWEge1xyXG4gICAgZmlsbC1vcGFjaXR5OiAwLjM7XHJcbiAgICBmaWxsOiAjRkY1ODZCO1xyXG59XHJcblxyXG46aG9zdCAvZGVlcC8gLmxpbmVBcmVhMSAuY3Qtc2VyaWVzLWIgLmN0LWFyZWEge1xyXG4gICAgZmlsbDogI0ZGNTg2QjtcclxuICAgIGZpbGwtb3BhY2l0eTogMC42O1xyXG59XHJcbjpob3N0IC9kZWVwLyAubGluZUFyZWExIC5jdC1saW5le1xyXG4gICAgc3Ryb2tlOiAjRkY1ODZCO1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAwcHg7XHJcbn1cclxuOmhvc3QgL2RlZXAvIC5saW5lQXJlYTEgLmN0LXBvaW50IHtcclxuICAgIHN0cm9rZS13aWR0aDogMHB4O1xyXG59XHJcblxyXG4vLyBMaW5lIHdpdGggQXJlYSBDaGFydCAxIENTUyBFbmRzXHJcblxyXG5hZ20tbWFwIHtcclxuICAgIGhlaWdodDogNDUwcHg7XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.ts ***!
  \****************************************************************************************/
/*! exports provided: VerticalTimelinePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerticalTimelinePageComponent", function() { return VerticalTimelinePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var data = __webpack_require__(/*! ../../../../shared/data/chartist.json */ "./src/app/shared/data/chartist.json");
var VerticalTimelinePageComponent = /** @class */ (function () {
    function VerticalTimelinePageComponent() {
        // Google map lat-long
        this.lat = 40.650002;
        this.lng = -73.949997;
        // Line with Area Chart 1 Starts
        this.lineArea1 = {
            type: 'Line',
            data: data['lineArea1'],
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
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(38, 198, 218, 1)'
                    });
                },
            },
        };
        // Line with Area Chart 1 Ends
    }
    VerticalTimelinePageComponent.prototype.ngOnInit = function () {
        // Vertical Timeline JS
        $.getScript('./assets/js/vertical-timeline.js');
    };
    VerticalTimelinePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vertical-timeline-page',
            template: __webpack_require__(/*! ./vertical-timeline-page.component.html */ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.html"),
            styles: [__webpack_require__(/*! ./vertical-timeline-page.component.scss */ "./src/app/pages/full-pages/timeline/vertical/vertical-timeline-page.component.scss")]
        })
    ], VerticalTimelinePageComponent);
    return VerticalTimelinePageComponent;
}());



/***/ }),

/***/ "./src/app/pages/full-pages/user-profile/user-profile-page.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/pages/full-pages/user-profile/user-profile-page.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--User Profile Starts-->\r\n<!--Basic User Details Starts-->\r\n<section id=\"user-profile\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\">\r\n            <div class=\"card profile-with-cover\">\r\n                <div class=\"card-img-top img-fluid bg-cover height-100\" style=\"background: url('assets/img/photos/frutas.jpg') 20%;\"></div>\r\n                <div class=\"media profil-cover-details row\">\r\n                    <div class=\"col-12\">\r\n                        <div class=\"align-self-start halfway-fab pl-3 pt-2\">\r\n                            <div class=\"text-left\">\r\n                                <h3 class=\"card-title white\">{{user.NOMBRES + ' ' + user.APELLIDOS}}</h3>\r\n                            </div>\r\n                        </div>\r\n                    </div>                   \r\n                </div>\r\n                <div class=\"profile-section \" style=\"margin-top: 4rem;\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-12 col-md-12 \">\r\n                            <ul class=\"profile-menu no-list-style\">\r\n                                <li>\r\n                                    <a (click)=\"showPage('About')\" [ngClass]=\"currentPage === 'About' ? 'primary font-medium-2 font-weight-600 active' : 'primary font-medium-2 font-weight-600'\">Datos</a>\r\n                                </li>\r\n                                <li>\r\n                                    <a (click)=\"showPage('Clave')\" [ngClass]=\"currentPage === 'Clave' ? 'primary font-medium-2 font-weight-600 active' : 'primary font-medium-2 font-weight-600'\">Cambiar Clave</a>\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--Basic User Details Ends-->\r\n\r\n<!--About section starts-->\r\n<section id=\"about\" *ngIf=\"currentPage === 'About'\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            <div class=\"card\">\r\n                <div class=\"card-header\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-9 col-lg-9\">\r\n                            <h5>Datos</h5>\r\n                        </div>\r\n                        <div class=\"col-md-3 col-lg-3 text-right\">\r\n                            <button type=\"button\" class=\"btn btn-primary btn-raised mr-2\" [routerLink]=\"['/forms/usuario/' + user.ID_USUARIO]\" ><i class=\"fa fa-edit\"></i> Editar Datos</button>\r\n                        </div> \r\n                    </div>                                     \r\n                </div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"card-block\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-12 col-md-6 col-lg-6\">\r\n                                <ul class=\"no-list-style\">\r\n                                    <li class=\"mb-2\">\r\n                                        <span class=\"text-bold-500 primary\"><a><i class=\"icon-user font-small-3\"></i> Nombres y Apellidos:</a></span>\r\n                                        <span class=\"display-block overflow-hidden\">{{user.NOMBRES + ' ' + user.APELLIDOS}}</span>\r\n                                    </li>\r\n                                    <li class=\"mb-2\">\r\n                                        <span class=\"text-bold-500 primary\"><a><i class=\"ft-mail font-small-3\"></i> Correo:</a></span>\r\n                                        <span class=\"display-block overflow-hidden\">{{user.CORREO}}</span>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"col-12 col-md-6 col-lg-6\">\r\n                                <ul class=\"no-list-style\">\r\n                                    <li class=\"mb-2\">\r\n                                        <span class=\"text-bold-500 primary\"><a><i class=\"ft-credit-card font-small-3\"></i> Identificaci&oacute;n:</a></span>\r\n                                        <span class=\"display-block overflow-hidden\">{{user.IDENTIFICACION}}</span>\r\n                                    </li>\r\n                                    <li class=\"mb-2\">\r\n                                        <span class=\"text-bold-500 primary\"><a><i class=\"ft-briefcase font-small-3\"></i> Rol:</a></span>\r\n                                        <a class=\"display-block overflow-hidden\">{{user.DESCRIPCION_TIPO_ROL}}</a>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        <hr *ngIf=\"user.ID_TIPO_ROL == '2'\">\r\n                        <div *ngIf=\"user.ID_TIPO_ROL == '2'\" class=\"mt-3\">\r\n                            <span class=\"text-bold-500 primary ml-3\">Restaurantes:</span>\r\n                        </div>\r\n                        <div *ngIf=\"user.ID_TIPO_ROL == '2'\" class=\"mt-2 overflow-hidden ml-3\">\r\n                            <span *ngFor=\"let item of listRest\" class=\"mr-3 mt-2 text-center float-left width-100\"> \r\n                                <img *ngIf=\"item['ICONO']\"  [src] =\"item['ICONO'] | sanitizeUrl\" width=\"40\" height=\"40\" name=\"imgIcono\"> \r\n                                <div class=\"mt-2\">{{item.NOMBRE_COMERCIAL}}</div>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--About section ends-->\r\n\r\n\r\n<section id=\"about\" *ngIf=\"currentPage === 'Clave'\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            <div class=\"card\">\r\n                <div class=\"card-header\">\r\n                    <h5>Cambiar Clave</h5>\r\n                </div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"mb-3\">\r\n                        <span class=\"text-bold-500 primary ml-3\">Requisitos:</span>\r\n                        <span class=\"d-block overflow-hidden ml-3\">La clave debe tener de 8 a 12 caracteres y debe contener mayusculas, minusculas y numeros.\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"card-block\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"password\" id=\"txtclave\" [(ngModel)]=\"clave\" class=\"form-control\" placeholder=\"Escriba su nueva clave\" name=\"txtpassword\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"password\" id=\"txtclave2\" [(ngModel)]=\"clave2\" class=\"form-control\" placeholder=\"Vuelva a escribar su nueva clave\" name=\"txtpassword2\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-5\">\r\n                                <p class=\"text-success\" *ngIf=\"clave && clave2 && clave == clave2\">Claves Coinciden</p>\r\n                                <p class=\"text-danger\"  *ngIf=\"clave && clave2 && clave != clave2\">Claves no coinciden</p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-12 col-md-3 col-lg-3\">\r\n                                <button type=\"button\" class=\"btn btn-raised btn-raised btn-primary\" (click)=\"cambiarClave()\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-save\"></i> Cambiar Clave\r\n\t\t\t\t\t\t\t\t</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>"

/***/ }),

/***/ "./src/app/pages/full-pages/user-profile/user-profile-page.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/pages/full-pages/user-profile/user-profile-page.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile-menu .active {\n  border-bottom: 2px solid;\n  margin-bottom: -2px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZnVsbC1wYWdlcy91c2VyLXByb2ZpbGUvQzpcXHhhbXBwXFxodGRvY3NcXGVzdHVkaW9Cb3hXZWIvc3JjXFxhcHBcXHBhZ2VzXFxmdWxsLXBhZ2VzXFx1c2VyLXByb2ZpbGVcXHVzZXItcHJvZmlsZS1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRVEsd0JBQXdCO0VBQ3hCLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZnVsbC1wYWdlcy91c2VyLXByb2ZpbGUvdXNlci1wcm9maWxlLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZS1tZW51e1xyXG4gICAgLmFjdGl2ZXtcclxuICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQ7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTJweDtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/full-pages/user-profile/user-profile-page.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/pages/full-pages/user-profile/user-profile-page.component.ts ***!
  \******************************************************************************/
/*! exports provided: UserProfilePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfilePageComponent", function() { return UserProfilePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_restaurante_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/_services/restaurante.service */ "./src/app/_services/restaurante.service.ts");
/* harmony import */ var app_services_usuario_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/_services/usuario.service */ "./src/app/_services/usuario.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserProfilePageComponent = /** @class */ (function () {
    function UserProfilePageComponent(restauranteService, usuarioservice, toastr) {
        this.restauranteService = restauranteService;
        this.usuarioservice = usuarioservice;
        this.toastr = toastr;
        //Variable Declaration
        this.currentPage = "About";
        this.user = JSON.parse(localStorage.getItem('usuario'));
    }
    UserProfilePageComponent.prototype.ngOnInit = function () {
        // Horizontal Timeline js for user timeline
        //$.getScript('./assets/js/vertical-timeline.js');
        if (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE") {
            this.getRestaurantesPorUsuario(this.user.ID_USUARIO);
        }
    };
    UserProfilePageComponent.prototype.cambiarClave = function () {
        var _this = this;
        var regex = /(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\w{8,12}/;
        if (!regex.test(this.clave)) {
            this.toastr.warning("Clave no cumple con los requisitos solicitados", "Error");
            return;
        }
        else if (this.clave != this.clave2) {
            this.toastr.warning("Claves no coinciden", "Error");
            return;
        }
        this.usuarioservice.cambiarPwd(this.user.ID_USUARIO, this.clave)
            .subscribe(function (data) {
            if (data['status'] == 400) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()('Cambio de Clave', 'Clave cambiada exitosamente!', 'success');
            }
        }, function (error) {
            _this.toastr.warning(error, "Error");
        });
    };
    UserProfilePageComponent.prototype.showPage = function (page) {
        this.currentPage = page;
    };
    UserProfilePageComponent.prototype.getRestaurantesPorUsuario = function (idusuario) {
        var _this = this;
        this.restauranteService.getRestaurantesByUsuario(idusuario)
            .subscribe(function (data) {
            _this.listRest = data['resultado']['resultados'];
        }, function (error) {
        });
    };
    UserProfilePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-profile-page',
            template: __webpack_require__(/*! ./user-profile-page.component.html */ "./src/app/pages/full-pages/user-profile/user-profile-page.component.html"),
            styles: [__webpack_require__(/*! ./user-profile-page.component.scss */ "./src/app/pages/full-pages/user-profile/user-profile-page.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_restaurante_service__WEBPACK_IMPORTED_MODULE_1__["RestauranteService"],
            app_services_usuario_service__WEBPACK_IMPORTED_MODULE_2__["UsuarioService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], UserProfilePageComponent);
    return UserProfilePageComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-full-pages-full-pages-module.js.map