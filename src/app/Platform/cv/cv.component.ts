import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCvComponent } from '../detail-cv/detail-cv.component';
import { ListeCvComponent } from '../liste-cv/liste-cv.component';
import { Personne } from '../../Model/Personne';
import { CvService } from '../cv-service.service';
import { EmbaucheComponent } from '../embauche/embauche.component';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonneService } from '../person-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule,DetailCvComponent,ListeCvComponent,EmbaucheComponent,HttpClientModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css',
})

export class CvComponent implements OnInit {
  
  personnes: Personne[] =[] ;
  selectedPersonne!: Personne;

  constructor(
    private cvservice : CvService,
    private http: HttpClient,
    private personneService: PersonneService,
    private toast: ToastrService

  ){}

  ngOnInit(): void {
    this.http.get('https://apilb.tridevs.net/api/personnes').subscribe(
      (response) => {
        console.log(response)
        this.personnes = response as Personne[]
      },
      (error) => {
        this.personnes= this.cvservice.getPersonne()
        this.toast.show("API NOT FOUND")
      }
    );
    this.personneService.personneDetailSubject.subscribe((personne)=>{
      this.selectedPersonne = personne;
    })
    
  }


}