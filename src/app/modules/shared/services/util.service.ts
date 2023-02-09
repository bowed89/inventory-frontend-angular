import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private keyCloakService: KeycloakService
  ) { }

  getRoles() {
    return this.keyCloakService.getUserRoles();
  }

  isAdmin(): Boolean {
    let roles = this.keyCloakService.getUserRoles().filter(role => role === "admin");
    let flag;
    roles.length > 0 ? flag = true : flag = false;
    return flag;
  }
}
