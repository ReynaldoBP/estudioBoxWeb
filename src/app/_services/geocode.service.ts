import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Location } from './location-model';

declare var google: any;

@Injectable()
export class GeocodeService {
  private geocoder: any;
  private lat:any
  private lng:any
  private latlng:any

  constructor(private mapLoader: MapsAPILoader) {}

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();    
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      return fromPromise(this.mapLoader.load())
      .pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(lat: string,lng:string): Observable<any> {
    this.lat = lat
    this.lng = lng
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.latlng = new google.maps.LatLng(this.lat, this.lng);
          this.geocoder.geocode({'location': this.latlng}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              let geolocation:any={
                pais:'',
                ciudad:'',
                provincia:'',
                parroquia:''
              }
              results.forEach(element => {
                if(element.types.find(item => item =='country')!= null){
                    geolocation.pais = element.address_components[0].long_name                    
                }
                if(element.types.find(item => item =='administrative_area_level_1')!= null){
                    geolocation.provincia = element.address_components[0].long_name                    
                }
                if(element.types.find(item => item =='administrative_area_level_2')!= null){
                    geolocation.ciudad = element.address_components[0].long_name                    
                }
                if(element.types.find(item => item =='administrative_area_level_3')!= null){
                    geolocation.parroquia = element.address_components[0].long_name                    
                }                    
              });
              observer.next(geolocation);
            } else {
                console.log('Error - ', results, ' & Status - ', status);
                observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        })        
      })
    )
  }
  
}