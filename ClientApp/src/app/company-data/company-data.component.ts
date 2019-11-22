import { Component, Inject, TemplateRef, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { strict } from 'assert';

@Component({
    selector: 'app-company-data',
    templateUrl: './company-data.component.html'
})
export class CompanyDataComponent implements OnInit{
    public currentCount1 = 0;
    modalRef: BsModalRef;
    formGroup: FormGroup;
    m_id = new FormControl();
    m_project = new FormControl();
    m_group = new FormControl();
    oper: string = "";
    public forecasts: Company[];
    constructor(public http: HttpClient, private modalService: BsModalService) {
        this.getstudent();
    }
    ngOnInit() {
        this.formGroup = new FormGroup({
            m_id: new FormControl('', [
                Validators.required,
            ]),
        });
    }
    getstudent() {
        return this.http.get<Company[]>('https://localhost:44380/company/get').subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }
    updateedit(template: TemplateRef<any>,selectvalue : any) {
        this.m_id.setValue(selectvalue.id);
        this.m_project.setValue(selectvalue.projectName);
        this.m_group.setValue(selectvalue.groupMeetingLeadName);
        this.oper = 'edit';
        this.modalRef = this.modalService.show(template);
    };
    onSubmit(event:any) {
        const formData = new FormData();
        formData.append('Id', event.target.p_id.value);
        formData.append('ProjectName', event.target.p_project.value);
        formData.append('GroupMeetingLeadName', event.target.p_group.value);
        formData.append('Oper', this.oper);

        this.http
            .post('https://localhost:44380/company/updatestudent', formData)
            .subscribe(data => {
                this.getstudent();
                this.modalRef.hide()
            }, error => {
                console.log(error.json());
            });
    }

    onReset() {
        this.m_id.setValue("");
        this.m_project.setValue("");
        this.m_group.setValue("");
        this.oper = '';
    }
    Adddetails(template: TemplateRef<any>) {
        this.onReset();
        this.oper = 'add';
        this.modalRef = this.modalService.show(template);
    }
    deletedetails(selectvalue1: any) {
        this.oper = 'delete';
        const formData = new FormData();
        formData.append('Id', selectvalue1.id);
        formData.append('Oper', this.oper);

        this.http
            .post('https://localhost:44380/company/updatestudent', formData)
            .subscribe(data => {
                this.getstudent();
                this.modalRef.hide()
            }, error => {
                console.log(error.json());
            });
    }
}

//let x: Company = {
//    Id: 1,
//    ProjectName: "Daxa",
//    GroupMeetingLeadName: "Analize",
//}
interface Company {
    Id: number;
    ProjectName: string;
    GroupMeetingLeadName: string;
}

