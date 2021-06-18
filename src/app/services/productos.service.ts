import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ProductoInterface} from'../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando =  true;

  constructor(private htpp:HttpClient) {
    this.cargarProductos();
   }
  private cargarProductos()
  {
    this.htpp.get('https://angular-html-d8ed4-default-rtdb.firebaseio.com/productos_idx')
    .subscribe((resp: ProductoInterface[]) => {
    console.log(resp);
    this.cargando =  false;
    });

  }
}
