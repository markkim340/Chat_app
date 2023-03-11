declare const _default: (() => {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    autoLoadEntities: boolean;
    migrationsRun: boolean;
    migrations: string[];
    migrationsTableName: string;
    cli: {
        migrationsDir: string;
    };
    synchronize: boolean;
    logging: boolean;
    logger: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    autoLoadEntities: boolean;
    migrationsRun: boolean;
    migrations: string[];
    migrationsTableName: string;
    cli: {
        migrationsDir: string;
    };
    synchronize: boolean;
    logging: boolean;
    logger: string;
}>;
export default _default;
