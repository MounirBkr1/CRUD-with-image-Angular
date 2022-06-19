import { Component, OnInit } from '@angular/core';
import {CoursService} from "../cours.service";
import {Cours} from "../cours";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {CoursListComponent} from "../cours-list/cours-list.component";

@Component({
  selector: 'app-update-cours',
  templateUrl: './update-cours.component.html',
  styleUrls: ['./update-cours.component.css']
})
export class UpdateCoursComponent implements OnInit {
  //instantiate a new cours
   cour:Cours= new Cours();

   private id:number=0;
  public updatePhotoBoolean:boolean=false;
  public currentCours:any;
  public selectedFiles:any;
  public progress: number=0;
  private currentFileUpload: any;
  private currentTime: number=0;


  // @ts-ignore
  selectedFiles: any ;
  selectedFileName:any;

  //inject service to call his methodes
  //ActivatedRoute: to retrieve the activated route
  constructor(public coursService: CoursService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    //we need here retrieve id from the route
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getCours();
  }

  getCours(){
    //data returned vont etre assigné a l'objet cour et qui sera envoyé a template
    this.coursService.getCoursById(this.id).subscribe(data=>{
      this.cour=data;
    },error=> console.log(error));
  }

  onSubmit() {
    //envoi l'id de l'objet a modifier et l'objet a modifier
    //subscribe to this method because it return an observable
      this.coursService.updateCours(this.id, this.cour)
        .subscribe(data=>{
          this.goToCoursList();

        },error=>console.log(error));
  }

  goToCoursList(){
    this.router.navigate(['/cours']);
  }

  //afficher button downolad image & button upload
  updatePhoto(c:any) {
    this.updatePhotoBoolean=true;
    this.currentCours=c;

  }

  onSelectFile(event:any) {
    //contient l'ensemble des fichiers qui sont selectionnées
    this.selectedFiles=event.target.files;
    this.selectedFileName=this.selectedFiles[0].name;
    //update name of image
    this.cour.image=this.selectedFileName;

  }

  //upload image
  uploadImage() {
    this.progress = 0;
    //item(0): prendre 1 seul file parmis ceux selectionnés
    this.currentFileUpload = this.selectedFiles.item(0)
    this.coursService.uploadPhotoCours(this.currentFileUpload, this.currentCours.id).subscribe(event => {
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
