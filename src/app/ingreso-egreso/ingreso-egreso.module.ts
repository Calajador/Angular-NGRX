import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GashboardComponent } from '../gashboard/gashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboarsRoutesModule } from '../gashboard/dashboars-routes.module';

import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    GashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboarsRoutesModule
  ]
})
export class IngresoEgresoModule { }
