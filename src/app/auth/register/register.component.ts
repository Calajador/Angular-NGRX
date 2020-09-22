import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
     private _auth: AuthService,
     private router: Router,
     private store: Store<AppState>) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {

    if(this.registroForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
        
    //   }
    // });
    
    const {nombre, correo, password} = this.registroForm.value

    this._auth.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }
    
  

}