import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { LoginComponent } from './login/login.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chats', component: ChatRoomListComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
