import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Example: email-based admin check
  isAdmin(): boolean {
    const userEmail = localStorage.getItem('userEmail');

    // 🔐 your admin email
    return userEmail === 'sathishd531@gmail.com';
  }
}
