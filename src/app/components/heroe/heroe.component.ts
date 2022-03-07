import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();
  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id).subscribe((resp: any) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if (this.heroe.id) {
      petition = this.heroesService.updateHeroe(this.heroe);
    } else {
      petition = this.heroesService.addHeroe(this.heroe);
    }

    petition.subscribe((res) => {
      Swal.fire({
        title: this.heroe.name,
        text: 'Se actualizó correctamente.',
        icon: 'success',
      });
    });
  }
}
