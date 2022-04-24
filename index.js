const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port=process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://emaServer:34yllGkGpskxV7S@cluster0.jxzaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try{
        await client.connect();
        const productCollection=client.db('ema-john-server').collection('product');
        app.get('/product',async(req,res)=>{
            const query={}
            const cursor = productCollection.find(query);
            const products=await cursor.toArray();
            res.send(products);
        })
        
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    console.log('ok')
    res.send('GET request to the homepage')
  })

  app.listen(port,()=>{
      console.log('this is your port ' ,port)
  })

