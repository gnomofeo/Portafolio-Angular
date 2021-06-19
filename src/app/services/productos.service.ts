import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ProductoInterface} from'../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado:ProductoInterface[]=[];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }



  private cargarProductos() {

    return new Promise<void>(  ( resolve, reject ) => {

      this.http.get('https://angular-html-d8ed4-default-rtdb.firebaseio.com/productos_idx.json')
          .subscribe( (resp: ProductoInterface[]) => {
            this.productos = resp;
            this.cargando = false;
            resolve();
          });

    });

  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-d8ed4-default-rtdb.firebaseio.com/productos/${id}.json`);
  }
  buscarProducto(termino:string){
    if(this.productos.length==0){
      //cargar  productos
      this.cargarProductos().then(() => {
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      //aplicar el filtros
      this.filtrarProductos(termino);
    }
  }


  private filtrarProductos(termino:string){
    console.log(this.productos);
    this.productosFiltrado =  [];

    termino = termino.toLocaleLowerCase();
      

    this.productos.forEach(prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
