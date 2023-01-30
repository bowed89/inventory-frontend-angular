import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmComponent,
  ],
  exports: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule, 
    FlexLayoutModule,
    HttpClientModule
  ]
})
export class SharedModule { }
