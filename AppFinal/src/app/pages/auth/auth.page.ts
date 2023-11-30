import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    clave: new FormControl('',[Validators.required])
  })
  firebase = inject(FirebaseService);
  utils = inject(UtilsService)
  constructor( public router: Router){}
  ngOnInit() {
  }

  async submit(){

    const loading = await this.utils.loading()
    await loading.present

    if(this.form.valid){
      
      this.firebase.login(this.form.value as User).then(res =>{
        console.log(res)
      this.utils.RouterLink('/main/home')
      
        
        
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
