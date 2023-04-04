import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterDataEncuesta',
    pure: false
})
export class FilterDataEncuesta implements PipeTransform {
    transform(items: any[], estado: string): any {
        return items.filter(item =>
            item['strEstado'] == estado
        );

    }
}