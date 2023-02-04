import { NgModule, ModuleWithProviders, forwardRef } from '@angular/core';
import { SafePipe } from './SafePipe';

@NgModule({
  declarations: [
      SafePipe
  ],
  exports: [
      SafePipe
  ]
})
export class SharingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharingModule,
      providers: [ forwardRef(() => SafePipe) ]
    };
  }
}