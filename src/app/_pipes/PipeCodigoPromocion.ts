import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroCodigoPromocion',
    pure: false
})
export class PipeCodigoPromocion implements PipeTransform {
    transform(items: any[],estado:string): any {
        if (!items || !estado)
        {
            return items.filter(item => item['ESTADO'] == estado)
        }
        return items.filter(item => 
            item['ESTADO'] == estado
        );
    }
}