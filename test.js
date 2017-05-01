// require("./index.js")("yizhangfang").select({
//   table:"code_1list"
// }).then(function(data){
//   console.log("正确结果",data);
// }).catch(function(data){
//   console.log("错误结果",data);
// });


// require("./index.js")("nodejs").insert({
//   table:"t_accounts",
//   data:{
//     account:1235,
//     password:123456
//   }
// }).then(function(data){
//   console.log("正确结果",data);
// },function(data){
//    console.log("错误结果",data);
// });
//
// require("./index.js")("nodejs").update({
//   table:"t_accounts",
//   data:{
//     password:123456
//   },
//   index:{
//     account:12345555
//   }
// }).then(function(data){
//   console.log("正确结果",data);
// },function(data){
//    console.log("错误结果",data);
// });




require("./index.js")("nodejs").delete({
  table:"t_accounts",
  index:{
    account:123
  }
}).then(function(data){
  console.log("正确结果",data);
},function(data){
   console.log("错误结果",data);
});
