import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CoursListComponent} from "./cours-list/cours-list.component";
import {CreateCoursComponent} from "./create-cours/create-cours.component";
import {UpdateCoursComponent} from "./update-cours/update-cours.component";
import {CoursDetailsComponent} from "./cours-details/cours-details.component";


const routes:Routes=[
  {path:"cours",component:CoursListComponent},
  {path:"create-cours",component:CreateCoursComponent},
  {path:"update-cours/:id",component:UpdateCoursComponent},
  {path:"cours-details/:id",component:CoursDetailsComponent},

  //if path is empty, it will be redirected to .../cours
  {path:'',redirectTo:'cours',pathMatch: 'full'}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]

})
export class AppRoutingModule { }
