import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    private URL = 'https://run.mocky.io/v3/f11d0874-80ec-4299-896c-b36893ca04ea';

    constructor(private _http: HttpClient) { }
    fetchUserList(): Observable<any> {
        return this._http.get(this.URL);
    }
}
