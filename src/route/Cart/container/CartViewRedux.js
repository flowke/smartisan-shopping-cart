import goodsAPI from 'api/goodsAPI';

const initState = {
    isLoading: true,
    error: false,
    isCountOverflow: false,
    cartInfo:[]
};

const UPDATE_CART_INFO = 'UPDATE_CART_INFO/shopping-cart/cartView';
const SWITCH_CAET_COUNT_OVERFLOW = 'SWITCH_CAET_COUNT_OVERFLOW/shopping-cart/cartView';

/**
 * start 提供给外部使用的 action
 */
const initCartInfoAction = ()=> (dispatch, getState) =>{

    let storageITEM = getStorageITEM();

    let keys = Object.keys( storageITEM );

    // 如果 localstorage 没有信息，或者已经内存已经有数据了，退出
    if(!keys.length || getState().cart.cartInfo.length) return;

    goodsAPI.getGoodsInfo({
        ids: keys.join(),
        with_stock: true,
        with_spu: true
    })
        .then( ({code,data})=>{

            if( code===0 ){
                let storageITEM = getStorageITEM();

                let goodsInfo = filterGoodsData(data.list);

                let cartInfo = goodsInfo.map( elt=>({
                    ...elt,
                    ...storageITEM[elt.skuId]
                }));

                dispatch(updateCartInfoAction(cartInfo));
            }

        } );
}

const addToCartAction = (skuId, count=1)=> (dispatch, getState)=> {

    let storageITEM = getStorageITEM();

    // 如果之前被添加到购物车，就得检查还能不能添加，不能超过最大购买数量
    // 这里可能会发生退出
    if(storageITEM.hasOwnProperty(skuId)){
        let item = storageITEM[skuId];
        if(count+item.count>item.maxCount){
            dispatch( switchCartCountPromptAction(true) );
            return;
        }
    }

    // 如果 localstorage 没有相关记录, 说明添加一个新的
    // 否则就是更新一下某个 被添加商品的数量
    if( !storageITEM.hasOwnProperty(skuId) ){

        dispatch( addNewOneToCartAction(skuId, count) );

    // 如果 localStorage 里面有相关记录, 说明更新某一个被添加商品的数量
    }else{
        dispatch( updateCartCountAction(skuId, count) );
    }
}

const updateCartCountAction = ( skuId ,count=1)=> (dispatch, getState) => {
    let storageITEM = getStorageITEM();


    // storageITEM[skuId].count += count;

    let targetStorageITEM = storageITEM[skuId];

    storageITEM = {
        ...storageITEM,
        [skuId]: {
            ...targetStorageITEM,
            count: targetStorageITEM.count + count
        }
    }

    // 同步 storage
    setStorageITEM(storageITEM);

    let {cartInfo} = getState().cart;

    cartInfo = cartInfo.map(infoItem=>{
        if( infoItem.skuId ===skuId ){
            infoItem = {
                ...infoItem,
                ...storageITEM[skuId]
            }
        }
        return infoItem;
    });

    setStorageITEM(storageITEM)
    dispatch( updateCartInfoAction(cartInfo) );
}

const removeFromCartAction = (skuIds=[])=>(dispatch, getState)=>{

    let cartInfo = getState().cart.cartInfo;

    let storageITEM = getStorageITEM();

    skuIds.forEach(skuId=>{
        storageITEM[skuId] = undefined;
    });


    // 更新 localStorage
    setStorageITEM(storageITEM);

    cartInfo = cartInfo.filter(item=>{

        return !skuIds.some(id=>item.skuId==id);
    } );

    dispatch(updateCartInfoAction( cartInfo ));

}

const switchCartCountPromptAction=(isShow=false)=>dispatch=>{

    dispatch({type:SWITCH_CAET_COUNT_OVERFLOW, payload: isShow});
}

/**
 * end 提供给外部使用的 action
 */

/**
 * start 提供内部部使用的 action
 */
const updateCartInfoAction = (cartInfo)=>dispatch=>dispatch({type: UPDATE_CART_INFO, payload: cartInfo});


const addNewOneToCartAction = (skuId, count)=> (dispatch, getState) =>{
    let cartInfo = getState().cart.cartInfo;

    goodsAPI.getGoodsInfo({
        ids: skuId,
        with_spu: true,
        with_stock: true

    }).then( ( {code,data} )=>{

        if(code===0){

            // let info = data.spu.sku_info.filter(elt=>elt.sku_id === skuId)[0];
            //
            // let { sku_id, price, ali_image, spec_json, title } = info;

            let infoData = filterGoodsData( data.list )[0];

            let storageITEM = getStorageITEM();

            let storageData = {
                count,
                ctime: new Date().getTime(),
                skuId: skuId,
                maxCount: infoData.maxCount
            };



            let goods = {
                ...infoData,
                ...storageData

            };

            setStorageITEM( {
                ...storageITEM,
                [skuId]: storageData
            } );

            dispatch( updateCartInfoAction([...cartInfo, goods]) );
        }
    });

}


/**
 * end 提供 内部 部使用的 action
 */


export default function cart(state=initState, action) {

    let {
        type,
        payload
    } = action;

    switch (type) {
        case UPDATE_CART_INFO:
            return {
                ...state,
                cartInfo: [...payload]
            };
        case SWITCH_CAET_COUNT_OVERFLOW:
            return {
                ...state,
                isCountOverflow: payload
            };
        default:
            return state;
    }
}

export const actions = {
    addToCartAction,
    initCartInfoAction,
    updateCartCountAction,
    removeFromCartAction,
    switchCartCountPromptAction
};

// 辅助函数

// 过滤服务器返回的数据
function filterGoodsData(list) {

    return list.map( listItem=>{

        let info = listItem.spu.sku_info.filter(elt=>elt.sku_id === listItem.id.toString() )[0];

        let { sku_id, price, ali_image, spec_json, title } = info;

        // let storageInfo = {
        //     count: 1,
        //     ctime: new Date().getTime(),
        //     skuId: sku_id,
        // };

        return {
            title,
            price: price,
            img: ali_image,
            color: spec_json[0].show_name,
            maxCount: listItem.stock!==undefined? Math.min(listItem.stock, 5) : 5,
            spuId: listItem.spu_id,
            skuId: sku_id
        };
    } );
}

// 设置 ITEM
function getStorageITEM() {
    let value = localStorage.getItem('ITEM');

    if( !value ) {
        localStorage.setItem('ITEM', "{}");
        value = localStorage.getItem('ITEM');
    } ;

    return JSON.parse( value );
}
// 获取 ITEM
function setStorageITEM(value={}) {
    return localStorage.setItem('ITEM', JSON.stringify(value)) ;
}
