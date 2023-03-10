import { Request, Response } from 'express';
export declare class AppController {
    getIndexPage(): void;
    login(req: Request, res: Response, nickname: string): void;
    logout(req: Request, res: Response): void;
    getChatPage(req: Request, res: Response): {
        nickname: any;
    };
}
