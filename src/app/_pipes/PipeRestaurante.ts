import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterRestaurante',
    pure: false
})
export class FilterRestaurante implements PipeTransform {
    transform(items: any[], restaurante: string, estado: string): any {
        if (!items || !estado || !restaurante) {
            return items.filter(item => item['ESTADO'] == estado)
        }
        return items.filter(item =>
            item['NOMBRE_COMERCIAL'].toUpperCase().includes(restaurante.toUpperCase()) ||
            item['RAZON_SOCIAL'].toUpperCase().includes(restaurante.toUpperCase()) ||
            item['IDENTIFICACION'].toUpperCase().includes(restaurante.toUpperCase()) ||
            item['REPRESENTANTE_LEGAL'].toUpperCase().includes(restaurante.toUpperCase())
        );
    }
}