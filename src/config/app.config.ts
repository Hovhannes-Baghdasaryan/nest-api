import { registerAs } from '@nestjs/config';

export interface I_AppConfig {
  nodeEnv: string;
  name: string;
  port: number;
  apiPrefix: string;
}

// Each config has keyName like, database, app, auth, aws, services, mail services etc...
// config.get("key.property")
// example` config.get("app.port")
export default registerAs(
  'app',
  (): I_AppConfig => ({
    nodeEnv: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
  }),
);
