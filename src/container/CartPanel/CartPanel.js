import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import GoodsDropAnim from './GoodsDropAnim';

import {actions as cartViewActions} from 'route/Cart/container/CartViewRedux';

let {initCartInfoAction, removeFromCartAction, toggleAnimInStatusAction} = cartViewActions;

import CartGoodsItem from './CartGoodsItem';
import './cartPanel.css';

@connect(
    state=>({
        cartInfo: state.cart.cartInfo,
        animInfo: state.cart.animInfo
    }),
    dispatch=> bindActionCreators( {
        initCartInfoAction,
        removeFromCartAction,
        toggleAnimInStatusAction
    }, dispatch )
)
export default class CartPanel extends Component{

    state = {
        isShowPanel: false
    }

    togglePanel = ()=>{
        this.setState(s=>({isShowPanel: !s.isShowPanel}))
    }

    componentDidMount(){
        this.props.initCartInfoAction();
    }

    render(){

        let {isShowPanel} = this.state;

        let {
            cartInfo,
            animInfo,
            removeFromCartAction,
            toggleAnimInStatusAction
        } = this.props;

        let cartGoodsLength = cartInfo.length;

        // 统计信息，商品件数和价格总计
        let countInfo = cartInfo.reduce( (accu, elt)=>{
            let num = accu.num + elt.count,
                total = accu.total + elt.count*Number(elt.price)
            return { num, total }
        }, {num:0,total:0} );

        return (
            <li
                className="nav-cart"
                onMouseEnter={this.togglePanel}
                onMouseLeave={this.togglePanel}

            >
                <Link to="/cart" className="ball-rect">购物车</Link>
                {/* <!--根据className改变颜色--> */}
                <span className={`cart-num ${ cartGoodsLength? "cart-num-have":''}` }>
                    <i>{countInfo.num}</i>
                </span>

                <div
                    className="nav-cart-wrapper"
                    style={{
                        display: isShowPanel ? 'block': 'none'
                    }}
                >
                    <div className="nav-cart-list">
                        {
                            !cartGoodsLength ? (
                                <div className="empty">
                                    <h3>购物车为空</h3>
                                    <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                                </div>
                            ) : (
                                <div className="full">
                                    <div className="nav-cart-items">
                                        <ul>
                                            {
                                                cartInfo.map((item, indx)=>{
                                                    return (
                                                        <CartGoodsItem
                                                            key={indx}
                                                            {...item}
                                                            {...{
                                                                removeFromCartAction
                                                            }}
                                                        />
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="nav-cart-total">
                                        <p>共 <strong className="ng-binding">{countInfo.num}</strong> 件商品</p>
                                        <h5>合计：<span className="price-icon">¥</span><span className="price-num">{countInfo.total}</span></h5>
                                        <h6>
                                            <Link to="/cart" className="nav-cart-btn">去购物车</Link>
                                        </h6>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* 动画组件 */}
                <GoodsDropAnim
                    {...{
                        toggleAnimInStatusAction,
                        animInfo
                    }}
                />
            </li>
        )
    }
}
