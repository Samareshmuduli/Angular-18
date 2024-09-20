
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  formPostUrl='http://localhost:2000/users/userspost';
 Url='http://localhost:2000/users/login';
 usersUrl='http://localhost:2000/users/register';
 useerIdUrl='http://localhost:2000/users/user_id/';
 blogIdUrl='http://localhost:2000/users/post/';
  GoogleUrl='http://localhost:2000/users/googleLogin';
  constructor(private http:HttpClient) { }
  loginUser(user:any): Observable<any> {
    console.log('user------ :', user);
      return this.http.post(this.Url, user);
    }
    
  
    saveUser(user:any): Observable<any> {
      
      console.log('user------ :', user);
        return this.http.post(this.usersUrl, user);
      }
   formSubmit(user:any): Observable<any> {

        console.log('user------ :', user);
          return this.http.post(this.formPostUrl,user);
        }
   getUserData(userId:any): Observable<any> {

          //  const uid:string|null;
           console.log('uid :', userId);
            return this.http.get(`${this.useerIdUrl}${userId}`);
          }    
  showdata(Id:any): Observable<any> {

            //  const uid:string|null;
             console.log('uid :', Id);
              return this.http.get(`${this.blogIdUrl}${Id}`);
            }    
  loginWithGoogle(user: any): Observable<any> {
              const googleLoginPayload = {
                email: user.email,
                name: user.name,
                provider: 'google'
              };
          console.log('==========123',googleLoginPayload)
              return this.http.post<any>(this.GoogleUrl, googleLoginPayload);
            }         
}
