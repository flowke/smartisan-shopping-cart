import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {actions} from './CartViewRedux';

let {
    initCartInfoAction,
    updateCartCountAction,
    removeFromCartAction
} = actions;

import CartListItem from '../component/CartListItem';
import '../assets/cartView.css';

@connect(
    state=>({
        cartInfo: state.cart.cartInfo
    }),
    dispatch=>bindActionCreators({
        initCartInfoAction,
        updateCartCountAction,
        removeFromCartAction
    },dispatch)
)
export default class CartView extends Component{

    // 如果已经有购物车信息，直接初始化
    state = (()=>{
        let {cartInfo} = this.props;
        return {
            checkedInfo: cartInfo.reduce((accu,elt)=>{
                return {
                    ...accu,
                    [elt.skuId]: {skuId: elt.skuId, isChecked: true}
                }
            },{})
        }

    })();

    toggleOneChecked = (skuId)=>{

        let item = this.state.checkedInfo[skuId];

        this.setState(s=>({
            checkedInfo: {
                ...s.checkedInfo,
                [skuId]: {
                    ...item,
                    isChecked: !item.isChecked
                }
            }
        }))
    }

    toggleAllChecked = (isAllChecked)=>{
        let {checkedInfo} = this.state;

        let isChecked = !isAllChecked;

        let newInfo = {...checkedInfo};

        for(let key in newInfo){
            newInfo[key] = {
                ...newInfo[key],
                isChecked
            };
        }

        this.setState({
            checkedInfo: newInfo
        })
    }

    removeOneItem=(skuId)=>{
        this.props.removeFromCartAction([skuId]);
        let {checkedInfo} = this.state;

        delete checkedInfo[skuId];

        this.setState({
            checkedInfo
        });

    }

    removeCheckedItem=()=>{
        let {checkedInfo} = this.state;

        let ids = [];
        let newCheckedInfo = {};

        for(let key in checkedInfo){
            if(checkedInfo[key].isChecked){
                ids.push(Number(key));

            }else{
                newCheckedInfo[key] = checkedInfo[key];
            }
        }

        this.props.removeFromCartAction(ids);
        console.log(ids, newCheckedInfo);
        this.setState({
            checkedInfo: newCheckedInfo
        });


    }

    componentWillReceiveProps(nP){
        let {checkedInfo} = this.state;

        let keyLength = Object.keys(checkedInfo).length;

        // 同步信息
        if( !keyLength && nP.cartInfo.length){

            this.setState({
                checkedInfo: nP.cartInfo.reduce((accu,elt)=>{
                    return {
                        ...accu,
                        [elt.skuId]: {skuId: elt.skuId, isChecked: true}
                    };
                },{})
            });
        }
    }

    componentDidMount(){

        this.props.initCartInfoAction();
    }

    getAllCheckedStatus(checkedInfo){

        for(let key in checkedInfo){

            if(!checkedInfo[key].isChecked){
                return false;
            }
        };

        return true;
    }

    render(){

        let {toggleOneChecked, removeOneItem} = this;

        let {
            cartInfo,
            updateCartCountAction,
            removeFromCartAction
        } = this.props;

        let {checkedInfo} = this.state;

        let hasCartItem = cartInfo.length !== 0;

        let isAllChecked = this.getAllCheckedStatus(checkedInfo);

        // 统计信息，商品件数和价格总计
        let countInfo = cartInfo.reduce( (accu, elt)=>{

            let checkedStatus = checkedInfo[elt.skuId].isChecked;

            let {checkedCount, payablAmoun, totalCount } = accu;

            // 如果当期商品选中了
            if(checkedStatus){
                checkedCount+=elt.count;
                payablAmoun+=elt.count*Number(elt.price);
            }
            totalCount+=elt.count;

            return { checkedCount, payablAmoun, totalCount }
        }, {checkedCount:0,totalCount:0, payablAmoun: 0 } );

        return (
            <div id="main" className="hander-car">
        		<div className="store-content">
        			<div className="cart-box">
        				<div className="title">
        					<h2>购物清单</h2>
        				</div>
        				<div className="cart-inner">

                            {!hasCartItem ? (
                                <div v-if="count<=0" className="empty-label">
                                    <h3>您的购物车中还没有商品</h3>
                                    <Link to="/" className="link">现在选购</Link>
                                </div>
                            ) : null}

                            {hasCartItem? (
                                <div>
                                    <div className="cart-table-title">
                                        <span className="name">商品信息</span>
                                        <span className="operation">操作</span>
                                        <span className="subtotal">小计</span>
                                        <span className="num">数量</span>
                                        <span className="price">单价</span>
                                    </div>
                                    <div className="cart-table">
                                        <div className="cart-group">
                                            {/* <!--购物列表--> */}
                                            {cartInfo.map(cartItem=>(
                                                <CartListItem
                                                    key={cartItem.skuId}
                                                    {...cartItem}
                                                    {...{
                                                        isChecked: checkedInfo[cartItem.skuId].isChecked,
                                                        toggleOneChecked,
                                                        updateCartCountAction,
                                                        removeOneItem
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ):null}

                            {hasCartItem? (
                                <div v-if="count>0" className="cart-bottom-bg fix-bottom">
                                    <div className="cart-bar-operation">
                                        <div>
                                            <div
                                                className="choose-all js-choose-all"
                                                onClick={()=>this.toggleAllChecked(isAllChecked)}
                                            >
                                                <span
                                                    className={`blue-checkbox-new ${isAllChecked && 'checkbox-on'}`}
                                                ><a></a></span> 全选
                                            </div>
                                            <div
                                                className="delete-choose-goods"
                                                onClick={this.removeCheckedItem}
                                            >删除选中的商品</div>
                                        </div>
                                    </div>
                                    <div className="shipping">
                                        <div className="shipping-box">
                                            <div className="shipping-total shipping-num">
                                                <h4 className="">
                                                    已选择 <i>{countInfo.checkedCount}</i> 件商品
                                                </h4>
                                                <h5>
                                                    共计 <i >{countInfo.totalCount}</i> 件商品
                                                </h5>
                                            </div>
                                            <div className="shipping-total shipping-price">
                                                <h4 className="">
                                                    应付总额：<span>￥</span><i >{countInfo.payablAmoun}</i>
                                                </h4>
                                                <h5 className="shipping-tips">
                                                    应付总额不含运费
                                                </h5>
                                            </div>
                                        </div>
                                        <span
                                            className="jianguo-blue-main-btn big-main-btn js-checkout"
                                            // className="{'disabled-btn':checkedCount<=0}" click="checkOutHandle"
                                        ><a>现在结算</a></span>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
