

export default function(props){
    return (
        <div className="cart-top-items" >
            <div className="cart-items">
                <div className="items-choose">
                    <span
                        className={`blue-checkbox-new ${props.isChecked ? 'checkbox-on' : ''}`}
                        onClick={()=>props.toggleOneChecked(props.skuId)}
                    >
                        <a></a>
                    </span>
                </div>
                <div className="items-thumb">
                    <img src={`${props.img}?x-oss-process=image/resize,w_80/quality,Q_100/format,webp`}/>
                    <a href="javascript:;" target="_blank"></a>
                </div>
                <div className="name hide-row">
                    <div className="name-table">
                        <a href="javascript:;" target="_blank">{props.title}</a>
                        <ul className="attribute">
                            <li>{props.color}</li>
                        </ul>
                    </div>
                </div>
                <div className="operation">
                    <a
                        className="items-delete-btn"
                        onClick={()=>props.removeOneItem(props.skuId)}
                    ></a>
                </div>

                <div className="subtotal">¥ {
                    Number(props.price)*props.count
                }.00</div>

                <div className="item-cols-num">
                    <div className="select js-select-quantity">
                        <span
                            className={`down ${props.count===1?'down-disabled':''}`}

                            onClick={()=>{
                                if(props.count===1) return;
                                props.updateCartCountAction(props.skuId, -1);
                            }}
                        >-</span>
                        
                        <span className="num">{props.count}</span>

                        <span
                            className={`up ${props.count===5 ? 'up-disabled':''}`}
                            onClick={()=>{
                                if(props.count>=5)return;
                                props.updateCartCountAction(props.skuId, 1);
                            }}
                        >+</span>

                    </div>
                </div>
                <div className="price">¥ {props.price}</div>
            </div>
        </div>
    )
}
