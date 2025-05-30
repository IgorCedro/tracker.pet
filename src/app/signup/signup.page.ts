import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { IonContent, IonLabel, IonInput, IonButton, IonInputPasswordToggle, IonItemDivider, ToastController, LoadingController} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,  IonLabel, IonInput, IonButton, IonInputPasswordToggle, IonItemDivider, RouterModule]
})
export class SignupPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  birthdate: string = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async handleSignup(form: NgForm) {
    if (form.invalid) return;
  
    const loading = await this.loadingController.create();
    await loading.present();
  
    try {
      const result = await this.supabase.signUpWithEmail(
        this.email,
        this.password,
        this.name,
        this.birthdate
      );
  
      if (result?.user) {
        await this.router.navigate(['/main']);
      }
    } catch (error: unknown) {
      let errorMessage = 'Erro no cadastro';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
  
      await this.presentToast(errorMessage);
    } finally {
      await loading.dismiss();
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }
  
  ngOnInit() {
  }

}
