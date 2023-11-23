import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular material
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule }  from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
