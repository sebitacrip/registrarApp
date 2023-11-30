import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    clave: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required, Validators.minLength(4)]),
  })
  

  firebase = inject(FirebaseService);
  utils = inject(UtilsService)


  ngOnInit() {}

  async submit(){

    const loading = await this.utils.loading()
    await loading.present

    if(this.form.valid){
      this.firebase.registrar(this.form.value as User).then( res =>{
        this.utils.RouterLink('/auth')
        console.log(res);

      }).catch(error => {
        console.log(error);

        this.utils.presentToast({
          message: 'ingrese los datos correctamente, con almenos 6 caracteres en la contraseña',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(()=>{loading.dismiss()});
      
    }
    
  }



  
}
