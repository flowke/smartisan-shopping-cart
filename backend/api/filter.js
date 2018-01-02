
function getInfo (obj) {
  let {
    id,
    in_stock = true,
    name,
    price,
    spu_id,
    shop_info: {
      limit_num,
      ali_image,
      sub_title,
      title,
      spec_json
    }
  } = obj;

  return {
    id,
    in_stock,
    name,
    price,
    spu_id,
    shop_info: {
      limit_num,
      ali_image,
      sub_title,
      title,
      spec_json
    }
  }
}

function getListInfo (list) {
  return list.map((item) => {
    return getInfo(item)
  })
}

function filterSku(d) {
  d = JSON.parse(d);
  return {
    code: d.code,
    data: {
      list: getListInfo(d.data.list)
    }
  }
}


// 过滤添加购物车商品
exports.filterSku = filterSku

// 过滤商品列表页数据
function filterListData(data){

    return data.map((item) => {
      let {id,name,price,image_pre} = item;
      let sku_list = [];

      item.sku_info.forEach((item2) => {
        if(!sku_list.find((item3) => item3.color_id === item2.color_id )){
          let {direct_to_cart,ali_image,sku_id,sub_title,title,color_id,price}
            = item2;
          let spec_json = item2.spec_json.map(function (json_item){
            let {image,show_name,spec_value_id} = json_item;
            return  {image};
          })

          sku_list.push({direct_to_cart,ali_image,sku_id,sub_title,title,price,...spec_json[0],color_id})
        }
      })

      return {id,name,price,image_pre:'http://img01.smartisanos.cn/',
        sku_list: sku_list
      }
    });
}

exports.filterListData = filterListData;

// 处理详情页的需要的数据
function filtershopDetails(datas){

  if(!datas.data) return {code:1};
    // console.log(datas);
  let {
    code,
    data : {
      id,
      in_stock=true,
      stock,
      name,
      price,
      spu_id,
      attr_info,
      shop_info: {
        ali_image,
        ali_images,
        sub_title,
        title,
        spec_json,
        spec_v2
      },
      sku_list
    }
  } = datas;

  let d = {
    code,
    data : {
      id,
      in_stock,
      stock,
      name,
      price,
      spu_id,
      attr_info,
      stock,
      shop_info: {
        ali_image,
        ali_images,
        sub_title,
        title,
        spec_json,
        spec_v2
      }
    }
  }
  d.data.sku_list = datas.data.sku_list.map(function(item){
    let {id,sku_id,attr_info} = item
    return {id,sku_id,attr_info}
  })


  return d
}

exports.filtershopDetails = filtershopDetails;
