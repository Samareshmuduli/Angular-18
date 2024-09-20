
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const examInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let mytoken: string | null = null;
  if (typeof localStorage !== 'undefined' && typeof sessionStorage !== 'undefined') {
    mytoken = localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  if (mytoken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${mytoken}` 
      },
    });
    return next(authReq);
  } else {
    return next(req);
  }
};