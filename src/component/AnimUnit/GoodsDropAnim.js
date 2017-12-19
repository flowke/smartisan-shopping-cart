import {Transition} from 'react-transition-group';

import './goodsDropAnim.css';

export default function GoodsDropAnim(props){

    let {imgSrc, timeout, in: inProp} = props;

    return (
        <Transition
            {...{
                in: inProp,
                mountOnEnter: true,
                timeout
            }}
        >
            {(status)=>{
                return (
                    <div class="addcart-mask">
                        <img
                            class="mask-item"
                            src={imgSrc}
                        ></img>
                    </div>
                )
            }}

        </Transition>

    )
}

GoodsDropAnim.defaultProps = {
    timeout: 400
}

GoodsDropAnim.propTypes = {
    imgSrc: PT.string.isRequired
}
