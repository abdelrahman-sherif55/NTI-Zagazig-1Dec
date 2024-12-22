import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseurl: string = '';
  private readonly authRoute: string = '';

  constructor(private _apisService: ApisService, private _httpClient: HttpClient) {
    this.baseurl = _apisService.baseurl;
    this.authRoute = _apisService.authRoute;
  }

  login(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.authRoute}/login?lang=en`, formData, {
      headers: {'X-CSRF-Token': `${Cookies.get('cookies')}`},
      withCredentials: true
    })
  }

}
