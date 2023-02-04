import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCliente',
    pure: false
})
export class FilterCliente implements PipeTransform {
    transform(items: any[], buscar: string): any {
        if (!items || !buscar) {
            return items;
        }
        return items.filter(item => 
            item['NOMBRE'].toUpperCase().includes(buscar.toUpperCase()) ||
            item['CORREO'].toUpperCase().includes(buscar.toUpperCase()) 
        );
    }
}

@Pipe({
    name: 'totalClienteGenero',
    pure: false
})
export class PipeClienteTotalGenero implements PipeTransform {
    transform(items: any[], genero: string): any {
        if (!items || !genero) {
            return items;
        }
        return items.filter(item=> item.GENERO == genero)
                    .map(element => Number.parseInt(element.CANTIDAD))
                    .reduce(function(prev, current) {
                        return (prev+current)
                    },0)
    }
}