import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";

import {Cours} from "./cours";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  public baseUrl = "http://localhost:8080/api/v1/";

  //inject http here
  constructor(private httpClient: HttpClient) {
  }

  //GET : create an observable
  getCoursList(): Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(`${this.baseUrl}` + "cours");
  }

  //Post: send data to db(to controller spring boot)
  createCours(cours: Cours): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}` + "cours", cours);
  }

  //GET by Id: to populate fields in updateComponent
  getCoursById(id: number): Observable<Cours> {
    return this.httpClient.get<Cours>(`${this.baseUrl}` + "cours/" + `${id}`);
  }

  //PUT : to update Object cour avec cour passé en parametre
  updateCours(id: number, cour: Cours): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}` + "cours/" + `${id}`, cour)
  }

  //DELETE: delete by id
  deleteCours(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}` + "cours/" + `${id}`);
  }

  // @ts-ignore
  uploadPhotoCours(file: File,idCours): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    //send query POST
    const req = new HttpRequest('POST', this.baseUrl + 'uploadPhoto/'+idCours , formdata, {
      //recevoir la progression du telechargement
      reportProgress: true,
      //au final il retourne une reponse http qui est text(si vs mettez pas il recupere un resultat et le transform en format json )
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

  //add image to new Cours
  // @ts-ignore
  postImage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    //send query POST
    const req = new HttpRequest('POST', this.baseUrl + 'addPhoto', formdata, {
      //recevoir la progression du telechargement
      reportProgress: true,
      //au final il retourne une reponse http qui est text(si vs mettez pas il recupere un resultat et le transform en format json )
      responseType: 'text'
    });
    return this.httpClient.request(req);

  }


}
