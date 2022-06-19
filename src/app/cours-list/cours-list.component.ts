import { Component, OnInit } from '@angular/core';
import {Cours} from "../cours";
import {CoursService} from "../cours.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {
  //on importe Cours de la classe Cours
  cours: Cours[]=[];
  resultsSearch: Cours[] = [];
  searchText: string = "";

  //inject service here
  constructor(public coursService: CoursService,
              private router:Router) { }

  ngOnInit(): void {
    this.getCours();
  }

  private getCours() {

    //subsrcibe to observable in service
    this.coursService.getCoursList().subscribe((cours)=> this.resultsSearch = this.cours = cours);
  }

  searchCours() {
    this.resultsSearch = this.cours.filter((cour) =>
      cour.title
        .toLocaleLowerCase()
        .includes(this.searchText.toLocaleLowerCase())
    );
  }

  addNewCours() {
    this.router.navigate(['create-cours'])
  }

  updateCours(id:number) {
    //redirect to page/component update cours
    this.router.navigate(['/update-cours', id]);
  }


  deleteCours(id: any) {
    //popup are you sur
    if(confirm("vous etes sur d'avoir supprimer ce cours ? ")){
      this.coursService.deleteCours(id).subscribe(data=>{
        console.log(data);
        this.getCours();
      },error=>console.log(error))
    }


  }


  seeCoursDetails(id: any) {
    this.router.navigate(['cours-details',id])
  }

}
