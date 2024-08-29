import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'byModuloUsuarioAccion',
    pure: false
})
export class FilterUsuarioModulo implements PipeTransform {
    transform(items: any[], idmoduloaccion: string,idusuario:string): any {
        if (!items || !idmoduloaccion || !idusuario) {
            return items;
        }
        return items.filter(item => 
            item['ID_MODULO_ACCION'] == idmoduloaccion && 
            item['ID_USUARIO'] == idusuario
        );
    }
}

@Pipe({
    name: 'byRol',
    pure: false
})
export class FilterRol implements PipeTransform {
    transform(items: any[], idrol: string): any {
        if (!items || !idrol) {
            return items;
        }
        return items.filter(item => 
            item['TIPO_ROL_ID'] == idrol 
        );
    }
}

@Pipe({
    name: 'byUsuario',
    pure: false
})
export class FilterUsuario implements PipeTransform {
    transform(items: any[], usuario: string): any {
        if (!items || !usuario) {
            return items;
        }
        return items.filter(item => 
            item['strNombre'].toUpperCase().includes(usuario.toUpperCase()) ||
            item['strApellido'].toUpperCase().includes(usuario.toUpperCase())
        );
    }
}

@Pipe({
    name: 'filterAccionByModulo',
    pure: false
})
export class FilterAccionByModulo implements PipeTransform {
    transform(items: any[], idmodulo: string): any {
        if (!items || !idmodulo) {
            return items;
        }
        return items.filter(item => item['ID_MODULO'] == idmodulo);
    }
}
