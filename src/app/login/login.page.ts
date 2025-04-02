import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { 
  IonContent, IonToolbar, IonLabel, IonInput, IonButton, IonItemDivider, IonInputPasswordToggle, ToastController, IonSpinner 
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonToolbar, CommonModule, FormsModule, IonLabel, IonInput, IonButton, IonItemDivider, IonInputPasswordToggle, IonSpinner
  ]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false; //variável para controlar o estado de carregamento

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toastController: ToastController 
  ) {}
  
  async handleLogin(form: NgForm) {
    if (form.invalid) {
      await this.presentToast('Preencha todos os campos');
      return;
    }
  
    this.loading = true;
    
    try {
      const { error } = await this.supabase.signInWithEmail(this.email, this.password);
      if (error) throw error;
      await this.router.navigate(['/main']);
    } catch (error: any) {
      await this.presentToast(error.message || 'Erro no login');
    } finally {
      this.loading = false;
    }
  }

  async loginWithProvider(provider: 'google' | 'facebook') {
    this.loading = true;
    try {
      const { error } = await this.supabase.signInWithOAuth(provider);
      if (error) throw error;
      await this.router.navigate(['/main']);
    } catch (error: any) {
      await this.presentToast(error.message);
    } finally {
      this.loading = false;
    }
  }
 
  async loginWithGoogle() {
    await this.loginWithProvider('google');
  }
  
  async loginWithFacebook() {
    await this.loginWithProvider('facebook');
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
