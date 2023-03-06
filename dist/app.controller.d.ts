import { Request, Response } from 'express';
export declare class AppController {
    getIndexPage(): void;
    login(req: Request, res: Response, nickname: string): void;
    getChatPage(req: Request, res: Response): {
        nickname: any;
    };
}
