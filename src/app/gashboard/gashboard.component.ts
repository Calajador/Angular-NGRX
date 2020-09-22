import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-gashboard',
  templateUrl: './gashboard.component.html',
  styles: [
  ]
})
export class GashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription

  constructor(private store: Store<AppState>,
              private _ingresos: IngresoEgresoService) { }

  ngOnInit(): void {

   this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
      .subscribe(({user}) => {
        console.log(user);
        this._ingresos.initIngresosEgresosListen(user.uid)
          .subscribe((ingresosEgresosFB: any) => {
            
            this.store.dispatch(setItems({items: ingresosEgresosFB}))
          })
      });
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
  }

}
