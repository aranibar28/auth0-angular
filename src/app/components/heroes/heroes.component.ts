import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  loading: boolean = false;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.loading = false;
    });
  }

  deleteHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${heroe.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }
    });
  }
}
