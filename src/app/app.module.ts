import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursListComponent } from './cours-list/cours-list.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CreateCoursComponent } from './create-cours/create-cours.component';
import {FormsModule} from "@angular/forms";
import { UpdateCoursComponent } from './update-cours/update-cours.component';
import { CoursDetailsComponent } from './cours-details/cours-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursListComponent,
    NavbarComponent,
    FooterComponent,
    CreateCoursComponent,
    UpdateCoursComponent,
    CoursDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
