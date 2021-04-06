import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";

@Injectable({
  providedIn:"root"
})
export class AuthService{
  private isAuthenticated = false;
  private token: string = "";
  private authStatusListener=new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData={email: email, password: password};
    this.http.post("http://localhost:3000/api/user/signup",authData)
    .subscribe(response=>{
      console.log(response);
      this.router.navigate(['/login']);
    },(error=>{
      alert("Ilyen emaillel már regisztráltak!");
    }));
  }



login(email: string, password: string){
  const authData: AuthData={email: email, password: password};
  this.http.post<{token: string}>("http://localhost:3000/api/user/login",authData)
  .subscribe(response=>{
    const token=response.token;
    this.token=token;
    if(token){
      this.isAuthenticated=true;
      this.authStatusListener.next(true);
      this.router.navigate(['/']);
    }
  },(error=>{
    alert("Hibás e-mail vagy jelszó!");
  }))
}


logout(){
  this.token="null";
this.isAuthenticated=false;
this.authStatusListener.next(false);
this.router.navigate(['/login']);
}

}
