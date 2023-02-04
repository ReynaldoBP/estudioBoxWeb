import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterClienteMovil',
    pure: false
})
export class FilterClienteMovil implements PipeTransform {
    transform(items: any[], strNombre: string, strEstado: string, strTipoClt: string): any {
        if (!items || !strEstado || !strNombre || !strTipoClt) {
            return items.filter(item => item['ESTADO'] == strEstado && item['TIPO_CLIENTE'] == strTipoClt)
        }
        return items.filter(item =>
            item['NOMBRE_COMPLETO'].toUpperCase().includes(strNombre.toUpperCase())
        );
    }
}