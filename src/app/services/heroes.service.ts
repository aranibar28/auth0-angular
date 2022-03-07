import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url: string = 'https://login-app-49018-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.createArray), delay(1500));
  }

  private createArray(heroesObj: any) {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) {
      return [];
    }
    Object.keys(heroesObj).map((key: any) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

  addHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((response: any) => {
        heroe.id = response.name;
        return heroe;
      })
    );
  }

  updateHeroe(heroe: HeroeModel) {
    const heroeTemp: any = {
      ...heroe,
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
