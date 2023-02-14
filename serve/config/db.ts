import mongoose from "mongoose";
import { mongoUrl } from "./default";

const db = mongoose.createConnection(mongoUrl + '/myMongoDB')

db.on('error', console.error.bind(console, 'connection error'))
db.on('open', () => {
  console.log('connection successful');
})

export default db