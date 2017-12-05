
import './goodsItem.css';

export default class GoodsItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="item">
                <div>
                    <div className="item-img"><img alt="item.name" src="item.sku_info[itemIndex].ali_image" style={{opacity: 1}}/>
                    </div>
                    <h6>{'item.name'}</h6>
                    <h3>{'item.name_title'}</h3>
                    <div className="params-colors">
                        <ul className="colors-list">
                            <li key="index" >
                                <a href="javascript;" click="tableData(index)" data-index="index" title="sku.spec_json.show_name" className="{'active'index==itemIndex}"><img src="'http//img01.smartisanos.cn/'+ sku.spec_json.image +'/20X20.jpg'"/></a>
                            </li>
                        </ul>
                    </div>
                    <div className="item-btns clearfix">
                        <span className="item-gray-btn"><router-link to="{name 'Item', query {itemIditem.sku_info[itemIndex].sku_id}}">查看详情</router-link> </span>
                        <span click="addCarPanelHandle(item.sku_info[itemIndex])" className="item-blue-btn">加入购物车 </span>
                    </div>
                    <div className="item-price clearfix">
                        <i>¥</i><span>{'item.price'}</span>
                    </div>
                    <div className="discount-icon">false</div>
                    <div className="item-cover">
                        <router-link to="{name 'Item', query {itemIditem.sku_info[itemIndex].sku_id}}"></router-link>
                    </div>
                </div>
            </div>
        )
    }
}
