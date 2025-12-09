import type { ServerInfoDTO } from "@repo/shared-types";
import { ServerInfoService } from "../domain/ServerInfoService";

export class GetServerInfo {
  private serverInfoService: ServerInfoService;

  constructor() {
    this.serverInfoService = new ServerInfoService();
  }

  execute(): ServerInfoDTO {
    return this.serverInfoService.getInfo();
  }
}
