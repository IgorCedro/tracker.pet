import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
 IonToolbar, IonContent, IonButton, IonSearchbar, IonFooter, IonApp, IonIcon, IonLabel,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle 
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonToolbar, IonContent,
    IonButton, IonSearchbar, IonFooter, IonApp, IonIcon, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle
  ]
})
export class MainPage {
  user: User | null = null; // Importar tipo User do supabase

  constructor(private supabase: SupabaseService, private router: Router) {
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

  currentTab: string = 'main'; // Define a aba inicial

  setActiveTab(tab: string, route: string = '') {
    console.log('Navigating to:', route); // Debug
    this.currentTab = tab;
    if (route) {
      this.router.navigateByUrl(route, {
      }).then(() => {
        console.log('Navigation complete');
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    }
  }

}