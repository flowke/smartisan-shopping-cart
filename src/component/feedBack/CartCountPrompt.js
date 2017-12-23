import './CartCountPrompt.css';
import {bindActionCreators} from 'redux';
import {actions as CartViewActions} from 'route/Cart/container/CartViewRedux';
let {switchCartCountPromptAction} = CartViewActions;
// @connect(
//     s=>({}),
//     d=>bindActionCreators({switchCartCountPrompt},d)
// )
function Prompt(props){
    return (
        <div id="prompt">
            <div className="module-dialog-layer" style={{display: 'block'}}></div>
            <div className="clear module-dialog module-dialog-confirm module-dialog-show" style={{display: 'block', opacity: 1}}>
                <div className="dialog-panel">
                    <div className="topbar">
                        <div className="dialog-tit clear">
                            <h4 className="js-dialog-title">提示</h4>
                        </div>
                        <span
                            className="dialog-close png" onClick={()=>props.switchCartCountPromptAction()}
                        ></span>
                    </div>
                    <div className="dialog-con js-dialog-container">
                        <div className="confirm-msg">商品已达到最大可购买数量，无法继续添加</div>
                    </div>
                    <div className="dialog-btn-wrap clear">
                        <div
                            onClick={()=>props.switchCartCountPromptAction()} className="blue-main-btn normal-main-btn js-dialog-done">
                            <a>确定</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(
    s=>({}),
    d=>bindActionCreators({switchCartCountPromptAction},d)
)(Prompt)
