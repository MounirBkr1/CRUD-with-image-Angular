import { Component, OnInit } from '@angular/core';
import {Cours} from "../cours";
import {ActivatedRoute, Router} from "@angular/router";
import {CoursService} from "../cours.service";

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrls: ['./cours-details.component.css']
})
export class CoursDetailsComponent implements OnInit {

  id!: number ;
  cour!: Cours ;

  constructor(private activatedRoute: ActivatedRoute,
              public coursService:CoursService,
              private router:Router) { }

  ngOnInit(): void {
    this.id= this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.cour= new Cours();
    this.coursService.getCoursById(this.id).subscribe(data=>{
      this.cour=data;
    },error=>console.log(error));

  }

  goToList() {
    this.router.navigate(['cours']);
  }
}
