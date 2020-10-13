import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(isPromise: boolean) {
    if (isPromise) {
      return this.getUsers('employee', true);
    }
    return from(this.getUsers('employee', true));
  }

  getAllAdminUsers(isPromise: boolean) {
    if (isPromise) {
      return this.getUsers('admin', true);
    }
    return from(this.getUsers('admin', true));
  }

  async getUsers(type?: string, filter?: boolean) {
    const users = await this.usersRepository.findByQuery(null);
    if (!filter) {
      return users;
    }
    return users.filter(user => user.role.type === type);
  }

  get(id: string, query?): Observable<any> {
    return from(this.usersRepository.findOne(id, query)).pipe(
      mergeMap(response => {
        return of(response);
      }),
    );
  }

  create(params: Users): Observable<any> {
    let selectedUser: any;
    return from(this.usersRepository.find()).pipe(
      mergeMap(response => {
        if (!response) {
          return of({
            success: false,
            message: 'error occurred when retrieved data',
          });
        }

        const users = response;
        const newParams: any = params;
        selectedUser = users.find(user => newParams.username === user.username);
        return of(newParams);
      }),
      mergeMap(response => {
        if (!response.success && response.message) {
          return of(response);
        }
        if (selectedUser) {
          return of({
            success: false,
            message: 'username or email is already exist',
          });
        }
        return from(this.usersRepository.save(response));
      }),
    );
  }

  update(id, body, isPromise?) {
    if (isPromise) {
      return this.usersRepository.update(id, body);
    }
    return from(this.usersRepository.update(id, body)).pipe(
      mergeMap(response => {
        if (
          !response ||
          !response.raw ||
          response.raw.affectedRows === 0 ||
          response.raw.changedRows === 0
        ) {
          return of({
            success: false,
            message: 'error occurred when updated the data',
          });
        }

        return of({
          success: true,
          message: `user with ID ${id} successfully updated!`,
        });
      }),
    );
  }

  async updatePassword(body): Promise<any> {
    return this.usersRepository
      .find()
      .then(async response => {
        if (!response) {
          return {
            success: false,
            message: 'error occurred when retrieved data',
          };
        }

        const users = response;
        const selectedUser = users.find(
          user => body.username === user.username,
        );

        if (!selectedUser) {
          return {
            success: false,
            message: 'error occurred when updated the password',
          };
        }

        const result = await new Promise(function(resolve, reject) {
          bcrypt.compare(body.currentPassword, selectedUser.password, function(
            err,
            result,
          ) {
            if (err) reject(err);
            resolve(result);
          });
        });

        if (result === false) {
          return of({
            success: false,
            message: 'invalid current password',
          });
        }

        if (body.currentPassword) {
          delete body.currentPassword;
        }

        return this.update(selectedUser.id, body, true);
      })
      .catch(err => {
        return err;
      });
  }
}
