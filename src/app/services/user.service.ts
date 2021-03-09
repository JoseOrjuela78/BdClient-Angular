import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { ContraparteModel } from '../models/contraparte.model';
import { Observable } from 'rxjs';
import { RepresentanteModel } from '../models/representante.model';
import { SolicitudModel } from '../models/solicitud.model';
import { CargosModel } from '../models/cargos.model';
import { CausalesModel } from '../models/causales.model';
import { EjecutivosModel } from '../models/ejecutivos.model';
import { TipoIdentificionModel } from '../models/tiposIdentificacion.model';
import { TipoSolicitudModel } from '../models/tiposSolicitud.model';
import { EstadosModel } from '../models/estados.model';
import { PaisesModel } from '../models/paises.model';
import { DepartamentosModel } from '../models/departamentos.model';
import { MunicipiosModel } from '../models/municipios.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private url: string = ''; 
  private url: string = 'http://localhost:3000';
  userToken: String;
  headers: any;
  
  constructor(private http: HttpClient) { 
    this.leerToken();
    this.headers = new HttpHeaders({'token':`${this.userToken}`});
    
  }


  nuevoCompliance(user: UserModel):Observable<any>{

    let json = JSON.stringify(user);
    let params = "json="+ json;
    let headersN = new HttpHeaders({
        'token':`${this.userToken}`,
        'Content-Type': "application/x-www-form-urlencoded"
      });
    return this.http.post(`${this.url}/listas`,params,{headers:headersN})
   
      
    };


obtenerTiposIdentificacion(){
  
  return this.http.get(`${this.url}/tipoIdentificacion`,{headers:this.headers})
}

obtenerTiposIdentificacionItem(item:String){
  return this.http.get(`${this.url}/tiposIdentificacion/${item}`,{headers:this.headers})
}

nuevoTipoIdentificacion(tipoIdentificacion: TipoIdentificionModel):Observable<any>{

  let json = JSON.stringify(tipoIdentificacion);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    });
  return this.http.post(`${this.url}/tipoIdentificacion`,params,{headers:headersN})
 
    
  };

actualizarTiposIdentificacion(tipoIdentificacion: TipoIdentificionModel){
  
    let json = JSON.stringify(tipoIdentificacion);
    let params = "json="+ json;
    let headersN = new HttpHeaders({
    'token':`${this.userToken}`,
    'Content-Type': "application/x-www-form-urlencoded"
    });
    return this.http.put(`${this.url}/tipoIdentificacion/${tipoIdentificacion.tipoId}`,params,{headers:headersN});


    }


obtenerPaisesItem(item:String){

  return this.http.get(`${this.url}/paises/${item}`,{headers:this.headers});

}

nuevoPais(pais: PaisesModel):Observable<any>{

  let json = JSON.stringify(pais);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    });
  return this.http.post(`${this.url}/pais`,params,{headers:headersN})
 
    
  };

actualizarPais(pais: PaisesModel){
  
    let json = JSON.stringify(pais);
    let params = "json="+ json;
    let headersN = new HttpHeaders({
    'token':`${this.userToken}`,
    'Content-Type': "application/x-www-form-urlencoded"
    });
    return this.http.put(`${this.url}/pais/${pais.paisId}`,params,{headers:headersN});

    }

obtenerDepartamentos(){
  
  return this.http.get(`${this.url}/departamentos`,{headers:this.headers});
}

obtenerDepartamentosItem(item:String){

  return this.http.get(`${this.url}/departamento/${item}`,{headers:this.headers});

}

nuevoDepartamento(departamento: DepartamentosModel):Observable<any>{

  let json = JSON.stringify(departamento);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    });
  return this.http.post(`${this.url}/departamentos`,params,{headers:headersN})
 
    
  };

actualizarDepartamento(departamento: DepartamentosModel){
  
    let json = JSON.stringify(departamento);
    let params = "json="+ json;
    let headersN = new HttpHeaders({
    'token':`${this.userToken}`,
    'Content-Type': "application/x-www-form-urlencoded"
    });
    return this.http.put(`${this.url}/departamentos/${departamento._id}`,params,{headers:headersN});

    }

obtenerMunicipios(dpto:String){
  
  return this.http.get(`${this.url}/municipioDpto/${dpto}`,{headers:this.headers});
}

obtenerMunicipiosItem(item:String){

  return this.http.get(`${this.url}/municipioItem/${item}`,{headers:this.headers});

}

nuevoMunicipio(municipio: MunicipiosModel):Observable<any>{

  let json = JSON.stringify(municipio);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    });
  return this.http.post(`${this.url}/municipios`,params,{headers:headersN})
 
    
  };

actualizarMunicipio(municipio: MunicipiosModel){

    let json = JSON.stringify(municipio);
    let params = "json="+ json;
    let headersN = new HttpHeaders({
    'token':`${this.userToken}`,
    'Content-Type': "application/x-www-form-urlencoded"
    });
    return this.http.put(`${this.url}/municipios/${municipio.municipioId}`,params,{headers:headersN});

    }

obtenerUser(nit:String){

  return this.http.get(`${this.url}/user/buscar/${nit}`,{headers:this.headers})

}

obtenerListadoUsers(){

  return this.http.get(`${this.url}/user`,{headers:this.headers})

}

nuevoUser(user: UserModel):Observable<any>{

  let json = JSON.stringify(user);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    });
  return this.http.post(`${this.url}/user`,params,{headers:headersN})
 
    
  };

actualizarUser(user: UserModel):Observable<any>{

    let json = JSON.stringify(user);
    let params = "json="+ json;
    let headersN = new HttpHeaders({
        'token':`${this.userToken}`,
        'Content-Type': "application/x-www-form-urlencoded"
      });
    return this.http.put(`${this.url}/user/${user.usuaNumeroIdentificacion}`,params,{headers:headersN});
   
      
    };
    
eliminarUser(user: UserModel){


     return this.http.delete(`${this.url}/user/${user.usuaNumeroIdentificacion}`,{headers:this.headers});
    }
nuevoContraparte(user: UserModel):Observable<any>{

      let json = JSON.stringify(user);
      let params = "json="+ json;
      let headersN = new HttpHeaders({
          'token':`${this.userToken}`,
          'Content-Type': "application/x-www-form-urlencoded"
        });
      return this.http.post(`${this.url}/contraparte`,params,{headers:headersN})
     
        
      };

obtenerTermino(termino: string){
        return this.http.get(`${this.url}/user/buscarR/${termino}`,{headers:this.headers})
      }

obtenerContraparte(user: UserModel):Observable<any>{

       
        let headersN = new HttpHeaders({
            'token':`${this.userToken}`,
            'Content-Type': "application/x-www-form-urlencoded"
          });
        return this.http.get(`${this.url}/contraparte/${user._id}`,{headers:headersN});
       
          
        };

obtenerContraparteId(id:string):Observable<any>{

          let headersN = new HttpHeaders({
              'token':`${this.userToken}`,
              'Content-Type': "application/x-www-form-urlencoded"
            });
          return this.http.get(`${this.url}/contraparte/${id}`,{headers:headersN});
         
            
          };

obtenerContrapartes(){
        return this.http.get(`${this.url}/contraparte`,{headers:this.headers})
      }
        
actualizarContraparte(contraparte: ContraparteModel){
  
      let json = JSON.stringify(contraparte);
      let params = "json="+ json;
      let headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
      });
      return this.http.put(`${this.url}/contraparte/${contraparte.contNumeroIdentificacion}`,params,{headers:headersN});
  

      }

eliminarContraparte(contraparte: ContraparteModel){

  let json = JSON.stringify(contraparte);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
  'token':`${this.userToken}`,
  'Content-Type': "application/x-www-form-urlencoded"
  });

      return this.http.put(`${this.url}/contraparteE/${contraparte.contNumeroIdentificacion}`,params,{headers:headersN});
     }

obtenerCargos(){
    return this.http.get(`${this.url}/cargos`,{headers:this.headers})
    }

obtenerCargosItem(item:Number){
      return this.http.get(`${this.url}/cargos/${item}`,{headers:this.headers})
      }

nuevoCargo(cargo: CargosModel):Observable<any>{

      let json = JSON.stringify(cargo);
      let params = "json="+ json;
      let headersN = new HttpHeaders({
          'token':`${this.userToken}`,
          'Content-Type': "application/x-www-form-urlencoded"
        });
      return this.http.post(`${this.url}/cargos`,params,{headers:headersN})
     
        
      };

actualizarCargo(cargo: CargosModel){
  
        let json = JSON.stringify(cargo);
        let params = "json="+ json;
        let headersN = new HttpHeaders({
        'token':`${this.userToken}`,
        'Content-Type': "application/x-www-form-urlencoded"
        });
        return this.http.put(`${this.url}/cargos/${cargo.cargoId}`,params,{headers:headersN});
    
  
        }

obtenerRepresentantes(idContraparte: string):Observable<any>{

            return this.http.get(`${this.url}/representante/${idContraparte}`,{headers:this.headers})
            
    };

obtenerUserRepresentantes(idUser: string):Observable<any>{

      return this.http.get(`${this.url}/representante/User/${idUser}`,{headers:this.headers})
      };

nuevoRepresentante(representante: RepresentanteModel):Observable<any>{

      let json = JSON.stringify(representante);
      let params = "json="+ json;
      let headersN = new HttpHeaders({
          'token':`${this.userToken}`,
          'Content-Type': "application/x-www-form-urlencoded"
        });
      return this.http.post(`${this.url}/representante`,params,{headers:headersN})
             
      };



actualizarRepresentante(id:string){

  let json = JSON.stringify(id);
  let params = "json="+ json;
  let headersN = new HttpHeaders({
    'token':`${this.userToken}`,
    'Content-Type': "application/x-www-form-urlencoded"
    });

    return this.http.put(`${this.url}/representante/${id}`,params,{headers:headersN});

  }


eliminarRepresentante(id:string){

        return this.http.delete(`${this.url}/representante/${id}`,{headers:this.headers});
        }

obtenerEjecutivosTrue(){
          return this.http.get(`${this.url}/ejecutivoTrue`,{headers:this.headers})
  
        }

obtenerEjecutivos(){
        return this.http.get(`${this.url}/ejecutivo`,{headers:this.headers})

      }

obtenerEjecutivosItem(item:Number){
        return this.http.get(`${this.url}/ejecutivos/${item}`,{headers:this.headers})
        }

nuevoEjecutivo(ejecutivo: EjecutivosModel):Observable<any>{

          let json = JSON.stringify(ejecutivo);
          let params = "json="+ json;
          let headersN = new HttpHeaders({
              'token':`${this.userToken}`,
              'Content-Type': "application/x-www-form-urlencoded"
            });
          return this.http.post(`${this.url}/ejecutivo`,params,{headers:headersN})
         
            
          };

actualizarEjecutivo(ejecutivo: EjecutivosModel){
  
            let json = JSON.stringify(ejecutivo);
            let params = "json="+ json;
            let headersN = new HttpHeaders({
            'token':`${this.userToken}`,
            'Content-Type': "application/x-www-form-urlencoded"
            });
            return this.http.put(`${this.url}/ejecutivo/${ejecutivo.ejecutivoId}`,params,{headers:headersN});
        
      
            }

obtenerTipoSolicitud(){
        return this.http.get(`${this.url}/tipoSolicitud`,{headers:this.headers})

      }

obtenerTiposSolicitudItem(item:Number){
        return this.http.get(`${this.url}/tiposSolicitud/${item}`,{headers:this.headers})
    }

nuevoTipoSolicitud(tipoSolicitud: TipoSolicitudModel):Observable<any>{

      let json = JSON.stringify(tipoSolicitud);
      let params = "json="+ json;
      let headersN = new HttpHeaders({
          'token':`${this.userToken}`,
          'Content-Type': "application/x-www-form-urlencoded"
        });
      return this.http.post(`${this.url}/tipoSolicitud`,params,{headers:headersN})
     
        
      };

actualizarTipoSolicitud(tipoSolicitud: TipoSolicitudModel){
  
        let json = JSON.stringify(tipoSolicitud);
        let params = "json="+ json;
        let headersN = new HttpHeaders({
        'token':`${this.userToken}`,
        'Content-Type': "application/x-www-form-urlencoded"
        });
        return this.http.put(`${this.url}/tipoSolicitud/${tipoSolicitud.tipoSolicitudId}`,params,{headers:headersN});
    
  
        }

obtenerEstados(){
        return this.http.get(`${this.url}/estados`,{headers:this.headers})

      }

obtenerEstadosItem(item:Number){
        return this.http.get(`${this.url}/estadoss/${item}`,{headers:this.headers})
        }

nuevoEstado(estado: EstadosModel):Observable<any>{

          let json = JSON.stringify(estado);
          let params = "json="+ json;
          let headersN = new HttpHeaders({
              'token':`${this.userToken}`,
              'Content-Type': "application/x-www-form-urlencoded"
            });
          return this.http.post(`${this.url}/estados`,params,{headers:headersN})
         
            
          };

actualizarEstado(estado: EstadosModel){
  
            let json = JSON.stringify(estado);
            let params = "json="+ json;
            let headersN = new HttpHeaders({
            'token':`${this.userToken}`,
            'Content-Type': "application/x-www-form-urlencoded"
            });
            return this.http.put(`${this.url}/estados/${estado.estadoId}`,params,{headers:headersN});
        
      
            }


obtenerCausales(){
        return this.http.get(`${this.url}/causales`,{headers:this.headers})

      }

obtenerCausalItem(item:Number){
        return this.http.get(`${this.url}/causales/${item}`,{headers:this.headers})
        }

nuevoCausal(causal: CausalesModel):Observable<any>{

        let json = JSON.stringify(causal);
        let params = "json="+ json;
        let headersN = new HttpHeaders({
            'token':`${this.userToken}`,
            'Content-Type': "application/x-www-form-urlencoded"
          });
        return this.http.post(`${this.url}/causales`,params,{headers:headersN})
       
          
        };
      
actualizarCausal(causal: CausalesModel){
  
          let json = JSON.stringify(causal);
          let params = "json="+ json;
          let headersN = new HttpHeaders({
          'token':`${this.userToken}`,
          'Content-Type': "application/x-www-form-urlencoded"
          });
          return this.http.put(`${this.url}/causales/${causal.causalId}`,params,{headers:headersN});
      
    
          }

obtenerSolicitudes(idContraparte: string):Observable<any>{
      
          return this.http.get(`${this.url}/solicitudes/${idContraparte}`,{headers:this.headers})

      };

obtenerSolicitudesConsulta(idEstado: string, desde?: number):Observable<any>{
      
        return this.http.get(`${this.url}/solicitudes/estado/${idEstado}?desde=${desde}`,{headers:this.headers})

    };

obtenerSolicitud(idSolicitud: string):Observable<any>{
      
        return this.http.get(`${this.url}/solicitud/${idSolicitud}`,{headers:this.headers})
      };

nuevaSolicitud(solicitud:SolicitudModel):Observable<any>{

        let json = JSON.stringify(solicitud);
        let params = "json="+ json;
        let headersN = new HttpHeaders({
            'token':`${this.userToken}`,
            'Content-Type': "application/x-www-form-urlencoded"
          });
        return this.http.post(`${this.url}/solicitud`,params,{headers:headersN})
               
        };

actualizarSolicitud(solicitud:SolicitudModel){
  
          let json = JSON.stringify(solicitud);
          let params = "json="+ json;
          let headersN = new HttpHeaders({
          'token':`${this.userToken}`,
          'Content-Type': "application/x-www-form-urlencoded"
          });
          return this.http.put(`${this.url}/solicitud/${solicitud.soliConsecutivo}`,params,{headers:headersN});
      
    
          }

eliminarSolicitud(id:string){

            return this.http.delete(`${this.url}/solicitud/${id}`,{headers:this.headers});
          }

leerToken(){

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
     return this.userToken;
  
    }



}


