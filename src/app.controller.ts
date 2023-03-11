import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('login')
  getIndexPage() {}

  @Post('login')
  @Redirect('chat')
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Body('nickname') nickname: string,
  ) {
    const session: any = req.session;
    session.nickname = nickname;
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.redirect('/');
    });
  }

  @Get('chat')
  @Render('chat')
  getChatPage(@Req() req: Request, @Res() res: Response) {
    const nickname = req.session['nickname'];

    if (!req.session['nickname']) {
      res.redirect('/');
    } else return { nickname: nickname };
  }
}
