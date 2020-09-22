import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private _auth: AuthService) { }

  crearIngreso(ingresoEgreso: IngresoEgreso) {
    const uid = this._auth.user.uid;

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  initIngresosEgresosListen(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .valueChanges({ idField: 'uid' });
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this._auth.user.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete()
 }
}