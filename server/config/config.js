import dotenv from 'dotenv';

const env = process.env.NODE_ENV;
let currentProcess = '';
if (env === 'test') {
  currentProcess = 'TEST';
}
dotenv.config();

const config = {
  apiKey: process.env[`${currentProcess}apiKey`],
  authDomain: process.env[`${currentProcess}authDomain`],
  databaseURL: process.env[`${currentProcess}databaseURL`],
  projectId: process.env[`${currentProcess}projectId`],
  storageBucket: process.env[`${currentProcess}storageBucket`],
  messagingSenderId: process.env[`${currentProcess}messagingSenderId`]
};

export default config;
