import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private service: CommonService, private toastr: ToastrService) { }

  loginForm: FormGroup | any;
  submitted: boolean = false;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  async onLogin() {

    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }

    this.service.Login(this.loginForm.value).then((res: any) => {
      if (res.status == "success") {
        localStorage.setItem('token', JSON.stringify(res.access_token))

        this.router.navigate(['/dashboard']);
        this.loginForm.reset()
        this.submitted = false
      } else {

        this.toastr.error('Error!', 'Invalid username or password!');
        this.submitted = false

        this.loginForm.reset()
      }
    })

  }

  get f() {
    return this.loginForm.controls
  }

}
