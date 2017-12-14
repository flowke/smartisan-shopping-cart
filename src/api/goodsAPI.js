import axios from 'axios';


let req = axios.create({
    baseURL: 'http://localhost:5000/api',
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
    }
}
