import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPromocion',
    pure: false
})
export class PipePromocion implements PipeTransform {
    transform(items: any[], descripcion: string, strTipoPromocion: string): any {
        if (!items || !descripcion || !strTipoPromocion) {
            return items.filter(item => item['TIPO_PROMOCION'].toUpperCase() == strTipoPromocion.toUpperCase())
        }
        return items.filter(item =>
            item['DESCRIPCION_TIPO_PROMOCION'].toUpperCase().includes(descripcion.toUpperCase()) ||
            item['NOMBRE_COMERCIAL'].toUpperCase().includes(descripcion.toUpperCase())
        );
    }
}