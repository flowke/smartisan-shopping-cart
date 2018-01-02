import qs from 'query-string';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import Loading from 'component/Loading/loading';
import Prompt from 'component/feedBack/CartCountPrompt';
import {actions} from './GoodsDetailViewRedux';
import {actions as cartViewActions} from 'route/Cart/container/CartViewRedux';

let {addToCartAction} = cartViewActions;

import '../assets/style/goodsDetail.css';

@connect(
    state=>{
        let a =null;
        let {
            goodsDetail, cart: {isCountOverflow}
        } = state;

        return {
            ...goodsDetail,
            isCountOverflow
        }
    },
    dispatch=>bindActionCreators({
        ...actions,
        addToCartAction
    },dispatch)
)
export default class GoodsDetailView extends Component{

    state = {
        aliImagesIndx: 0,
        buyQuantity: 1
    }

    // 切换同一款式的 不同展示图片
    switchAliImagesIndx = (indx)=>{
        this.setState({
            aliImagesIndx: indx
        });
    }

    // 选择另外一个款式的商品
    selectOtherStyle = (id)=>{

        let {location, history, getGoodsDetailAction} = this.props;
        this.setState({
            aliImagesIndx: 0,
            buyQuantity: 1
        });
        history.push({
            pathname: location.pathname,
            search: qs.stringify({id})
        });
        getGoodsDetailAction(id, true);
    }

    // 为每个选项提供商品 id
    getGoodsID( spec_id, spec_value_id){

        let {attr_info, sku_list} = this.props.detailData;

        // 当前的属性组合
        let newAttrInfo = {
            ...attr_info,
            [spec_id]: {spec_id, spec_value_id}
        };

        // 返回 商品 id 或 null
        return sku_list.reduce( (accu,elt)=>{

            // 遍历sku_list，期望找到一个存在的商品
            // sku_list 是所有商品的组合
            for(let key in elt.attr_info){
                let curtID = newAttrInfo[key].spec_value_id,
                    eltID = elt.attr_info[key].spec_value_id;

                // 发现同一属性 的选项不一样，就退出这一次比较
                // 比如： 颜色比较的时候， 一个是红色，一个是绿色，就退出，说明不是这个商品
                // 如果每一个属性的选项都符合， 红色-红色， 3.5-3.5，
                // 就说明找到了， for 能够正常结束
                if( curtID !== eltID ){
                    return accu;
                };
            };
            // 如果躲避过了这一次循环，那么说明有这件商品存在

            return elt.id;

        }, undefined );

    }

    // 加减 数量
    adjustTheQuantity=(isIncrement=true)=>{
        let {stock=5} = this.props.detailData;

        let factor = 1;
        // 当前件数 1
        if(!isIncrement && this.state.buyQuantity===1){
            return;
        }
        // 当前件数 stock
        if(isIncrement && this.state.buyQuantity>=stock){
            return;
        }

        if(!isIncrement){
            factor = -1;
        }

        this.setState(s=>({buyQuantity: s.buyQuantity + factor}));
    }


    componentWillReceiveProps(nP){
        // 如果切换了路由
        if(nP.location.key!==this.props.location.key){
            let {id} = qs.parse(nP.location.search);

            this.props.getGoodsDetailAction(id, true);
        }
    }

    componentDidMount(){
        let {id} = qs.parse(this.props.location.search);
        // 请求商品详情数据
        this.props.getGoodsDetailAction(id);
    }

    render(){

        let {
            isLoading,
            error ,
            detailData,
            addToCartAction,
            isCountOverflow
        } = this.props;

        if(isLoading){
            return <Loading/> ;
        }

        let {
            id,
            price,
            spu_id,
            attr_info,
            shop_info,
            sku_list,
            stock=5,
        } = this.props.detailData;

        // if(stock===undefined) stock = 5;

        let {aliImagesIndx, buyQuantity} = this.state;

        let { ali_images, spec_v2 } = shop_info;

        let sepcV2Comp = spec_v2.map(spec=>{
            // spec_id 代表那个属性， 是 颜色(1)，还是 接口(19)
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

                                // 当前选项被点击后， 代表的商品 id
                                let goodsID = this.getGoodsID(spec_id, id);
                                // 表明哪个属性的选项被勾选 （红色还是蓝色，3.5的接口还是 type-c）
                                let isChecked = attr_info[spec_id].spec_value_id === id;

                                return (
                                    <li
                                        key={id}
                                        className={
                                            !goodsID ? 'disable' : (
                                                isChecked ? 'cur' : ''
                                            )
                                        }
                                    >
                                        <a
                                            onClick={
                                                !isChecked && goodsID ?
                                                    ()=>this.selectOtherStyle(goodsID)
                                                : undefined
                                            }
                                        >
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
                                                        className={
                                                            aliImagesIndx === indx ? "on": ""
                                                        }
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
                                                onClick={()=>this.adjustTheQuantity(false)}

                                                className={`down ${buyQuantity<=1?"down-disabled":''}`}
                                            >-</span>
                                            <span className="num">{buyQuantity}</span>
                                            <span
                                                onClick={this.adjustTheQuantity}
                                                className={`up ${buyQuantity>=stock?'up-disabled':''}`}
                                            >+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sku-status">
                                {stock>0? (
                                    <div className="cart-operation-wrapper clearfix">
                                        <span
                                            onClick={()=>addToCartAction(id,buyQuantity)}
                                            className="blue-title-btn js-add-cart"
                                        >
                                            <a>加入购物车</a>
                                        </span>
                                        <span className="gray-title-btn"><a>现在购买</a></span>
                                    </div>
                                ):(
                                    <div className="cart-operation-wrapper clearfix">
                                        <span className="gray-title-btn"><a>售罄</a></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {isCountOverflow?(
                    <Prompt></Prompt>
                ):null}
            </div>
        )
    }
}
