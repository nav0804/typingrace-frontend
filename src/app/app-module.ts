import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { SnackbarShared } from './shared/components/snackbar/snackbar';
import { SnackBarService } from './core/services/snackbar.service';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NavbarComponent,
    SnackbarShared,
  ],
  providers: [SnackBarService],
  bootstrap: [App],
})
export class AppModule {}
