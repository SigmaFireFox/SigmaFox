import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');
const auth = admin.auth();
const nodemailer = require('nodemailer');
const corsHandler = cors({ origin: true });

exports.email = functions.https.onRequest((req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      return res
        .status(400)
        .send('Bad request, this endpoint only accepts POST requests');
    }

    const idToken: string = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res
        .status(401)
        .send('You are not authorized to perform this action');
    }

    try {
      const decodedIdToken: admin.auth.DecodedIdToken =
        await auth.verifyIdToken(idToken);
      if (decodedIdToken && decodedIdToken.uid) {
        const user = admin.auth().getUser(decodedIdToken.uid);
        if (await user) {
          var transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com', // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
              ciphers: 'SSLv3',
            },
            auth: {
              user: 'e-questrianonline@outlook.com',
              pass: 'AlphaBeta@1',
            },
          });
          const mailOptions = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.html,
          };
          return transporter.sendMail(mailOptions, (error: any) => {
            return error
              ? res.send(JSON.stringify(error))
              : res.send(JSON.stringify('Sent'));
          });
        } else {
          return res
            .status(401)
            .send('You are not authorized to perform this action');
        }
      }
    } catch (error) {}
  });
});
