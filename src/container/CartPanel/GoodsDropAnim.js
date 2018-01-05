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

    let outerStyle = {
        entered: {
            transform: 'translateY(-20px)',
            transition: 'transform 0.6s cubic-bezier(0,0,0.58,1)'
        },
        exited: {
            display: 'none'
        }
    };
    let innerStyle = {
        entered: {
            transform: 'translateX(-40px)',
            transition: 'transform 0.6s cubic-bezier(0,0,1,1)'
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
                console.log(offsetX, offsetY);
                innerStyle.entering = {
                    transform: `translateX(${offsetX-60}px)`,
                }
                outerStyle.entering = {
                    transform: `translateY(${offsetY+40}px)`,
                }

            }}
        >
            {(status)=>{

                return (
                    <div
                        className={`ball-wrap`}
                        style={{
                            ...outerStyle[status]
                        }}
                    >
                        <img
                            className={`ball-img ball-img-${status}`}
                            ref={el=>animPic=el}
                            src={imgSrc}
                            style={{
                                ...innerStyle[status]
                            }}
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
