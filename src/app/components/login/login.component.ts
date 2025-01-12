import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule
  ],
  viewProviders: [BookingService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = "";
  form: FormGroup;
 // showError:boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private service: BookingService, private router: Router) {
    this.form = this.fb.group({
      username: [""],
      passwort: [""],

    })

  }
  seConnecter(form: FormGroup) {
    this.service.getLoginData().subscribe(logDataFromBE => {
      if (form.value.username === logDataFromBE.username &&
        form.value.passwort === logDataFromBE.passwort) {
          this.router.navigate(['booking'])
          //this.showError = false;
          this.errorMessage= ""
      } else {
        //this.showError = true;
        this.errorMessage = "Mot de Passe ou Nom de l' utilisateur incorrect"
      }
    })

  }
}
