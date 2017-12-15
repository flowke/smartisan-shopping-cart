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

    //
    selectOtherStyle = (id)=>{

    }

    calcStyleStatus(curtAttrInfo, specV2, skuList){
        let arr = curtAttrInfo.keys();

        function a(arr, mainArr, subArr, indxM, indxS){

            let spec = arr[indx];

            spec.spec_values.forEach(item=>{

                subArr.push({
                    spec_id: spec.spec_id,
                    value: item.spec_value_id
                });

                if(arr.length !== indx+1  ){
                    if(){}
                    a(arr, mainArr, subArr, ++indx);
                };

            });
        };

        specV2.forEach((spec, i)=>{
            let spec_value_arr = [];
            spec.spec_values.forEach({value, j}=>{
                spec_value_arr.push({
                    spec_id: spec,
                    value: spec_value_id,
                })
            })

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
            attr_info,
            shop_info,
            sku_list
        } = this.props.detailData;

        let {aliImagesIndx} = this.state;

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

                                // 表明哪个属性的选项被勾选 （红色还是蓝色，3.5的接口还是 type-c）
                                let canCheck = sku_list.some(item=> (

                                    item.attr_info[spec_id].spec_value_id === id
                                ));
                                let isChecked = attr_info[spec_id].spec_value_id === id;
                                console.log(canCheck, isChecked);
                                return (
                                    <li
                                        key={id}
                                        className={
                                            !canCheck ? 'disable' : (
                                                isChecked ? 'cur' : ''
                                            )
                                        }
                                    >
                                        <a
                                            onClick={()=>this.selectOtherStyle( canCheck )}
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
