import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const saltRounds = 10,
      val = value;
    let hashedPassword;
    await bcrypt.hash(value.password, saltRounds).then(function(hash) {
      hashedPassword = hash;
    });
    val.password = hashedPassword;
    return val;
  }
}
