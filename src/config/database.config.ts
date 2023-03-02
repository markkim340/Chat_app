import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,

    // Implementaremos Migrations.
    /** Recursos
     *  * https://typeorm.io/#/migrations
     */
    migrationsRun: true,
    migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    cli: {
      migrationsDir: 'src/migrations',
    },

    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: true,
    logging: true,
    logger: 'file',
  };
});
