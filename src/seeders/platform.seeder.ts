require('dotenv').config();
import mongoose from 'mongoose';
import PlatformModel from '@/models/platform.model';
import { DB_URI } from '@config';

const data = [{ name: 'News' }, { name: 'TV' }];

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
mongoose.set('debug', true);
db.on('error', () => {
  console.error.bind(console, 'connection error:');
});

db.once('open', async () => {
  for (let i = 0; i < data.length; i++) {
    try {
      const platform = new PlatformModel(data[i]);
      await platform.save();
    } catch (error) {
      console.log(error);
    }
  }
  mongoose.connection.close();
  process.exit(1);
});
