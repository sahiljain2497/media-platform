import ses from 'node-ses';
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_EMAIL } from '@config';
import forgotPasswordTemplate from './templates/forgotPassword';
import { UserI } from '@/interfaces/models/user.interface';

const client = ses.createClient({ key: AWS_ACCESS_KEY, secret: AWS_SECRET_KEY, amazon: AWS_EMAIL });

export const forgotPassword = (user: UserI, resetLink: string) => {
  client.sendEmail(
    {
      to: user.email,
      from: 'support@gizmohenws.com',
      subject: `Reset Password`,
      message: forgotPasswordTemplate(resetLink),
      altText: 'Reset Password',
    },
    (err, data, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
};
