import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// electron
import { NgxElectronModule } from './services/ngx-electron/ngx-electron.module';
// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PresentationPageComponent } from './pages/presentation-page/presentation-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        PresentationPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgxElectronModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
