
export interface MetricCollectorInterface {
     set(key:string,args:any);
     get(key:string);
}

export class MetricClass implements MetricCollectorInterface {
     metricArray:any = []
     set(key:string,args:any){
          let metric = this.metricArray.findIndex(x => x.key == key);
          if(metric!=-1){
               this.metricArray[metric].value.push(args)
          }else{
               this.metricArray.push({
                    key,
                    value:[args]
               })
          }
     }
     get(key:string){
          let metric = this.metricArray.findIndex(x => x.key == key);
          if(metric!=-1){
               let value = this.metricArray[metric].value.reverse().filter((element)=>{
                    let date:any = new Date()
                    let diffInMinutes = Math.round(((date-element.timeStamp % 86400000) % 3600000) / 60000)
                    if(diffInMinutes<=1)
                         return true
               }).reverse()
               this.metricArray[metric] = {
                    key,
                    value
               }
               return value.reduce((accumulator, current) => accumulator + current.value, 0);
          }
          else
               return "0"
     }
} 