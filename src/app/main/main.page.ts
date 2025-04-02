import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonMenu, IonList, IonItem 
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonMenu, IonList, IonItem
  ]
})
export class MainPage {
  user: User | null = null; // Importar tipo User do supabase

  constructor(private supabase: SupabaseService) {
    this.loadUser();
  }

  async loadUser() {
    const { data: { user } } = await this.supabase.getUser();
    this.user = user;
  }

  async signOut() {
    try {
      await this.supabase.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}