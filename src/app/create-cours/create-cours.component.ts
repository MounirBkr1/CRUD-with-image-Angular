import { Component, OnInit } from '@angular/core';
import {Cours} from "../cours";
import {CoursService} from "../cours.service";
import {Router} from "@angular/router";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";

// @ts-ignore
@Component({
  selector: 'app-create-cours',
  templateUrl: './create-cours.component.html',
  styleUrls: ['./create-cours.component.css']
})
export class CreateCoursComponent implements OnInit {
  //instantiate new cours
  cour: Cours= new Cours();





  constructor(public coursService:CoursService,
              private router:Router,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  //save cours to coursService
  createCours(){
    //passer l'objet cours au service
    this.coursService.createCours(this.cour).subscribe(data=>{
      console.log(data);
        //this.coursService.postImage(this.fd);
      this.gotoCoursList();
    },
    error=> console.log(error));
  }


  onSubmit() {
    console.log(this.cour);
    this.createCours();
  }

  //navigate to list Cours after saving
  gotoCoursList(){
    this.router.navigate(['/cours'])
  }

  //******************************************added image*******
  //Gets called when the user selects an image

  // @ts-ignore
  selectedFiles: any ;
  message:any;
  currentFileUpload:any;
  progress:number=0;
  selectedFileName:string="";

  // @ts-ignore
  onFileSelected(event) {
    //contient l'ensemble des fichiers qui sont selectionnées
    this.selectedFiles=event.target.files;
    this.selectedFileName=this.selectedFiles[0].name;
    console.log("selectedFile  "+this.selectedFiles);
    console.log("selectedfilename   "+this.selectedFileName);
    console.log(event);

    this.cour.image=this.selectedFileName;
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    this.progress = 0;
    //item(0): prendre 1 seul file parmis ceux selectionnés
    this.currentFileUpload = this.selectedFiles.item(0);

    console.log("currentFileUploaded  " + this.currentFileUpload);
    this.coursService.postImage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        //poucentage du volume telechargé
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert("fin du telechargement de la photo !!")
        //console.log(this.router.url);
        //this.getCours();
        //this.refreshUpdatedProduct();
        //this.currentTime=Date.now();
        //this.updatePhotoBoolean=false;
      }
    },err=>{
      alert("Problème de chargement");
    })

    //this.selectedFiles = undefined;

  }




}
