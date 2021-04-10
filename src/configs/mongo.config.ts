import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'mongoose';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

const getMongoUri = (configService: ConfigService): string => {
  return (
    'mongodb://' +
    configService.get('MONGO_USERNAME') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTH_DB')
  );
};

const getMongoOptions = (): ConnectionOptions => ({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoUri(configService),
    ...getMongoOptions(),
  };
};
