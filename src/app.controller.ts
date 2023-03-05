import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getIndexPage(@Res() res: Response) {
    res.sendFile('login.html', { root: 'static' });
  }

  @Post()
  login(@Res() res: Response, @Body('nickname') nickname: string) {
    res.sendFile('chat.html', { root: 'static' });
    res.redirect('chat');
  }

  @Post('chat')
  getChatPage(
    @Req() req: Request,
    @Res() res: Response,
    @Body('nickname') nickname: string,
  ) {
    const _session = req.session;
    _session.nickname = _session;
    res.sendFile('chat.html', { root: 'static' });
  }
}
