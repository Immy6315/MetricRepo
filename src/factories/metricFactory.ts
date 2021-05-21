import { MetricCollectorInterface, MetricClass } from '../metric/metric';
export class MetricFactory{
    static obj:MetricClass;
    static create():MetricCollectorInterface{
        try{
            if(!MetricFactory.obj)
                MetricFactory.obj =  new MetricClass();
            return MetricFactory.obj;
        }catch(err){
            console.log(`Metric Class's Object error`, { 
                name: err.name, 
                message: err.message 
            });
        }
    }
}