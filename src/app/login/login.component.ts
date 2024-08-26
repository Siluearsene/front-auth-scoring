import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AppComponent, CommonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;
  http = inject(HttpClient);
  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  constructor(private router: Router) {}

  loginButton() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs avant de continuer.';
    } else {
      this.errorMessage = null;
      
      // login(credentials: AuthCredentials): Observable<AuthResponse> {
      //   const headers = new HttpHeaders({
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     accept: "application/json",
      //   });
      //   const body = new HttpParams()
      //     .set("username", credentials.username)
      //     .set("password", credentials.password);
    
      //   return this.http.post<AuthResponse>(
      //     ${this.apiUrl}/login,
      //     body.toString(),
      //     { headers }
      //   );
      // }


      // Créer les headers personnalisés
      const headers = new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      });

     
      const body = new HttpParams()
          .set("username", this.loginForm.getRawValue().username)
          .set("password", this.loginForm.getRawValue().password);

      this.http.post("https://auth-scoring.onrender.com/api/v1/login", body.toString(), { headers }).subscribe({
        next: (res: any) => {
          console.log("**************:", res);
          this.router.navigateByUrl("/dashboard");
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = "Erreur lors de la connexion. Veuillez vérifier vos informations.";
        }
      });
    }
  }
}
  