import { MongoClient } from 'mongodb';
// import {  } from '$env/static/private';
const VITE_MONGODB_URI = 'mongodb://root:root@localhost:27017';
const VITE_MONGODB_NAME = 'test';

const client = new MongoClient(VITE_MONGODB_URI);
await client.connect();
console.log('test');
export default client.db(VITE_MONGODB_NAME); // select database
