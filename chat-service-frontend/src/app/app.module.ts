import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PopUpLogoutComponent } from './pop-up-logout/pop-up-logout.component';
import { PopUpNewChatComponent } from './pop-up-new-chat/pop-up-new-chat.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatComponent } from './chat/chat.component';
import { PictureComponent } from './picture/picture.component';
import { PopUpLoginErrorMessageComponent } from './pop-up-login-error-message/pop-up-login-error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PopUpLogoutComponent,
    PopUpNewChatComponent,
    ChatRoomListComponent,
    ChatComponent,
    PictureComponent,
    PopUpLoginErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopUpNewChatComponent]
})
export class AppModule { }
