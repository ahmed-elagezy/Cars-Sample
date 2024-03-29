import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { apiUrl } from '../../../environment';
import { Resource } from '../Models/Resource';
import { ResponseModelObject } from '../Models/ResponseModelObject';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  GetAllMinified(): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource")
  }

  GetResouceById(id: number): Observable<ResponseModelObject<Resource>> {
    return this.http.get<ResponseModelObject<Resource>>(apiUrl + "Resource/" + id)
  }

  GetAvailableResources(serviceId: number, date: string, from: string, to: string){
    const sId = Number(serviceId)
    return this.http.get<Resource[]>(apiUrl + `Schedule/GetAvailableResources?_day=${date}&_serviceId=${sId}&_startTime=${from}&_endTime=${to}`);
  }

}
