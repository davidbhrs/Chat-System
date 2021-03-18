import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { PopUpLogoutComponent } from './pop-up-logout/pop-up-logout.component';
import { PopUpNewChatComponent } from './pop-up-new-chat/pop-up-new-chat.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: PopUpNewChatComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
