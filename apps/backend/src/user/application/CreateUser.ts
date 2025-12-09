import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import type { UserRepository } from "../domain/UserRepository";
import type { CreateUserDTO, UserDTO } from "@repo/shared-types";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<UserDTO> {
    const email = new UserEmail(dto.email);
    const user = new User(crypto.randomUUID(), email, dto.name, new Date());

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email.toString(),
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
