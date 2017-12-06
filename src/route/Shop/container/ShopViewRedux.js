import goodsAPI from 'api/goodsAPI';

const initState = {
    goodsList: []
};

const GET_GOODS = 'GET_GOODS/shopping-car/shop';

let getGoodsList = ()=> dispatch=> {

    goodsAPI.getGoodsList().then(data=>{
        console.log(data);
        dispatch({type: GET_GOODS, data});
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
    getGoodsList
};
