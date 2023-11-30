import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

 loadingCTRL = inject(LoadingController)
 router = inject(Router)
 toast = inject(ToastController)

  loading(){
    return this.loadingCTRL.create({spinner: 'crescent'})
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toast.create(opts);
    toast.present();
  }

  RouterLink(url:string){
    return this.router.navigateByUrl(url);
  }

  guardarEnStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  obtenerElStorage(key: string){ 
    return  localStorage.getItem(key)
  }
   
  
}
