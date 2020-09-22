import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingrsoForm: FormGroup
  tipo: string = "ingreso"
  cargando: boolean = false;
  uiSubscription: Subscription;
 
  constructor(private fb: FormBuilder, private _ingresos: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.ingrsoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui')
                .subscribe( ui => {
                  this.cargando = ui.isLoading;
                });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  guardar() {

    
    setTimeout(() => {
    }, 2500);

    if(this.ingrsoForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());
    const {descripcion, monto} = this.ingrsoForm.value

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this._ingresos.crearIngreso(ingresoEgreso)
      .then(() => {
        this.ingrsoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro Creado', descripcion, 'success');
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
