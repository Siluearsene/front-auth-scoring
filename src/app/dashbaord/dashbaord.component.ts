import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SaisirComponent } from '../saisir/saisir.component';

@Component({
  selector: 'app-dashbaord',
  standalone: true,
  imports: [RouterLink, RouterOutlet,SaisirComponent],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent {
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Fichier sélectionné :', file.name);
      // Vous pouvez maintenant faire quelque chose avec le fichier sélectionné
    }
  }
  
}
