import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { PoliticaPrivacidadeComponent } from '../pages/politica-privacidade/politica-privacidade.component';
import { TrabalheConoscoComponent } from '../pages/trabalhe-conosco/trabalhe-conosco.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'politica-privacidade',
    component: PoliticaPrivacidadeComponent,
  },
  {
    path: 'trabalhe-conosco',
    component: TrabalheConoscoComponent,
  },
];
