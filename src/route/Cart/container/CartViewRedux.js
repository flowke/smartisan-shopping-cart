import goodsAPI from 'api/goodsAPI';

const initState = {
    isLoading: true,
    error: false,
    cart:{}
};

const ADD_TO_CART = 'ADD_TO_CART/shopping-cart/';

let addToCartAction = (skuId, isSilence)=> dispatch=> {

    // if(!isSilence){
    //     dispatch({type:GET_GOODS_DETAIL});
    // }

    goodsAPI.getCount(skuId).then(({code,data})=>{

        if(code===0){
            console.log(data);
            dispatch({type: ADD_TO_CART, payload:data});
        }
    });
}

export default function cart(state=initState, action) {
    
    let {
        type,
        payload
    } = action;

    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartInfo: payload
            };

        default:
            return state;
    }
}

export const actions = {
    addToCartAction
};
