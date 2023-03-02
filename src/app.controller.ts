import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '반갑습니다. 김민우의 Chatapp 입니다.';
  }
}
