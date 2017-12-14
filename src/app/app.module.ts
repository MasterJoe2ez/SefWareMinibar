import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CovalentHttpModule} from '@covalent/http';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import '../theme.scss';
import '../styles.scss';
import 'hammerjs';
import {HttpModule} from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ItemsComponent } from './main/items/items.component';
import { UsersComponent } from './main/users/users.component';
import { ReportsComponent } from './main/reports/reports.component';
import {ItemsService} from './shared/items.service';
import { ItemDialogComponent } from './main/items/item-dialog/item-dialog.component';
import {UserService} from './shared/user.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    ItemsComponent,
    UsersComponent,
    ReportsComponent,
    ItemDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireDatabaseModule,
    CovalentHttpModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [
    ItemsService,
    UserService
  ],
  entryComponents: [
    ItemDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
