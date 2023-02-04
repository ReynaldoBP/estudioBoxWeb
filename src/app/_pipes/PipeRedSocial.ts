import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterRedSocial',
    pure: false
})
export class PipeRedSocial implements PipeTransform {
    transform(items: any[], buscar: string): any {
        if (!items || !buscar) {
            return items;
        }
        return items.find(item => 
            item['DESCRIPCION'] == buscar.toUpperCase()
        );
    }
}