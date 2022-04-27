const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port=process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jxzaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        await client.connect();
        const productCollection=client.db('emaServer').collection('product');
      
        app.get('/product',async(req,res)=>{
            // console.log('query',req.query)
            const page=parseInt(req.query.page)
            const size=parseInt(req.query.size)
            const query={}
            const cursor = productCollection.find(query);
            let products
            if(page || size) {
                products=await cursor.skip(page*size).limit(size).toArray();
            }
            else{
                products=await cursor.toArray();
            }
            
            res.send(products);
        })
        app.get('/productCount',async(req,res)=>{
            const query={}
            const cursor=productCollection.find(query);
            const count=await productCollection.estimatedDocumentCount()
            res.send({count})
        })
            // use post to get products by ids
            app.post('/productByKeys', async(req, res) =>{
                const keys = req.body;
                const ids = keys.map(id => ObjectId(id));
                const query = {_id: {$in: ids}}
                const cursor = productCollection.find(query);
                const products = await cursor.toArray();
                console.log(keys);
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





  // const products=await cursor.limit(5).toArray(); //limit ay joto value dibo to gulo data add korbay

