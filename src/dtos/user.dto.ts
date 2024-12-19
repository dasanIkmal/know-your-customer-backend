export class UserDto {
  name: string;
  email: string;
  role: string;

  constructor(user: any) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}
