import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterBanner',
    pure: false
})
export class FilterBanner implements PipeTransform {
    transform(items: any[], descripcion: string): any {
        if (!items || !descripcion) {
            return items;
        }
        return items.filter(item =>
            item['strDescripcion'].toUpperCase().includes(descripcion.toUpperCase())
        );
    }
}