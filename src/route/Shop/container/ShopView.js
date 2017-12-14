import {bindActionCreators} from 'redux';


import GoodsItem from 'component/GoodsItem/GoodsListItem';
import '../assets/style/shop.css';

import {actions} from './ShopViewRedux';

@connect(
    state=>{
        let {shop} = state;
        return {
            goods: shop.goodsList
        }
    },
    dispatch=>{
        return bindActionCreators(actions,dispatch);
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
            goods // 商品数据
        } = this.props;

        let goodsComp = goods.map(data=>{
            let {
                id, name, price, image_pre
            } = data;
            return (
                <GoodsItem
                    key={data.id}
                    {...data}
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
                {/* <prompt v-if="maxCount"></prompt> */}
            </div>
        )
    }
}
