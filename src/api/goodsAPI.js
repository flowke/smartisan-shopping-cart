import axios from 'axios';


let req = axios.create({
    baseURL: 'http://192.168.10.102:5000/api',
    // withCredentials: true,
    timeout: 10000
});


export default {
    /**
     * 获取商品数据
     * @param  {Object}    [params={}] ?page_size=20&category_id=60&page=1&sort=sort
     *     {
     *         page_size:
     *         category_id:
     *         page:
     *         sort
     *     }
     */
    getGoodsList(params={}) {
        return req.get('/shop_list', {
            params:{...params}
        })
            .then(res=>{
                if(res.status===200){
                    return res.data;
                }else{
                    throw 'wrong';
                }
            })
    },

    /**
     * 获取商品详情
     * id: 商品 id
     */
    getGoodsDetail(id) {
        return req.get(`/shop_details`,{
            params:{id}
        })
            .then(res=>{
                if(res.status===200){
                    return res.data;
                }else{
                    throw 'wrong';
                }
            })
        ;
    },

    /**
     * 获取商品信息， 比如你需要查看是否有库存，或放在购物车中需要显示的
     * 信息
     *
     */
     // with_stock=true 查看
     // with_stock=true&&with_spu=true 添加到购物车请求

    getGoodsInfo({ids,with_stock, with_spu}={}){
        return req.get(`/skus`,{
            params:{ids,with_stock, with_spu}
        })
            .then(res=>{
                if(res.status===200){
                    return res.data;
                }else{
                    throw 'wrong';
                }
            })
        ;
    },

    getCount(skuId,count){
        return req.get(`/count`,{
            params:{skuId, count}
        })
            .then(res=>{
                if(res.status===200){
                    return res.data;
                }else{
                    throw 'wrong';
                }
            })
        ;
    },
}
