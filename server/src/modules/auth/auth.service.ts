import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUsers(username, password) {
    const user: any = await this.usersService.getUsers();
    return this._getSelectedUser(user, username, password);
  }

  private async _getSelectedUser(user, username, password) {
    const selectedUser = user.find(user => user.username === username);
    if (!selectedUser) {
      return null;
    }
    const match = await bcrypt.compare(password, selectedUser.password);
    return match ? selectedUser : null;
  }

  login(user: any): Observable<any> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role.type,
    };
    return of({
      user: user,
      accessToken: this.jwtService.sign(payload),
    });
  }
}
