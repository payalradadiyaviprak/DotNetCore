"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CompanyDataComponent = /** @class */ (function () {
    function CompanyDataComponent(http, baseUrl, modalService) {
        this.http = http;
        this.modalService = modalService;
        this.currentCount1 = 0;
        this.myAppUrl = "";
        this.m_id = new forms_1.FormControl('');
        this.m_project = new forms_1.FormControl('');
        this.m_grp = new forms_1.FormControl('');
        this.myAppUrl = baseUrl;
        this.getstudent();
    }
    CompanyDataComponent.prototype.getstudent = function () {
        var _this = this;
        return this.http.get(this.myAppUrl + 'company/get').subscribe(function (result) {
            _this.forecasts = result;
        }, function (error) { return console.error(error); });
    };
    CompanyDataComponent.prototype.updateedit = function (template, selectedItem1) {
        //  this.oper = 'edit';
        this.modalRef = this.modalService.show(template);
        this.m_id.setValue(selectedItem1.id);
        this.m_project.setValue(selectedItem1.projectName);
        this.m_grp.setValue(selectedItem1.groupMeetingLeadName);
    };
    ;
    CompanyDataComponent.prototype.ngOnInit = function () {
        this.formGroup = new forms_1.FormGroup({
            Project: new forms_1.FormControl('', [
                forms_1.Validators.required
                // Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            Group: new forms_1.FormControl('', [
                forms_1.Validators.required,
            ])
        });
    };
    CompanyDataComponent.prototype.onSubmit = function (event) {
        var _this = this;
        var formData = new FormData();
        formData.append('Id', event.target.p_id.value);
        formData.append('ProjectName', event.target.p_project.value);
        formData.append('GroupMeetingLeadName', event.target.p_grp.value);
        // formData.append('Oper', this.oper);
        this.http
            .post(this.myAppUrl + 'company/updatestudent', formData)
            .subscribe(function (data) {
            _this.modalRef.hide();
            _this.getstudent();
        }, function (error) {
            console.log(error.json());
        });
    };
    CompanyDataComponent.prototype.onReset = function () {
        this.formGroup.reset();
        //   this.oper = '';
    };
    CompanyDataComponent.prototype.Adddata = function (template) {
        this.formGroup.reset();
        // this.oper = 'add';
        this.modalRef = this.modalService.show(template);
    };
    CompanyDataComponent = __decorate([
        core_1.Component({
            selector: 'app-company-data',
            templateUrl: './company-data.component.html'
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], CompanyDataComponent);
    return CompanyDataComponent;
}());
exports.CompanyDataComponent = CompanyDataComponent;
//# sourceMappingURL=company-data.component.js.map