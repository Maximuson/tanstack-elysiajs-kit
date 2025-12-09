import { UserEmail } from "./UserEmail";

export class User {
  constructor(
    public readonly id: string,
    public email: UserEmail,
    public name: string,
    public createdAt: Date
  ) {}

  updateEmail(newEmail: UserEmail): void {
    this.email = newEmail;
  }
}
