/* filter sort and pagination */

class ProductFeatures {
   constructor(query, queryString){
    this.query = query;
    this.queryString = queryString;
   };

   //filter
   filtering(){
    return this;
    };

   //sorting with the respect to price
   dataSort(key){      
    switch(key){
      case "price lb":
      //   return this.query.sort(sortBy);
        return  (a, b) => a.price - b.price;

      case "price hl": 
         return  (a, b) => b.price - a.price;
      case "az":
         return (a,b)=>b.title>a.title ? -1 : a.title === b.title ? 0 : 1;
      case "za":
         return (a,b)=>b.title>a.title ? 1 : a.title === b.title ? 0 : -1;
      default : 
         return ('-createdAt')       
    }    

   };

    //sort wiht respect to
     sorting(){
      if(this.queryString.sort) {
         let sortBy = this.queryString.sort.split(',').join(' ')
         // let filtered = this.query.filter(el => true)
         let sortLogic = this.dataSort(sortBy);
         return sortLogic ? this.query.sort(sortLogic) : this.query;
         }
         return this;
      };

   //pagination
   pagination(){
    return this;
   };
}
module.exports = ProductFeatures