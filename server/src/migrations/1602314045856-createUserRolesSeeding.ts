import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class createUserRolesSeeding1602314045856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles"("name", "type") VALUES ('Administrator', 'admin'), ('Employee', 'employee')`,
    );

    const role = await queryRunner.query(
      `SELECT * from "roles" WHERE "type" = 'admin'`,
    );

    if (role && role.length > 0) {
      let hashedPassword;
      await bcrypt.hash('change_me', 10).then(function(hash) {
        hashedPassword = hash;
      });
      await queryRunner.query(`INSERT INTO "users"(
            "firstName", "lastName", "username", "password",
            "isActive", "roleId")
            VALUES ('System', 'Administrator', 'admin', '${hashedPassword}', 
            true, '${role[0].id}')
            `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
