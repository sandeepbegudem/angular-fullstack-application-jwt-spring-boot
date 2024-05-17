import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoursesInstructorComponent } from './components/courses-instructor/courses-instructor.component';

const appRoutes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'instructor-courses/:id', component: CoursesInstructorComponent},
  { path: 'navbar', component: NavbarComponent },
  { path: 'header', component: HeaderComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    TeachersComponent,
    NavbarComponent,
    HeaderComponent,
    CoursesInstructorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
