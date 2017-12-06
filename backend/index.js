const express = require('express')
const app = express()


// 设置代理请求的接口

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use('/api', require('./api/api'))

app.listen(5000,function (){
	console.log('服务启动成功');	
})
