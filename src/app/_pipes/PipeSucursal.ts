import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSucursal',
    pure: false
})
export class FilterSucursal implements PipeTransform {
    transform(items: any[], objSucursal: string, strEstado: string): any {
        if (!items || !strEstado || !objSucursal) {
            return items.filter(item => item['ESTADO_FACTURACION'] == strEstado)
        }
        return items.filter(item =>
            item['DESCRIPCION'].toUpperCase().includes(objSucursal.toUpperCase()) ||
            item['RAZON_SOCIAL'].toUpperCase().includes(objSucursal.toUpperCase())
        );
    }
}