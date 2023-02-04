import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Pipe({
    name: 'getEdad',
    pure: false
})
export class PipeEdad implements PipeTransform {
    transform(date) {
            let d:any = new Date();
            let e:any = new Date(date);
            return Math.floor((d-e)/1000/60/60/24/365)
    }
}