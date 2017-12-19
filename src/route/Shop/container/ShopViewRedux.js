import goodsAPI from 'api/goodsAPI';

const initState = {
    goodsList: []
};

const GET_GOODS = 'GET_GOODS/shopping-car/shop';

let getGoodsListAction = ()=> dispatch=> {

    goodsAPI.getGoodsList().then(({code,data})=>{

        if(code===0){
            dispatch({type: GET_GOODS, goods:data.list});
        }
    })
}

let checkGoodsInStockAction = ()=> dispatch=> {

    goodsAPI.getGoodsList().then(({code,data})=>{

        if(code===0){
            dispatch({type: GET_GOODS, goods:data.list});
        }
    })
}

export default function shop(state=initState, action) {
    let {
        type,
        goods
    } = action;

    switch (type) {
        case GET_GOODS:
            return {
                ...state,
                goodsList: goods
            };

        default:
            return state;
    }
}

export const actions = {
    getGoodsListAction
};
