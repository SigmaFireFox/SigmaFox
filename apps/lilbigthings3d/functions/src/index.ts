// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
import admin = require('firebase-admin');
admin.initializeApp();

import crypto = require('crypto');
import dns = require('dns');
import axios from 'axios';

exports.processPaymentNotification = functions.https.onRequest(
  async (req, res) => {
    const paymentNotificationContent = req.body;

    // Set parameters for processing
    const testingMode = true;
    const passPhrase = testingMode ? 'SaltAndPepperPig' : 'ThisIsThe1AndOnly'; // Testing
    const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

    // Get order details
    const db = admin.firestore();
    const orderNr = paymentNotificationContent['item_name'];
    const orderDocRef = db.collection('orders').doc(orderNr);
    const orderDetailsDoc = await orderDocRef.get();
    const orderDetails = orderDetailsDoc.data();

    let cartTotal = '';
    let userID = '';
    if (orderDetails) {
      cartTotal = orderDetails['orderTotal'].toString();
      userID = orderDetails['userID'];
    }

    // Get user profile
    const userProfileDocRef = db.collection('user-profiles').doc(userID);
    const userProfilesDoc = await userProfileDocRef.get();
    const userProfile = userProfilesDoc.data();

    // Get index of order in user profile
    let userOrderIndex = 0;
    let userOrders = [];
    if (userProfile) {
      userOrders = userProfile['orders'];
      userOrderIndex = userOrders.findIndex((order: Record<string, string>) => {
        return order['orderNr'] === orderNr;
      });
    }

    // Generate param string
    const paramString = generateParamString(paymentNotificationContent);

    // Perform validation checks
    const isValidSignature = isValidSignatureCheck(
      paymentNotificationContent,
      paramString,
      passPhrase
    );
    const isValidIP = await isValidIPCheck(req);
    const validPaymentData = validPaymentDataCheck(
      cartTotal,
      paymentNotificationContent
    );
    const validServerConfirmation = await validServerConfirmationCheck(
      pfHost,
      paramString
    );

    // Update payment notification content with validation status
    const allChecksPassed =
      isValidSignature &&
      isValidIP &&
      validPaymentData &&
      validServerConfirmation;
    paymentNotificationContent['notification-validated'] = allChecksPassed;

    // Update user orders
    if (allChecksPassed && userProfile) {
      userProfile['orders'][userOrderIndex]['status'] = 'Paid';
      const docRef = db.collection('user-profiles').doc(userID);
      docRef.set(userProfile);
    }

    // Update  order
    if (allChecksPassed && orderDetails) {
      orderDetails['status'] = 'Paid';
      const docRef = db.collection('orders').doc(orderNr);
      docRef.set(orderDetails);
    }

    // Record the payment notification
    const writeResult = await admin
      .firestore()
      .collection('payment-notifications')
      .add(paymentNotificationContent);
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  }
);

function generateParamString(
  paymentNotificationContent: Record<string, string>
): string {
  let returnString = '';
  for (const key in paymentNotificationContent) {
    if (key in paymentNotificationContent && key !== 'signature') {
      returnString += `${key}=${encodeURIComponent(
        paymentNotificationContent[key].trim()
      ).replace(/%20/g, '+')}&`;
    }
  }
  // Remove last ampersand
  returnString = returnString.slice(0, -1);
  return returnString;
}

function isValidSignatureCheck(
  paymentNotificationContent: Record<string, string>,
  paramString: string,
  passphrase: string | null = null
): boolean {
  // Calculate security signature
  //   const tempParamString = '';
  if (passphrase !== null) {
    paramString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(
      /%20/g,
      '+'
    )}`;
  }

  const signature = crypto.createHash('md5').update(paramString).digest('hex');
  return paymentNotificationContent['signature'] === signature;
}

async function ipLookup(domain: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    dns.lookup(
      domain,
      { all: true },
      (err: unknown, address: { address: unknown }[]) => {
        if (err) {
          reject(err);
        } else {
          const addressIps = address.map(function (item: { address: unknown }) {
            return item.address;
          });
          resolve(addressIps);
        }
      }
    );
  });
}

async function isValidIPCheck(req: functions.https.Request): Promise<boolean> {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za',
  ];

  let validIps: Iterable<unknown> | null | undefined = [];
  const pfIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    for (const key in validHosts) {
      const ips = await ipLookup(validHosts[key]);
      validIps = [...validIps, ...ips];
    }
  } catch (err) {
    console.error(err);
  }

  const uniqueIps = [...new Set(validIps)];

  if (uniqueIps.includes(pfIp)) {
    return true;
  }
  return false;
}

function validPaymentDataCheck(
  cartTotal: string,
  paymentNotificationContent: Record<string, string>
): boolean {
  return (
    Math.abs(
      parseFloat(cartTotal) -
        parseFloat(paymentNotificationContent['amount_gross'])
    ) <= 0.01
  );
}

async function validServerConfirmationCheck(
  pfHost: unknown,
  pfParamString: unknown
): Promise<boolean> {
  const result = await axios
    .post(`https://${pfHost}/eng/query/validate`, pfParamString)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result === 'VALID';
}
