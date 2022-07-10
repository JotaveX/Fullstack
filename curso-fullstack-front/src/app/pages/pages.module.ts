import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VacaModule } from './vaca/vaca.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    UserModule,
    VacaModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
