import { Component,OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SupabaseService } from './services/supabase.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import * as ionicons from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    addIcons({
      'home': ionicons.homeOutline,
      'heart': ionicons.heartOutline,
      'time': ionicons.timeOutline,
      'person': ionicons.personOutline,
      'location': ionicons.locationOutline,
      'refresh': ionicons.refreshOutline
    });
  }

  
  async ngOnInit() { 
    const { data: { session } } = await this.supabase.getSession();
    this.supabase.authChanges((event, session) => {
      if (event === 'SIGNED_IN') {
        // Opcional: você pode adicionar lógica aqui se quiser
      }
    });
  }
}
