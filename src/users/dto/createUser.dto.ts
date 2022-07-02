import { AddressDto } from './Address.dto';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  address?: AddressDto;
}
