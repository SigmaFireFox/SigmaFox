import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.updateUserFlags = functions.https.onRequest(
  async (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    corsHandler(req, res, async () => {
      const userID = req.query.userID;
      try {
        const db = admin.firestore();
        var docRef = db.collection('alpha-users').doc(userID);
        docRef.set(req.body, { merge: true });
        res.send(docRef);
      } catch (err) {
        res.send(JSON.stringify('This is a mess' + err));
      }
    });
  }
);
