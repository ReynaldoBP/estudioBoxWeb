import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterEncuesta',
    pure: false
})
export class FilterEncuesta implements PipeTransform {
    transform(items: any[], strEmpresa: string): any {
        if (!items || !strEmpresa) {
            return items;
        }
        return items.filter(item =>
            item['strEmpresa'].toUpperCase().includes(strEmpresa.toUpperCase())
        );
    }
}