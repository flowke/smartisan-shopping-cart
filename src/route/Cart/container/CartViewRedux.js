import goodsAPI from 'api/goodsAPI';

const initState = {
    isLoading: true,
    error: false,
    isCountOverflow: false,
    cartInfo:[],
    animInfo:{
        isInAnim: false,
        startingPoint: {},
        targetPoint: {},
        imgSrc: '',
    }
};

const UPDATE_CART_INFO = 'UPDATE_CART_INFO/shopping-cart/cartView';
const INIT_CART_INFO = 'INIT_CART_INFO/shopping-cart/cartView';
const SWITCH_CAET_COUNT_OVERFLOW = 'SWITCH_CAET_COUNT_OVERFLOW/shopping-cart/cartView';
const ADD_NEW_ONE_TO_CART = 'ADD_NEW_ONE_TO_CART/shopping-cart/cartView';
const TOGGLE_ANIM_IN_STATUS = 'TOGGLE_ANIM_IN_STATUS/shopping-cart/cartView';


/**
 * start 提供内部部使用的 action
 */
const updateCartInfoAction = (cartInfo)=>dispatch=>dispatch({type: UPDATE_CART_INFO, payload: cartInfo});
// const initCartInfoAction = (cartInfo)=>dispatch=>dispatch({type: INIT_CART_INFO, payload: cartInfo});
const toggleAnimInStatusAction = (animInfo={isInAnim: false})=>dispatch=>dispatch({type: TOGGLE_ANIM_IN_STATUS, payload: animInfo});

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

            dispatch(
                {
                    type:ADD_NEW_ONE_TO_CART,
                    payload:[...cartInfo, goods]
                }
            );
        }
    });

}


/**
 * end 提供 内部 部使用的 action
 */

// ***********************************************************

/**
 * start 提供给外部使用的 action
 */

// 用于初始化 购物车信息
// 比如在刚刷新页面的时候，期望过去购物车商品信息
// 如果 localstorage 里面有信息，就请求对应的商品信息
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

                dispatch({type:INIT_CART_INFO, payload:cartInfo});
            }

        } );
}

// 添加到购物车的动作，它牵扯到很多其他 action
// 大多数添加到购物车的动作都会先从这里进入
// 你需要知道那个 商品id， 要添加多少件，甚至一些动画相关的信息
const addToCartAction = (skuId, count=1, startingPoint={}, imgSrc)=> (dispatch, getState)=> {

    let {animInfo} = getState().cart;

    // 如果当前处在动画中，不能添加到购物车
    if(animInfo.isInAnim === true) return;

    let storageITEM = getStorageITEM();

    // 如果之前被添加到购物车，就得检查还能不能添加，不能超过最大购买数量
    // 超过数量会发生退出
    if(storageITEM.hasOwnProperty(skuId)){
        let item = storageITEM[skuId];
        if(count+item.count>item.maxCount){
            dispatch( switchCartCountPromptAction(true) );
            return;
        }
    }

    dispatch( toggleAnimInStatusAction({
        isInAnim: true,
        startingPoint,
        imgSrc
    }) );

    // 这里定时器的间隔时间相对于
    // 动画组件的时间进行偏移
    setTimeout(()=>{

        // 如果 localstorage 没有相关记录, 说明添加一个新的
        // 否则就是更新一下某个 被添加商品的数量
        if( !storageITEM.hasOwnProperty(skuId) ){

            dispatch( addNewOneToCartAction(skuId, count) );

        // 如果 localStorage 里面有相关记录, 说明更新某一个被添加商品的数量
        }else{
            dispatch( updateCartCountAction(skuId, count) );
        }

        dispatch( toggleAnimInStatusAction({
            isInAnim: false,
            startingPoint:{},
            imgSrc: undefined
        }));

    }, 600);

}

// 更新某件购物车中商品的数量
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

// 从购物车中移除一批购物车的商品
// 它接收一个 商品 id 的数组
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

// 提示是否超出最大添加到购物车的属性
const switchCartCountPromptAction=(isShow=false)=>dispatch=>{

    dispatch({type:SWITCH_CAET_COUNT_OVERFLOW, payload: isShow});
}

/**
 * end 提供给外部使用的 action
 */



export default function cart(state=initState, action) {

    let {
        type,
        payload
    } = action;

    switch (type) {
        case UPDATE_CART_INFO:
        case INIT_CART_INFO:
        case ADD_NEW_ONE_TO_CART:
            return {
                ...state,
                cartInfo: [...payload]
            };
        case SWITCH_CAET_COUNT_OVERFLOW:
            return {
                ...state,
                isCountOverflow: payload
            };
        case TOGGLE_ANIM_IN_STATUS:
            return {
                ...state,
                animInfo: {
                    ...state.animInfo,
                    ...payload
                }
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
    switchCartCountPromptAction,
    toggleAnimInStatusAction
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
