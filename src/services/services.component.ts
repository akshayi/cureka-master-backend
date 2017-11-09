import {Injectable} from "@angular/core";
import {Http, Headers, URLSearchParams, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/mergeMap";
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class DataService {
  apiUrl: string='http://www.cureka.co:3000/api/'
  constructor(private http: Http) {

  }

	authenticated() {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true  });
    return this.http.get(this.apiUrl+'checkauth',options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  doLogin(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true  });
    return this.http.post(this.apiUrl+'login', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  uploadImage(formData) {
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'uploadImage', formData, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  addMedicines(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'add-medicines', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  removeMedicines(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'remove-medicines', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getMedicines() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.apiUrl+'get-medicines',options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  addCauses(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'add-causes', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  removeCauses(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'remove-causes', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getCauses() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.apiUrl+'get-causes',options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }



  addAttributes(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'add-attributes', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  removeAttributes(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+'remove-attributes', data, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getAttributes() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.apiUrl+'get-attributes',options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error);
    return Promise.reject(error);
  }

}
