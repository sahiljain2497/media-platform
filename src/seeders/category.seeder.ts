require('dotenv').config();
import mongoose from 'mongoose';
import PlatformModel from '@/models/platform.model';
import { DB_URI } from '@config';
import CategoryModel from '@/models/category.model';

const categories = [
  'General',
  'Sports',
  'Health',
  'Business',
  'Technology',
  'Entertainment',
  'Science',
  'Political',
  'Travel',
  'International',
  'Finance',
  'Religion/Spiritual',
  'Animals',
  'Speculation',
  'History',
];

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
  const platforms = await PlatformModel.find();
  for (let j = 0; j < platforms.length; j++) {
    for (let i = 0; i < categories.length; i++) {
      try {
        const category = new CategoryModel({ name: categories[i], platform: platforms[j]._id });
        await category.save();
      } catch (error) {
        console.log(error);
      }
    }
  }

  mongoose.connection.close();
  process.exit(1);
});
