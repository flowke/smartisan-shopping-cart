import goodsAPI from 'api/goodsAPI';

const initState = {
    isLoading: true,
    error: false,
    detailData:{}
};

const GET_GOODS_DETAIL = 'GET_GOODS_DETAIL/shopping-car/GoodsDetail';
const GET_GOODS_DETAIL_SUCCESS = 'GET_GOODS_DETAIL_SUCCESS/shopping-car/GoodsDetail';
const GET_GOODS_DETAIL_ERROR = 'GET_GOODS_DETAIL_ERROR/shopping-car/GoodsDetail';

let getGoodsDetailAction = (id, isSilence)=> dispatch=> {

    if(!isSilence){
        dispatch({type:GET_GOODS_DETAIL});
    }

    goodsAPI.getGoodsDetail(id).then(({code,data})=>{
        if(code===0){

            if(data.stock===undefined) data.stock = 5;

            dispatch({type: GET_GOODS_DETAIL_SUCCESS, payload:data});
        }

    });
}

export default function goodsDetail(state=initState, action) {
    let {
        type,
        payload
    } = action;

    switch (type) {
        case GET_GOODS_DETAIL:
            return {
                ...state,
                isLoading: true
            };
        case GET_GOODS_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                detailData:{...payload}
            };
        case GET_GOODS_DETAIL_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }

        default:
            return state;
    }
}

export const actions = {
    getGoodsDetailAction
};
