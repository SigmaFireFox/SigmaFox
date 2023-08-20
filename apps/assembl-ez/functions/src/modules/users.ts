import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.updateUserProfile = functions.https.onRequest(
  async (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    corsHandler(req, res, async () => {
      const userID = req.query.userID;
      try {
        const db = admin.firestore();
        var docRef = db.collection('client-data').doc(userID);
        docRef.set(req.body, { merge: true });
        res.send(docRef);
      } catch (err) {
        res.send(JSON.stringify('This is a mess' + err));
      }
    });
  }
);

exports.addAgent = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    const userID = req.query.userID;
    // Create the new user
    try {
      admin
        .auth()
        .createUser({
          email: req.body.email,
          emailVerified: false,
          phoneNumber: req.body.contactNumber,
          password: req.body.password,
          displayName: req.body.firstName + ' ' + req.body.lastName,
          disabled: false,
        })
        .then(async (userRecord) => {
          const db = admin.firestore();
          // Delete password before saving profile
          delete req.body.password;

          // Add profile details to principle profile
          try {
            var docRef = db
              .collection('client-data')
              .doc(userID)
              .collection('agents')
              .doc(userRecord.uid);
            docRef.set(req.body, { merge: true });
          } catch (error) {
            res.send(error);
          }

          // Write profile to agent profile
          try {
            req.body.principleAccount = userID;
            var docRef = db.collection('client-data').doc(userRecord.uid);
            docRef.set(req.body, { merge: true });
          } catch (error) {
            res.send(error);
          }

          res.send(userRecord);
        })
        .catch((error) => {
          res.send(error);
        });
    } catch (error) {
      res.send(error);
    }
  });
});

exports.editAgent = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    const userID = req.query.userID;
    const agentID = req.query.agentID;
    const db = admin.firestore();
    if (req.body.id) {
      delete req.body.id;
    }

    // Add profile details to principle profile
    try {
      var docRef = db
        .collection('client-data')
        .doc(userID)
        .collection('agents')
        .doc(agentID);
      docRef.set(req.body, { merge: true });
    } catch (error) {
      res.send(error);
    }

    // Write profile to agent profile
    try {
      req.body.principleAccount = userID;
      var docRef = db.collection('client-data').doc(agentID);
      docRef.set(req.body, { merge: true });
    } catch (error) {
      res.send(error);
    }
    res.send({ ...req.body, ...{ id: agentID } });
  });
});

exports.isAlphaUser = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    const userID = req.query.userID;
    try {
      // Referance data base
      const db = admin.firestore();

      //Get client leads
      let alphaUsers: string[] = [];
      const alphaUsersDocRef = db.collection('alpha-users');

      await alphaUsersDocRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          alphaUsers.push(doc.id);
        });
      });

      res.send({ isAlphaUser: alphaUsers.includes(userID) });
    } catch (error) {
      res.send(error);
    }
  });
});
