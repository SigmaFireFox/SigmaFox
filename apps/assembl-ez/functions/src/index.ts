// How to write functions accross multiple files:
// https://firebase.google.com/docs/functions/organize-functions#write_functions_in_multiple_files

const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

const leadsModule = require('./modules/leads');
const usersModule = require('./modules/users');
const clientDataModule = require('./modules/client-data');
const emailerModule = require('./modules/emailer');

exports.addLead = leadsModule.addLead;
exports.editLead = leadsModule.editLead;
exports.updateUserProfile = usersModule.updateUserProfile;
exports.addAgent = usersModule.addAgent;
exports.editAgent = usersModule.editAgent;
exports.isAlphaUser = usersModule.isAlphaUser;
exports.getClientData = clientDataModule.getClientData;
exports.email = emailerModule.email;
