import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonMenu, IonList, IonItem, IonSearchbar, IonFooter, IonApp, IonIcon, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle 
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { User } from '@supabase/supabase-js';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonMenu, IonList, IonItem, IonSearchbar, IonFooter, IonApp, IonIcon, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
  ]
})
export class MainPage {
  user: User | null = null; // Importar tipo User do supabase

  constructor(private supabase: SupabaseService, private navCtrl: NavController) {
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
    this.currentTab = tab;
    if (route) {
      this.navCtrl.navigateForward(route);
    }
  }

}