import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterBitacora',
    pure: false
})
export class FilterBitacora implements PipeTransform {
    transform(items: any[], descripcion: string): any {
        if (!items || !descripcion) {
            return items;
        }
        return items.filter(item =>
            item['ACCION'].toUpperCase().includes(descripcion.toUpperCase())||
            item['MODULO'].toUpperCase().includes(descripcion.toUpperCase())||
            item['USUARIO'].toUpperCase().includes(descripcion.toUpperCase())||
            item['CORREO'].toUpperCase().includes(descripcion.toUpperCase())
        );
    }
}