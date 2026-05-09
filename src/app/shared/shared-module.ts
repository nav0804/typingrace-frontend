import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loader } from './components/loader/loader';
import { NavbarComponent } from './components/navbar/navbar';

@NgModule({
  declarations: [Loader],
  imports: [CommonModule, NavbarComponent],
})
export class SharedModule {}
