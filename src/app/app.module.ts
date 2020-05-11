import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//ngx-mask Module
import { NgxMaskModule } from 'ngx-mask';

//Angular Specific
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; 
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

//Component Specific
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { HomeComponent } from './home/home.component';
import { PersonListComponent } from './person-list/person-list.component';
import { LoginComponent } from './login/login.component';
import { loginService } from './services/login.service';
import { ChartsComponent } from './charts/charts.component';
import { DiplomaComponent } from './diploma/diploma.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonDetailsComponent,
    HomeComponent,
    PersonListComponent,
    LoginComponent,
    ChartsComponent,
    DiplomaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,MatInputModule,MatTableModule,MatSelectModule,MatIconModule,
    MatFormFieldModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,MatSnackBarModule,
    HttpClientModule,
    ShowHidePasswordModule,
    FormsModule,ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    
  ],
  providers: [loginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
