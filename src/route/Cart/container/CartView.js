
import '../assets/cartView.css'

export default class Name extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="main" className="hander-car">
        		<div className="store-content">
        			<div className="cart-box">
        				<div className="title">
        					<h2>购物清单</h2>
        				</div>
        				<div className="cart-inner">
        					<div v-if="count<=0" className="empty-label">
        						<h3>您的购物车中还没有商品</h3>
        						<router-link to="/" className="link">现在选购</router-link>
        					</div>
        					<div v-else="l">
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
        								<div className="cart-top-items" v-for="(item,index) in carPanelData">
        									<div className="cart-items">
        										<div className="items-choose">
        											{/* <span className="blue-checkbox-new" :className="{' checkbox-on':item.checked}" click="checkGoodsHandle(item.sku_id)"><a></a></span> */}
        										</div>
        										<div className="items-thumb">
        											<img src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"/>
                                                    <a href="javascript:;" target="_blank"></a>
                                                </div>
                                                <div className="name hide-row">
                                                    <div className="name-table">
                                                        <a href="javascript:;" target="_blank">{'{item.title}'}</a>
                                                        <ul className="attribute">
                                                            <li>{'{item.spec_json.show_name}'}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="operation">
                                                    {/* <a className="items-delete-btn" click="delCarPanelHandle(item.sku_id)"></a> */}
                                                </div>
                                                <div className="subtotal">¥ {'{item.price*item.count}'}.00</div>
                                                <div className="item-cols-num">
                                                    <div className="select js-select-quantity">
                                                        <span className="down" className="{' down-disabled':item.count<=1}" click="subCarPanelHandle(item.sku_id)">-</span>
                                                        <span className="num">{'{item.count}'}</span>
                                                        <span className="up" className="{' up-disabled':item.count>=item.limit_num}" click="plusCarPanelHandle(item.sku_id)">+</span>

                                                    </div>
                                                </div>
                                                <div className="price">¥ {'{item.price}'}.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="count>0" className="cart-bottom-bg fix-bottom">
                            <div className="cart-bar-operation">
                                <div>
                                    <div className="choose-all js-choose-all">
                                        <span className="blue-checkbox-new" className="{'checkbox-on':allChecked}" click="allGoodsCheckHandle(allChecked)"><a></a></span> 全选
                                    </div>
                                    <div className="delete-choose-goods" click="delCheckGoodsHandle">删除选中的商品</div>
                                </div>
                            </div>
                            <div className="shipping">
                                <div className="shipping-box">
                                    <div className="shipping-total shipping-num">
                                        <h4 className="">
                                            已选择 <i>{'{checkedCount}'}</i> 件商品
                                        </h4>
                                        <h5>
                                            共计 <i >{'{count}'}</i> 件商品
                                        </h5>
                                    </div>
                                    <div className="shipping-total shipping-price">
                                        <h4 className="">
                                            应付总额：<span>￥</span><i >{'{checkedTotle}'}</i>
                                        </h4>
                                        <h5 className="shipping-tips">
                                            应付总额不含运费
                                        </h5>
                                    </div>
                                </div>
                                <span className="jianguo-blue-main-btn big-main-btn js-checkout" className="{'disabled-btn':checkedCount<=0}" click="checkOutHandle"><a>现在结算</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
