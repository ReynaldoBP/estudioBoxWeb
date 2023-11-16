import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPublicidad',
    pure: false
})
export class PipePublicidad implements PipeTransform {
    transform(items: any[],descripcion:string, estado: string): any {
        if (!items || !estado || !descripcion) {
            return items.filter(item => item['ESTADO'] == estado)
        }
        return items.filter(item => 
            item['TITULO'].toUpperCase().includes(descripcion.toUpperCase()) &&
            item['ESTADO'] == estado
        );
    }
}