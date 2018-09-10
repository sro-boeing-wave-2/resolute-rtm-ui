import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatChipsModule, MatCardModule } from '@angular/material'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ng2-avatar';

import { AppComponent } from './app.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { InfoFormComponent } from './info-form/info-form.component';
import { MessageTextComponent } from './message-text/message-text.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageBoxComponent,
    InfoFormComponent,
    MessageTextComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    AvatarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
