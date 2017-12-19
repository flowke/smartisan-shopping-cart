
import {Link} from 'react-router-dom';

import goodsAPI from 'api/goodsAPI';

import GoodsDropAnim from 'component/AnimUnit/GoodsDropAnim';
import './goodsListItem.css';

export default class GoodsItem extends Component{

    state = {
        curtItemIndx: 0,
        inStoreList: []
    };

    canCheckInStock = true;

    isInStockCheck = false;

    // 切换不同外观
    switchOption = (indx)=>{
        this.setState({curtItemIndx:indx});
    }

    // 请求当前库存
    checkGoodsInStock = ()=>{

        let {sku_list} = this.props;

        let ids = sku_list.map(elt=>elt.sku_id);

        if(!this.canCheckInStock) return;

        this.canCheckInStock = false;

        goodsAPI.getGoodsInfo({
            ids: ids.join(),
            with_stock: true
        })
            .then(({code,data})=>{
                if(code===0){
                    // console.log(code);
                    this.setState({
                        inStoreList: data.list.map(({id,in_stock})=>({
                            id: id.toString(),
                            in_stock
                        }))
                    });
                    // console.log(this.state.inStoreList);
                }
            })
    }

    // 添加到购物车
    addToCart = ()=>{
    }

    render(){

        let {
            switchOption
        } = this;

        let {
            id, name, price, image_pre,
            sku_list
        } = this.props;

        // 当前选择的外观索引
        let {
            curtItemIndx,
            inStoreList
        } = this.state;

        // 当前显示的外观物品
        let curtItem = sku_list[curtItemIndx];

        // 是否显示 添加到购物车或售罄按钮
        let isShowStockButton = !!(
            curtItem.direct_to_cart &&
            curtItem.color_id &&
            inStoreList.length
        );

        // 是否有库存
        let isInStock = !!inStoreList.reduce( (accu,elt)=>{
            return elt.id===curtItem.sku_id ? elt : accu
        },{}).in_stock;


        let optionItemComp = sku_list.map((item,indx)=>{
            return item.color_id ? (
                <li key={item.sku_id} >
                    <span
                        href="javascript;"
                        className={curtItemIndx===indx ? "active" : ''}
                        onMouseOver={()=>switchOption(indx)}
                    >
                        <img
                            src={item.image}
                        />
                    </span>
                </li>
            ) : null

        });

        return (
            <div className="item">
                <div>
                    <div className="item-img">
                        <img
                            alt={curtItem.title}
                            src={curtItem.ali_image}
                            style={{opacity: 1}}/>
                    </div>
                    <h6>{curtItem.title}</h6>
                    <h3>{curtItem.sub_title}</h3>
                    <div className="params-colors">
                        <ul className="colors-list">
                            {optionItemComp}
                        </ul>
                    </div>
                    <div className="item-btns clearfix">
                        <span
                            className="item-gray-btn"
                        >
                            <Link
                                to={{
                                    pathname: `/shop/item/${id}`,
                                    search: `id=${curtItem.sku_id}`
                                }}
                            > 查看详情 </Link>
                        </span>
                        {
                            isShowStockButton ? (
                                isInStock ? (
                                    <span
                                        click="addCarPanelHandle(item.sku_info[itemIndex])" className="item-blue-btn"
                                    >
                                    加入购物车 </span>
                                ) : (
                                    <span
                                        click="addCarPanelHandle(item.sku_info[itemIndex])" className="item-blue-btn"
                                    >
                                    售罄 </span>
                                )

                            ) : null
                        }

                    </div>
                    <div className="item-price clearfix">
                        <i>¥</i><span>{curtItem.price}</span>
                    </div>
                    <div className="discount-icon">false</div>
                    <div
                        className="item-cover"
                    >
                        <Link
                            to={{
                            pathname: `/shop/item/${id}`,
                            search: `id=${curtItem.sku_id}`
                            }}
                            onMouseOver={this.checkGoodsInStock}
                        ></Link>

                    </div>
                </div>
            </div>
        )
    }
}
