import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {
  
  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])
  })

  firebase = inject(FirebaseService);
  utils = inject(UtilsService)

  constructor() {}

  ngOnInit() {
  }
  async submit(){

    const loading = await this.utils.loading()
    await loading.present

    if(this.form.valid !== undefined){
    
      this.firebase.recuperarClave(this.form.value.email).then(res =>{
        console.log(res)
        this.utils.presentToast({
          message: 'correo enviado con exito :) ',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        this.utils.RouterLink('/auth')
        this.form.reset()
        
      }).catch(error => {
        console.log(error);

        this.utils.presentToast({
          message: 'error algo salio mal :(',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(()=>{loading.dismiss()});
      
    }
    
  }
}
