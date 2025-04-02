import { Component,OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SupabaseService } from './services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  
  async ngOnInit() {
    const { data: { session } } = await this.supabase.getSession();
    await this.router.navigate([session ? '/main' : '/home']);
  }
}
