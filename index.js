import app from "./server.js";
import mongodb from "mongodb";
import CorridorsDAO from "./corridorsdao.js"
import dotenv from "dotenv";
dotenv.config();
const ip=process.env["ip"];


let con;



const MongoClient = mongodb.MongoClient;
const mongo_pwd = process.env["password"];

const uri = `mongodb+srv://Father:${mongo_pwd}@cluster0.ftbrn2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  }
)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
     con=await CorridorsDAO.injectDB(client)
    app.listen(port,`${ip}`, () => console.log(`Listening on port ${port} 🚀 Jai Mata Di http://${ip}:8000`));
  });
  export { con };
  

