import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterCupon',
    pure: false
})
export class FilterCupon implements PipeTransform {
    transform(items: any[], strDescripcion: string, strEstado: string): any {
        if (!items || !strEstado || !strDescripcion) {
            return items.filter(item => item['strEstado'] == strEstado)
        }
        return items.filter(item =>
            item['strDescripcion'].toUpperCase().includes(strDescripcion.toUpperCase())
        );
    }
}