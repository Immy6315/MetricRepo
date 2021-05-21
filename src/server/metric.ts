import express from 'express';
import * as bodyParser from 'body-parser';

import { MetricFactory } from '../factories/metricFactory';
const metric = MetricFactory.create();

let app = express();

app.use(bodyParser.json());

app.post('/metric/:key', (req, res) => {
    let key = req.params.key
    let body = req.body
    if(body.value){
        let data = metric.set(key,{...body,timeStamp:new Date()})
        return res.status(200).json({
            statusCode: 200,
            message: 'Value Added with respect to '+key,
            data: data,
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

app.listen(8081,()=>{
    console.log('Metric app has started!');
});

module.exports=app;