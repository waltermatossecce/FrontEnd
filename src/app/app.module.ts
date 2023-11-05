import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule }from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import localeEs from '@angular/common/locales/es';


//Angular material
import {MatIconModule} from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule }  from '@angular/material/button';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
    
    
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
