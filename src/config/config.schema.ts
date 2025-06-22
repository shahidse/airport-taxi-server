interface Config {
  JWT_EXPIRATION: string;
  JWT_SECRET: string;
  APP_PORT: number;
  mail: {
    mailer: string;
    host: string;
    port: number;
    fromAddress: string;
    fromName: string;
    encryption: string;
    username: string;
    password: string;
  };
  mysql: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}

const defaultConfig: Config = {
  JWT_EXPIRATION: '2h',
  JWT_SECRET: 'SECRET!@#',
  APP_PORT: 5000,
  mail: {
    mailer: 'smtp',
    host: 'box.jobsingta.com',
    port: 465,
    fromAddress: 'mail@jobsingta.com',
    fromName: '${APP_NAME}',
    encryption: 'ssl',
    username: 'your_smtp_username',
    password: 'your_smtp_password',
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'test',
  },
};

export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT || `${defaultConfig.APP_PORT}`, 10),
    encryptionKey: process.env.ENCRYPTION_KEY || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || defaultConfig.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION || defaultConfig.JWT_EXPIRATION,
  },
  mail: {
    mailer: process.env.MAIL_MAILER || defaultConfig.mail.mailer,
    host: process.env.MAIL_HOST || defaultConfig.mail.host,
    port: parseInt(process.env.MAIL_PORT || `${defaultConfig.mail.port}`, 10),
    fromAddress:
      process.env.MAIL_FROM_ADDRESS || defaultConfig.mail.fromAddress,
    fromName: process.env.MAIL_FROM_NAME || defaultConfig.mail.fromName,
    encryption: process.env.MAIL_ENCRYPTION || defaultConfig.mail.encryption,
    username: process.env.MAIL_USERNAME || defaultConfig.mail.username,
    password: process.env.MAIL_PASSWORD || defaultConfig.mail.password,
  },
  mysql: {
    host: process.env.MYSQL_HOST || defaultConfig.mysql.host,
    port: parseInt(process.env.MYSQL_PORT || `${defaultConfig.mysql.port}`, 10),
    user: process.env.MYSQL_USER || defaultConfig.mysql.user,
    password: process.env.MYSQL_PASSWORD || defaultConfig.mysql.password,
    database: process.env.MYSQL_DATABASE || defaultConfig.mysql.database,
  },
});
