import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');
const corsHandler = cors({ origin: true });

/*
addLead (POST only)
url: https://us-central1-assembl-ez.cloudfunctions.net/addLead
params: userID 
*/
exports.addLead = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    const userID = req.query.userID;
    const docRefID = generateDateBaseDocRefID();
    try {
      const db = admin.firestore();
      var docRef = db
        .collection('client-data')
        .doc(userID)
        .collection('leads')
        .doc(docRefID);
      docRef.set(req.body, { merge: true });
      res.send(docRef);
    } catch (error) {
      res.send(error);
    }
  });
});

exports.editLead = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    const userID = req.query.userID;
    const leadID = req.query.leadID;
    if (req.body.id) {
      delete req.body.id;
    }
    try {
      const db = admin.firestore();
      var docRef = db
        .collection('client-data')
        .doc(userID)
        .collection('leads')
        .doc(leadID);
      docRef.set(req.body, { merge: true });
      res.send(docRef);
    } catch (error) {
      res.send(error);
    }
  });
});

function generateDateBaseDocRefID() {
  const randomElement = Math.floor(Math.random() * 100);
  const date = new Date();
  const docRefID =
    date.getFullYear().toString().padStart(4, '0') +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0') +
    date.getHours().toString().padStart(2, '0') +
    date.getMinutes().toString().padStart(2, '0') +
    date.getSeconds().toString().padStart(2, '0') +
    date.getMilliseconds().toString().padStart(4, '0') +
    randomElement.toString().padStart(2, '0');

  return docRefID;
}
