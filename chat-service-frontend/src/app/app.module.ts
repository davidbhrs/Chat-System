import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { PopUpLogoutComponent } from './pop-up-logout/pop-up-logout.component';
import { PopUpNewChatComponent } from './pop-up-new-chat/pop-up-new-chat.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PopUpLogoutComponent,
    PopUpNewChatComponent,
    ChatRoomListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
