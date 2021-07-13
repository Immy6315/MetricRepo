import express from 'express';
import * as bodyParser from 'body-parser';

import { MetricFactory } from '../factories/metricFactory';
const metric = MetricFactory.create();
 
let app = express();
  
app.use(bodyParser.json());   

app.post('/metric/:key', (req, res) => {
    try{
        let key = req.params.key
        let body = req.body
        if(body.value){
            let data = metric.set(key,{...body,timeStamp:new Date()})
            return res.status(200).json({
                statusCode: 200,
                message: 'Value Added with respect to '+key,
                data: data,
            });
        }else{
            return res.status(400).json({
                statusCode: 400,
                message: "Unsuccessfull",
            });
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            statusCode: 400,
            message: "Unsuccessfull",
            err
        });
    }
});

app.get('/metric/:key/sum', (req, res) => {
    let key = req.params.key
    let data = metric.get(key)
    return res.status(200).json({
        statusCode: 200,
        message: 'Sum with respect to '+key,
        data,
      });
});

app.listen(80,()=>{
    console.log('Metric app has started!');
});

module.exports=app;