import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonButton, IonSearchbar, IonFooter, IonApp, IonIcon, IonLabel,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSkeletonText  } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.page.html',
  styleUrls: ['./services-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, CommonModule, FormsModule, IonButton, IonSearchbar, IonFooter, IonApp, IonIcon, IonLabel,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSkeletonText ]
})
export class ServicesPagePage implements OnInit {
  userLocation = 'Carregando...';
  isLoadingLocation = true;

  constructor(private geolocationService: GeolocationService, private router: Router)  {}

  async ngOnInit() {
    this.userLocation = await this.geolocationService.getCurrentCity();
    this.isLoadingLocation = false;
  }

  async refreshLocation() {
    this.isLoadingLocation = true;
    this.userLocation = await this.geolocationService.getCurrentCity();
    this.isLoadingLocation = false;
  }

  currentTab: string = 'services-page';

  setActiveTab(tab: string, route: string = '') {
    this.currentTab = tab;
    if (route) {
      this.router.navigateByUrl(route);
    }
  }

}
