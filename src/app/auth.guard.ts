import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';




export const authGuard: CanActivateFn = () => {
  
  const router = inject(Router);

  const token = localStorage.getItem('token');

  
    const userId = localStorage.getItem('user_id');

    // if (userId) {
    //       return true; 
    //     } else {
    //       router.navigate(['/login']); 
    //       return false;
    //     }
    if(!token){
      router.navigateByUrl('/login')
      return false
     
    }
    else{
      return true
    }
      
    }
