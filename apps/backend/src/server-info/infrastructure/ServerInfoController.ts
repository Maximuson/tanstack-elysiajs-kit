import { Elysia } from "elysia";
import { GetServerInfo } from "../application/GetServerInfo";
import type { ServerInfoDTO } from "@repo/shared-types";

export const serverInfoController = new Elysia({ prefix: "/info" }).get(
  "/",
  (): ServerInfoDTO => {
    const getServerInfo = new GetServerInfo();
    return getServerInfo.execute();
  }
);
