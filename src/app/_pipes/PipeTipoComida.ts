import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterTipoComida',
    pure: false
})
export class FilterTipoComida implements PipeTransform {
    transform(items: any[], restaurante: string, estado: string): any {
        if (!items || !restaurante|| !estado) {
            return items.filter(item => item['ESTADO'] == estado)
        }
        return items.filter(item => 
            item['DESCRIPCION_TIPO_COMIDA'].toUpperCase().includes(restaurante.toUpperCase())
        );
    }
}