
// import {Link} from 'component/routeLink';
import {Link} from 'react-router-dom';

import './goodsListItem.css';

export default class GoodsItem extends Component{

    state = {
        curtItemIndx: 0
    }

    // 切换不同外观
    switchOption = (indx)=>{
        this.setState({curtItemIndx:indx});
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
        let {curtItemIndx} = this.state;
        // 当前显示的外观物品
        let curtItem = sku_list[curtItemIndx];

        let optionItemComp = sku_list.map((item,indx)=>{
            return (
                <li key={item.sku_id} >
                    <span
                        href="javascript;"
                        className={curtItemIndx===indx ? "active" : ''}
                        onClick={()=>switchOption(indx)}
                    >
                        <img
                            src={item.image}
                        />
                    </span>
                </li>
            );
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
                            curtItem.direct_to_cart === true ? (
                                <span
                                    click="addCarPanelHandle(item.sku_info[itemIndex])" className="item-blue-btn"
                                >
                                加入购物车 </span>
                            ) : null
                        }

                    </div>
                    <div className="item-price clearfix">
                        <i>¥</i><span>{curtItem.price}</span>
                    </div>
                    <div className="discount-icon">false</div>
                    <div className="item-cover">
                        <Link to={{
                            pathname: `/shop/item/${id}`,
                            search: `id=${curtItem.sku_id}`
                        }}></Link>

                    </div>
                </div>
            </div>
        )
    }
}
