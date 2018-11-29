import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(private http: HttpClient) { }

  public Registrar(correo: string, nombre: string, apellido: string, clave: string, tipo: string) { return this.http.post("../../assets/api/registro", { "correo": correo, "nombre": nombre, "apellido": apellido, "clave": clave, "tipo": tipo }); }
  public Logear(correo: string, clave: string) { return this.http.post("../../assets/api/login", { "correo": correo, "clave": clave }); }
  public ListarEntidades(entidad: string) {
    let config = { "headers": new HttpHeaders({ "token": localStorage.getItem("token") }) };
    return this.http.get(`../../assets/api/index.php?entidad=${entidad}`, config);
  }
  public EjecutarConsulta(consulta: string) {
    
    let config = { "headers": new HttpHeaders({ "token": localStorage.getItem("token") }) };
    return this.http.post("../../assets/api/index.php", { consulta: consulta }, config);
  }
}
