
// import {Link} from 'component/routeLink';
import {Link} from 'react-router-dom';

import './goodsItem.css';

export default class GoodsItem extends Component{

    state = {
        curtItemIndx: 0
    }

    render(){
        let {
            id, name, price, image_pre,
            sku_list
        } = this.props;

        let curtItem = sku_list[this.state.curtItemIndx];

        let optionItemComp = sku_list.map(item=>{
            return (
                <li key={item.sku_id} >
                    <span
                        href="javascript;"
                        title="sku.spec_json.show_name"
                        className="{'active'index==itemIndex}"
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
                                to="/aa"
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
                        <Link to="/f"></Link>

                    </div>
                </div>
            </div>
        )
    }
}
