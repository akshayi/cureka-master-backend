import {Component , Inject, ViewContainerRef } from "@angular/core";
import { Router } from '@angular/router';
import { DataService } from '../../services/services.component'

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent{
  email:string;
  password:string;
  errorMsg:string;

  constructor(private _router: Router, private apiService: DataService) {

  }

  formSubmit(){
    let data = {email: this.email, password: this.password};
    this.apiService.doLogin(data)
    .then( data => { if(data.status){
      this._router.navigate(['dashboard']);
    }else{
      this.errorMsg=data.message;
    }},
                        error => { this.errorMsg="Server Error!!! Try Again In Sometime";})
  }
}
