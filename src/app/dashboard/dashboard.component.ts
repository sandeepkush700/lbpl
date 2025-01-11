import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../services/url.service';
import { Dash } from "../model"
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private route: Router, private Service: CommonService, private http: HttpClient, private toastr: ToastrService, private urlservice: UrlService) {

  }
  headingData: String = ''
  reportName = [{ id: 1, value: 'Brand pack primary and secondary format' }, { id: 2, value: 'Primary value report' }];
  reportType = [{ id: 1, value: "Brand Wise" }, { id: 2, value: 'Pack Wise' }];
  reportCase = [{ id: 1, value: 'Physical Case' }, { id: 2, value: 'Unit Case' }, { id: 3, value: 'Transactional Case' }];
  reportperiod = [{ id: 1, value: 'MID' }, { id: 2, value: 'YID' }];

  selectSource: any = '';
  selectSchema: any = '';
  selectcase: any = '';
  selectperiod: any = ''
  ngOnInit(): void {
    this.refrece()
  }
  onclick(val: any) {
    this.headingData = val
    $('#staticBackdrop').modal('show')
  }

  slectedSource: any
  async onSelectsourceName(event: any) {
    console.log(event.target.value)
    this.slectedSource = event.target.value

  }

  selectedSchema: any
  async onSelectSchemaName(event: any) {
    console.log(event.target.value)
    this.selectedSchema = event.target.value
  }

  selectedCase: any
  selectReportCase(event: any) {
    this.selectedCase = event.target.value
  }

  selectedPeriod: any
  selectReportPeriod(event: any) {
    this.selectedPeriod = event.target.value
    console.log(this.selectedPeriod);

  }

  async OnExtract() {

    let inputdata = new Dash();
    inputdata.name = this.slectedSource,
      inputdata.type = this.selectedSchema,
      inputdata.report = this.selectedCase,
      inputdata.report_period = this.selectedPeriod

    if (this.slectedSource || this.selectedSchema || this.selectedCase || this.selectedPeriod) {
      this.Service.Dash(inputdata).then(({ status, message }: any) => {
        if (status === "success") {
          this.toastr.success(message)
        } else {
          this.toastr.error("Error", "Something went wrong")
        }
        this.selectSource = '';
        this.selectSchema = '';
        this.selectcase = "";
        this.slectedSource = ''
        this.selectedSchema = ''
        this.selectedCase = ''
        this.selectperiod=''
        this.selectedPeriod=''
        return
      })

    }


    // let name = this.slectedSource
    // let type = this.selectedSchema
    // let reportCase = this.selectedCase

    // const email = ""

    // console.log(name);


    // let newURL = this.urlservice.baseUrl + "/Dash?"

    // if (name) {
    //   newURL += `name=${name}&`
    // }
    // if (type) {
    //   newURL += `type=${type}&`
    // }
    // if (reportCase) {
    //   newURL += `report=${reportCase}&`
    // }

    // if (email) {
    //   newURL += `email=${email}&`
    // }


    // newURL = newURL.endsWith('&') ? newURL.slice(0, -1) : newURL
    // if (newURL == "http://127.0.0.1:8000/Dash?") {
    //   this.toastr.error("Error!", "Select any option")
    //   return
    // }
    // if (name || type || reportCase || email) {

    //   await this.http.get(newURL).toPromise().then(({ status, message }: any) => {
    //     if (status === "success") {
    //       this.toastr.success(message)
    //     } else {
    //       this.toastr.error("Error", "Something went wrong")
    //     }
    //     this.selectSource = '';
    //     this.selectSchema = '';
    //     this.selectcase = "";
    //     this.slectedSource = ''
    //     this.selectedSchema = ''
    //     this.selectedCase = ''
    //     return
    //   })

    // }

  }



  closeModal() {
    this.selectSource = '';
    this.selectSchema = '';
    this.selectcase = "";

  }


  animateIcon = false;
  tabledata: any
  async refrece() {
    this.animateIcon = true;

    await this.Service.LatestData().then((res) => {
      this.tabledata = res
      console.log(res)
    })

    // Reset the animation class after it's done
    setTimeout(() => {
      this.animateIcon = false;
    }, 500); // Match the animation duration in milliseconds
  }
}
