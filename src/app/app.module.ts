import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// electron
// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PresentationPageComponent } from './pages/presentation-page/presentation-page.component';
import { MarkdownToHtmlPipe } from './pipes/markdown-to-html.pipe';
import {NgxElectronService} from "./services/ngx-electron/ngx-electron.service";
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        PresentationPageComponent,
        MarkdownToHtmlPipe,
        SanitizeHtmlPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [
        NgxElectronService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
