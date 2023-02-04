import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterRedimirCupon',
    pure: false
})
export class FilterRedimirCupon implements PipeTransform {
    transform(items: any[], strNombre: string, strEstado: string): any {
        if (!items || !strEstado || !strNombre) {
            return items.filter(item => item['ESTADO'] == strEstado)
        }
        return items.filter(item =>
            item['NOMBRE_COMPLETO'].toUpperCase().includes(strNombre.toUpperCase()) ||
            item['CUPON'].toUpperCase().includes(strNombre.toUpperCase())
        );
    }
}