import {Link} from 'react-router-dom';

export default function(props){
    let {removeFromCartAction} = props;
    return (
        <li className="clear">
            <div className="cart-item js-cart-item cart-item-sell">
                <div className="cart-item-inner">
                    <div className="item-thumb">
                        <img src={props.img}/>
                    </div>
                    <div className="item-desc">
                        <div className="cart-cell">
                            <h4>
                                <a href="/item"></a>
                                <Link
                                    to={{
                                        pathname: `/shop/item/${props.spuId}`,
                                        search: `id=${props.skuId}`
                                    }}
                                > {props.title} </Link>
                            </h4>
                            <p className="attrs">
                                <span>{props.color}</span>
                            </p>
                            <h6>
                                <span className="price">¥</span>
                                <span className="price price-num">{props.price}</span>
                                <span className="item-num">x {props.count}</span>
                            </h6>
                        </div>
                    </div>
                    <div
                        className="del-btn"
                        onClick={()=>{

                            removeFromCartAction([props.skuId])
                        }}
                    >删除</div>
                </div>
            </div>
        </li>
    )
}
