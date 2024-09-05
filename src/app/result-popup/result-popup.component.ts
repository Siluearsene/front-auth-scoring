import { Component,Input } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-result-popup',
  standalone: true,
  imports: [SweetAlert2Module],
  templateUrl: './result-popup.component.html',
  styleUrl: './result-popup.component.css'
})
export class ResultPopupComponent {
  @Input() result: any;

  showCustomAlert(name: string, y_proba: number) {
    Swal.fire({
      title: 'Résultat',
      text: `Le ${name} est insolvable car la probabilité qu’il soit dans la classe 1 est de ${y_proba}`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }
}
