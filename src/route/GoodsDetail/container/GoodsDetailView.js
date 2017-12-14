import qs from 'query-string';
import {bindActionCreators} from 'redux';
import {actions} from './GoodsDetailViewRedux';
import {Link} from 'react-router-dom';

import Loading from 'component/Loading/loading';

import '../assets/style/goodsDetail.css';

@connect(
    state=>{
        let a =null;
        let {
            goodsDetail
        } = state;

        return {
            ...goodsDetail
        }
    },
    dispatch=>bindActionCreators(actions,dispatch)
)
export default class GoodsDetailView extends Component{

    state = {
        aliImagesIndx: 0
    }

    // 切换同一款式的 不同展示图片
    switchAliImagesIndx = (indx)=>{
        this.setState({
            aliImagesIndx: indx
        });
    }

    componentDidMount(){
        let {id} = qs.parse(this.props.location.search);
        // 请求商品详情数据
        this.props.getGoodsDetailAction(id);
    }

    render(){

        let {isLoading, error , detailData} = this.props;

        if(isLoading){
            return <Loading/> ;
        }

        let {
            id,
            price,
            spu_id,
            shop_info,
            sku_list
        } = this.props.detailData;

        let {aliImagesIndx} = this.state;

        let { ali_images } = shop_info;

        let sepcV2Comp = shop_info.spec_v2.map(spec=>{
            let {spec_id, spec_values, show_type} = spec;
            return (
                <div
                    key={spec.spec_id}
                    className="sku-dynamic-params clear"
                >
                    <span className="params-name">{spec.spec_name}</span>

                    {/* 不同属性的展示 */}
                    <ul
                        className={
                            show_type === '2' ? 'params-colors' : 'params-normal'
                        }
                    >
                        {
                            spec_values.map(spec_value=>{
                                let {id, show_name, image} = spec_value;
                                return (
                                    <li
                                        key={id}
                                        className="{'cur': shopDetailList.attr_info[spec.spec_id].spec_value_id == values.id}"
                                        className={
                                            spec.show_type === '1' ? 'cur' : ''
                                        }
                                    >
                                        <a>
                                            {
                                                spec.show_type === '2' ? (
                                                    <img src={image}/>
                                                ) : (
                                                    <span>{show_name}</span>
                                                )
                                            }

                                        </a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            )
        });

        return (
            <div id="main" >
                <div className="store-content item">
                    <div className="item-box">

                        <div className="gallery-wrapper">
                            <div className="gallery">
                                <div className="thumbnail">
                                    <ul>
                                        {
                                            ali_images.map((src,indx)=>{

                                                return (
                                                    <li
                                                        key={indx}
                                                        onClick={()=>this.switchAliImagesIndx(indx)}
                                                    >
                                                        <img src={`${src}?x-oss-process=image/resize,w_54/quality,Q_90/format,webp`}
                                                        />
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                                <div className="thumb">
                                    <ul>
                                        <li className="on">
                                            <img src={`${ali_images[aliImagesIndx]}?x-oss-process=image/resize,w_440/quality,Q_90/format,webp`}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="banner">
                            <div className="sku-custom-title">
                                <div className="params-price">
                                    <span><em>¥</em><i>{price}</i></span>
                                </div>
                                <div className="params-info">
                                    <h4>{shop_info.title}</h4>
                                    <h6>{shop_info.sub_title}</h6>
                                </div>
                            </div>
                            <div className="sku-dynamic-params-panel">
                                {/* 选择不同的款式 */}
                                { sepcV2Comp }

                                <div className="sku-dynamic-params clear">
                                    <div className="params-name">数量</div>
                                    <div className="params-detail clear">
                                        <div className="item-num js-select-quantity">
                                            <span
                                                click="minusHandle"
                                                className='{"down-disabled": num == 1}'
                                                className="down"
                                            >-</span>
                                            <span className="num">{3}</span>
                                            <span
                                                click="addHandle"

                                                className='{"down-disabled": num == 5}'
                                                className="up"
                                            >+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sku-status">
                                <div className="cart-operation-wrapper clearfix">
                                    <span
                                        click="addCar"
                                        className="blue-title-btn js-add-cart"
                                    >
                                        <a>加入购物车</a>
                                    </span>
                                    <span className="gray-title-btn"><a>现在购买</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Modal v-model='visble'>
                        <div className="confirm-msg">商品已达到最大可购买数量，无法继续添加</div>
                </Modal> */}
                </div>
        )
    }
}
