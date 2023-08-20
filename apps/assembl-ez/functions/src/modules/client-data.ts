import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.getClientData = functions.https.onRequest(
  async (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    corsHandler(req, res, async () => {
      const userID = req.query.userID;
      try {
        // Referance data base
        const db = admin.firestore();

        //Get client data
        const profileDocDocRef = db.collection('client-data').doc(userID);
        const profileDoc = await profileDocDocRef.get();
        const profile = profileDoc.data();

        //Get client leads
        let leads: { [key: string]: any } = {};
        const leadsDocRef = db
          .collection('client-data')
          .doc(userID)
          .collection('leads');
        await leadsDocRef.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            leads[doc.id] = doc.data();
          });
        });

        //Get client agents
        let agents: { [key: string]: any } = {};
        const agentsDocRef = db
          .collection('client-data')
          .doc(userID)
          .collection('agents');
        await agentsDocRef.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            agents[doc.id] = doc.data();
          });
        });

        // Send all data back
        res.send({ profile, leads, agents });
      } catch (error) {
        res.send(error);
      }
    });
  }
);
