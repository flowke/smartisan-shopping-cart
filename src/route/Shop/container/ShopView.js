import {bindActionCreators} from 'redux';

import Prompt from 'component/feedBack/CartCountPrompt';
import GoodsItem from 'component/GoodsItem/GoodsListItem';
import '../assets/style/shop.css';

import {actions} from './ShopViewRedux';
import {actions as CartViewActions} from 'route/Cart/container/CartViewRedux';

let {addToCartAction} = CartViewActions;

@connect(
    state=>{
        let {shop, cart:{isCountOverflow}} = state;
        return {
            goods: shop.goodsList,
            isCountOverflow
        }
    },
    dispatch=>{
        return bindActionCreators({...actions, addToCartAction},dispatch);
    }
)
export default class Shop extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //发起商品数据请求
        this.props.getGoodsListAction();
    }

    render(){

        let {
            goods, // 商品数据
            addToCartAction, //添加到购物车
            isCountOverflow, //显示单件商品最大购买量溢出浮层
        } = this.props;

        let goodsComp = goods.map(data=>{
            let {
                id, name, price, image_pre
            } = data;
            return (
                <GoodsItem
                    key={data.id}
                    {...data}
                    {...{
                        addToCartAction
                    }}
                />
            );
        });

        return (
            <div id="main">
                <div className="sku-box store-content">
                    <div className="sort-option">
                        <ul className="line clear">
                            <li><a href="javascript:;" className="active">综合排序</a></li>
                            <li><a href="javascript:;" className="">销量排序</a></li>
                            <li><a href="javascript:;" className="">价格低到高</a></li>
                            <li><a href="javascript:;" className="">价格高到低</a></li>
                        </ul>
                    </div>
                    <div className="gray-box">
                        <div className="item-box">
                            {goodsComp}
                        </div>
                    </div>
                </div>
                {isCountOverflow?<Prompt/>:null}
            </div>
        )
    }
}
