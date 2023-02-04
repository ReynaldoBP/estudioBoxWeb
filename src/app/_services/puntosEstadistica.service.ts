import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class PuntosEstadisticaService {
    constructor(private http: HttpClient, private globals: Globals) { }
}
