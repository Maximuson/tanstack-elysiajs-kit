import { Elysia, t } from "elysia";
import { CreateUser } from "../application/CreateUser";
import { UserRepositoryImpl } from "./UserRepositoryImpl";
import type { CreateUserDTO, UserDTO } from "@repo/shared-types";

const userRepository = new UserRepositoryImpl();

export const userController = new Elysia({ prefix: "/users" }).post(
  "/",
  async ({ body }): Promise<UserDTO> => {
    const createUser = new CreateUser(userRepository);
    return await createUser.execute(body as CreateUserDTO);
  },
  {
    body: t.Object({
      email: t.String(),
      name: t.String(),
    }),
  }
);
