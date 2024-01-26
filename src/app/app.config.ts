import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import {AppComponent} from "./app.component";
import {TestPageComponent} from "./test-page/test-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {LogoutComponent} from "./logout/logout.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {SpecialComponent} from "./special/special.component";
import { provideAnimations } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: "test-page", component: TestPageComponent},
  { path: "login-page", component: LoginPageComponent},
  { path: "logout", component: LogoutComponent},
  { path: "mainpage", component: MainpageComponent},
  { path: "special", component: SpecialComponent},
  { path: "**", component: LogoutComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations()]
};
