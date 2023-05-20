import { registerAs } from '@nestjs/config';

export interface I_DatabaseConfig {
  url: string;
}

export default registerAs(
  'database',
  (): I_DatabaseConfig => ({
    url: process.env.DATABASE_URL,
  }),
);
