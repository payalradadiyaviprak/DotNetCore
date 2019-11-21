import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { strict } from 'assert';

@Component({
    selector: 'app-company-data',
    templateUrl: './company-data.component.html'
})
export class CompanyDataComponent {
    public currentCount1 = 0;

    //public incrementCounter() {
    //    //this.currentCount1++;
    //    Company
    //}
    public forecasts: Company[];
    constructor(public http: HttpClient) {
        this.getstudent();
    }
    getstudent() {
        return this.http.get<Company[]>('https://localhost:44380/company/get').subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }
    updateedit() {
        //http.post(baseUrl + 'company/updatestudent', { x }).subscribe(res => console.log(res));
        const formData = new FormData();
        formData.append('Id', "2");
        formData.append('ProjectName', "payal");
        formData.append('GroupMeetingLeadName', "no");

        this.http
            .post('https://localhost:44380/company/updatestudent', formData)
            .subscribe(data => {
                this.getstudent();
            }, error => {
                console.log(error.json());
            });

        //this.http.post('https://localhost:44380/company/updatestudent', JSON.stringify(x)).subscribe(result => {
        //    this.getstudent();
        //    console.log(result);
        //}, error => console.error(error));
    };
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

