import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';


import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private _auth: AuthService,
              private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
                .subscribe( ui => {
                  this.cargando = ui.isLoading
                  console.log('Cargando Subs')
                });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
        
    //   }
    // });

    const {email, password} = this.loginForm.value;

    this._auth.loginUsuario(email, password)
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
