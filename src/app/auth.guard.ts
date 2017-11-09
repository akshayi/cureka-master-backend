import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {DataService} from "../services/services.component";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _userService: DataService) {}

  canActivate(): Promise<boolean>| boolean {
    return this._userService.authenticated()
      .then(
        result => {
          if (result.status) {
            return true;
          } else {
            this._router.navigate(['/']);
            return false;
          }
        }
      ).catch(error => {
        return true;
      });
  }
}
