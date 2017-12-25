const express = require('express')
const qs = require('query-string');
const router = express.Router()

const request = require('request')


const { filterSku,filterListData,filtershopDetails } = require('./filter');

let detailsUrl = `https://www.smartisan.com/product/skus/`;

// 商品详情页

router.get('/shop_details',function (req,res){
    let {id} = req.query;
    console.log(id);
    let url = detailsUrl + id+'?with_spu_sku=true&with_stock=true';

    request.get(url, function (error,responese,body) {
    if(error){
        return
    }

    let d = JSON.parse(body);

    res.send(filtershopDetails(d))
    })

})

// 获取商品列表数据

let testUrl = `https://www.smartisan.com/product/spus?page_size=20&category_id=60&page=1&sort=sort`
let shopListData = null;
router.get('/shop_list',function (req,res){
  if (shopListData){
    res.send(shopListData)
    return;
  }
  request.get({
    url:testUrl,
    gzip:true,
    },function (error,req,body){
      if(error){
        res.send({
          code:1,
          error: '请求错误',
          error
        })
        }else{
          let b = JSON.parse(body).data.list;
        let data = {
          code: 0,
          data: {
            list: filterListData(b)
          }
        }
        shopListData = data;
        res.send(data)
      }
  });
})

// 添加到购物车之后返回商品数据
router.get('/add_car', function (req,res) {
  let { skuId = 100036002} = req.query;
  request.get(`https://www.smartisan.com/product/skus?ids=${skuId}`,{
    headers: {
      Referer: 'http://www.smartisan.com/shop/'
    }
  },function(error,responese,body) {
    if(error){
      res.send({
        code:1,
        error: '请求错误'
      })
    }else{
      res.send(filterSku(body))
    }
  })
});


// 查看商品信息，比如在不在库存
// with_stock=true 查看
// with_stock=true&with_spu=true 添加到购物车请求
router.get('/skus', function (req,res) {
  let { ids,with_stock, with_spu} = req.query;
  let url = `https://www.smartisan.com/product/skus?${qs.stringify({ids,with_stock, with_spu})}`;
  // let url = `https://www.smartisan.com/product/skus?ids=${ids}&with_stock=true&with_spu=true`;

  request.get(url,{
    headers: {
      Referer: 'http://www.smartisan.com/shop/'
    }
  },function(error,responese,body) {
    if(error){
      res.send({
        code:1,
        error: '请求错误'
      })
    }else{
      res.send(body)
    }
  })
});

/**
 *
 * 发送商品id和数量，用来记录购买的商品的id和数量
 * 如果没有传入skuId，那么说明是获取
 * {
 *  skuId:
 *  count:
 * }
 */

 let shops = [];

router.get('/count', function (req, res) {

  if(!("skuId" in req.query)){
    res.send({
      code: 0,
      idsList: shops
    })
    return
  }

  let {count, skuId} = req.query;
  let index = shops.findIndex(item => skuId === item.skuId);
  if(index !== -1){
    shops.splice(index,1,{
      count, skuId
    })
  }else{
    shops.push({
      count, skuId
    })
  }

  res.send({
    code: 0,
    idsList: shops
  })
})

// 根据id移除购物车商品
router.get('/remove_count', function (req, res) {
    let {skuId} = req.query;

    shops = shops.filter((item) => {
      return item.skuId !== skuId
    })

    res.send({
      code: 0,
      idsList: shops
    })

})


module.exports = router
