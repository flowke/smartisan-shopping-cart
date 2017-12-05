import './cart.css';

export default class CarPanel extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <li className="nav-cart">
                <a href="javascript:;" className="ball-rect">购物车</a>
                {/* <!--根据className改变颜色--> */}
                <span className={`cart-num ${ 0? "cart-num-have":''}` }>
                    <i>{0}</i>
                </span>
                <div className="nav-cart-wrapper" >
                    <div className="nav-cart-list">
                        <div className="empty">
                            <h3>购物车为空</h3>
                            <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                        </div>
                        <div className="full">
                            <div className="nav-cart-items">
                                <ul>
                                    <li className="clear">
                                        <div className="cart-item js-cart-item cart-item-sell">
                                            <div className="cart-item-inner">
                                                <div className="item-thumb">
                                                    <img />
                                                </div>
                                                <div className="item-desc">
                                                    <div className="cart-cell">
                                                        <h4>
                                                            <a href="/item">{'item.title'}</a>
                                                        </h4>
                                                        <p className="attrs">
                                                            <span>{'item.spec_json.show_name'}</span>
                                                        </p>
                                                        <h6>
                                                            <span className="price-icon">¥</span><span className="price-num">{'item.price'}</span><span className="item-num">x {'item.count'}</span>
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="del-btn">删除</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-cart-total">
                                <p>共 <strong className="ng-binding">{'count'}</strong> 件商品</p>
                                <h5>合计：<span className="price-icon">¥</span><span className="price-num">{'totle'}</span></h5>
                                <h6>
                                    {/* <router-link to="/cart" className="nav-cart-btn">去购物车</router-link> */}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <transition
                    name="ball"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    v-bind:css="true"
                    >
                    <div className="addcart-mask" v-show="ball.show">
                        <img className="mask-item"></img>
                    </div>
                </transition> */}
            </li>
        )
    }
}
