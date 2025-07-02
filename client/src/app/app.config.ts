import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn ) => {
  let clonedReq = req;

  // Lógica para a API de CNPJ (token fixo)
  // Substitua 'SUA_URL_DA_API_CNPJ' pela URL base real da sua API de CNPJ
  if (req.url.includes('https://receitaws.com.br')) {
    const cnpjToken = '5127a36571723e23134014797dadb582050824d303a79ffba8689ef0ded84984'; // Seu token fixo para a API de CNPJ
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${cnpjToken}`
      }
    });
  } 
  // Lógica para o seu Backend Node.js (JWT do localStorage)
  // Substitua 'backend-node-production-028a.up.railway.app' pela URL base real do seu backend
  //else if (req.url.includes('https://backend-node-production-028a.up.railway.app')) {
      else if (req.url.includes('http://localhost:3000')) {
    let jwtToken = localStorage.getItem('Authorization'); 
    if (jwtToken) {
      clonedReq = req.clone({
        setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
          // Se você ainda precisar do authorization_token por algum motivo, adicione aqui
          // 'authorization_token': jwtToken 
        }
      });
    }
  }
  return next(clonedReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([TokenInterceptor])),
    provideEnvironmentNgxMask(), 
    provideAnimationsAsync()
  ]
};
