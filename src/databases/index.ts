import { DB_URI, NODE_ENV } from '@config';

export const dbConnection = {
  url: DB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  debug: NODE_ENV === 'development' ? true : false,
};
