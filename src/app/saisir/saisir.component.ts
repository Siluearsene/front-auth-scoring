import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saisir',
  standalone: true,
  imports: [ReactiveFormsModule, AppComponent, CommonModule, RouterOutlet,SweetAlert2Module],
  templateUrl: './saisir.component.html',
  styleUrls: ['./saisir.component.css']
})
export class SaisirComponent {
  errorMessage: string | null = null;
  http = inject(HttpClient);

  // Formulaire avec tous les champs requis par l'API
  saisirForm = new FormGroup({
    // id: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    nom: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    montant_du_pret: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    anciennete_avant_pret: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    age: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    nb_enfants: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    montant_encours: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    nbr_credir: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    taux_interet: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    revenu: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    duree_pret: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    montant_pret_annee: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    reste_vivre: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    agence: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    genre: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    secteur_activite: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    segment: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  showCustomAlert(name: string, y_proba: number) {
    const message = y_proba > 0.5 
      ? `Le client ${name} est solvable car la probabilité qu’il soit dans la classe 1 est de ${y_proba}.`
      : `Le client ${name} est insolvable car la probabilité qu’il soit dans la classe 1 est de ${y_proba}.`;
  
    Swal.fire({
      title: 'Résultat',
      text: message,
      icon: y_proba > 0.5 ? 'success' : 'info',
      confirmButtonText: 'OK'
    });
  }
  
  
  

  constructor(private router: Router) {}

  saisirButton() {
    if (this.saisirForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs avant de continuer.';
    } else {
      this.errorMessage = null;
  
      // Créer un objet avec les données du formulaire
      const body = {
        // id: this.saisirForm.getRawValue().id,
        name: this.saisirForm.getRawValue().nom,
        montant_pret: this.saisirForm.getRawValue().montant_du_pret,
        anciennete_avant_pret: this.saisirForm.getRawValue().anciennete_avant_pret,
        age: this.saisirForm.getRawValue().age,
        nombre_enfants: this.saisirForm.getRawValue().nb_enfants,
        montant_encours: this.saisirForm.getRawValue().montant_encours,
        nombre_de_credit: this.saisirForm.getRawValue().nbr_credir,
        taux_interet: this.saisirForm.getRawValue().taux_interet,
        revenu: this.saisirForm.getRawValue().revenu,
        duree_pret: this.saisirForm.getRawValue().duree_pret,
        montant_pret_pour_annee: this.saisirForm.getRawValue().montant_pret_annee,
        reste_a_vivre: this.saisirForm.getRawValue().reste_vivre,
        agence: this.saisirForm.getRawValue().agence,
        genre: this.saisirForm.getRawValue().genre,
        secteur_activite: this.saisirForm.getRawValue().secteur_activite,
        segment: this.saisirForm.getRawValue().segment
      };
  
      const headers = new HttpHeaders({
        "Content-Type": "application/json",  
        accept: "application/json"
      });
  
      // Envoyer la requête à l'API avec des données JSON
      this.http.post("https://auth-scoring.onrender.com/api/v1/generate-excel/", JSON.stringify(body), { headers }).subscribe({
        next: (res: any) => {
          console.log("Réponse de l'API:", res);
          const y_proba = res.y_prob;
          const name = body.name;
          
          this.showCustomAlert(name, y_proba); // Appel de l'alerte personnalisée
        },
        error: (err) => {
          console.log("Erreur lors de l'envoi du formulaire:", err);
          this.errorMessage = "Erreur lors de l'envoi du formulaire. Veuillez vérifier vos informations.";
        }
      });
    }
  }
  
  
}
