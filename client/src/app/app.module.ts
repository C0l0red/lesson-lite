import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth/services/auth.service';

export function jwtOptionFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getAccessToken();
    },
    allowedDomains: ['localhost:3000'],
    disallowedRoutes: [
      'http://localhost:3000/api/auth/register',
      'http://localhost:3000/api/auth/login',
    ],
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AuthModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionFactory,
        deps: [AuthService],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
