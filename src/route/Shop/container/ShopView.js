import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import GoodsItem from 'component/GoodsItem/GoodsItem';
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
class Shop extends Component{
    constructor(props){
        super(props);
    }


    componentDidMount(){
        this.props.getGoodsList();
    }

    render(){
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

                            <GoodsItem/>
                        </div>
                    </div>
                </div>
                {/* <prompt v-if="maxCount"></prompt> */}
            </div>
        )
    }
}

export default Shop
