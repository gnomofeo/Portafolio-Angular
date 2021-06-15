import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/infoPagina.interface';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info:InfoPagina ={};
  cargada =  false;
  constructor(private http:HttpClient) {
    console.log('servicio de infoPagina listo');
    //leer el archivo json
    this.http.get('assets/Data/Data-pagina.json')
    .subscribe((resp:  InfoPagina) => {
      this.cargada=true;
      this.info  = resp;
  
    })
   }
}
