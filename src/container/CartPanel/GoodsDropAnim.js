import {Transition} from 'react-transition-group';

import './goodsDropAnim.css';


export default function GoodsDropAnim(props){

    let {
        timeout,
        animInfo:{
            isInAnim,
            startingPoint,
            imgSrc
        },
        toggleAnimInStatusAction
    } = props;

    // 图片dom 元素
    let animPic = null;

    let animStyle = {
        entered: {
            transform: 'translate3d(0,0,0)',
            transition: '1s transform cubic-bezier(.17,.67,.26,1)'
        },
        exited: {
            display: 'none'
        }
    };

    return (
        <Transition
            in={isInAnim}
            timeout={10}
            exit={false}
            onEnter={(targetEle)=>{
                targetEle.style.display = 'block';
                let targetPoint = targetEle.getBoundingClientRect();

                let offsetX = -(targetPoint.left - startingPoint.left);
                let offsetY = -(targetPoint.top - startingPoint.top);

                animStyle.entering = {
                    transform: `translate3d(0,${offsetY}px,0)`,
                }
            }}
        >
            {(status)=>{

                return (
                    <div
                        className={`ball-wrap`}
                        style={{
                            ...animStyle[status]
                        }}
                    >
                        <img
                            className="ball-img"
                            ref={el=>animPic=el}
                            src={imgSrc}
                        />
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
    // imgSrc: PT.string.isRequired
}
