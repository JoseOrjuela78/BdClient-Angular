import * as moment from 'moment';
export class ViabilidadModel {
    
    viabConsecutivo: String = '0';

    viabFecha: any =  moment().format('YYYY-MM-DD');;

    IdEjecutivo: String;

    tipoIdentificacion: String;

    viabNumeroIdentificacion: string;

    viabRazonSocial: string;

    viabFechaMatricula: any = '';

    viabAnoRenovado: Number;

    viabEnRiesgo: Boolean;

    viabExisteEpicor: Boolean = false;

    viabActualizado: Boolean = false; 

    viabCupoActual: String = '0'; 

    viabCupoAsignado: String  ='0'; 

    viabViable: Boolean = false;

    viabComentariosViabilidad: string =" Sin comentarios";

    viabComentariosListas: String =" Sin comentarios";

    viabCIIU:String = '';

    viabRevisado: Boolean = false;

    viabResponsableEpicor: String = 'No Aplica';

    viabNombreEjecutivo: String = '';
       
    }