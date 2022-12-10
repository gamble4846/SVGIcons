import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAppScriptsService {
  ScriptLink = "https://script.google.com/macros/s/AKfycbwBIoYdzOKhOCZV67FHXhRUcdyuNLnbe2ExxO79aLF6t5ksUJMwn0RVksDSfiqfFTg-Dg/exec";

  constructor(private http: HttpClient) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return options;
  }
  
  GetALLICONS(Page:number = 1, ResultsPerPage:number = 10){
    var body = {
      "method": "GET",
      "Action": "ALLICONS",
      "Page": Page,
      "ResultsPerPage": ResultsPerPage
    };
    return this.http.post(this.ScriptLink, body, this.getOptions());
  }

  GetICONSTYLEBYICONID(IconId:number){
    var body = {
      "method": "GET",
      "Action": "ICONSTYLEBYICONID",
      "ICONID": IconId
    };
    return this.http.post(this.ScriptLink, body, this.getOptions());
  }
}
