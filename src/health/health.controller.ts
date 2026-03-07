import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  health() {
    return {
      message: "Ok",
      date: new Date(),
    };
  }
}
