import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { VacaService } from 'app/services/vaca.service';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { VacaComponent } from './vaca.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    VacaComponent,
  ],
  providers: [VacaService],

})
export class VacaModule { }
