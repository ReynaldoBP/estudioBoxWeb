import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterClienteMovil',
    pure: false
})
export class FilterClienteMovil implements PipeTransform {
    transform(items: any[], strNombre: string, strEstado: string): any {
        if (!items || !strEstado || !strNombre ) {
            return items.filter(item => item['strEstado'] == strEstado)
        }
        return items.filter(item =>
            item['strNombre'].toUpperCase().includes(strNombre.toUpperCase())
        );
    }
}