"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const path_1 = require("path");
exports.default = (0, config_1.registerAs)('database', () => {
    return {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB_NAME,
        entities: [(0, path_1.join)(__dirname, '../**/**/*entity{.ts,.js}')],
        autoLoadEntities: true,
        migrationsRun: true,
        migrations: [(0, path_1.join)(__dirname, '../migration/**/*{.ts,.js}')],
        migrationsTableName: 'migrations_typeorm',
        cli: {
            migrationsDir: 'src/migrations',
        },
        synchronize: true,
        logging: true,
        logger: 'file',
    };
});
//# sourceMappingURL=database.config.js.map