import {Link} from 'react-router-dom';

import CarPanel from 'container/CarPanel';

import './header.css';

export default class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="header">
                <div className="nav-global">
                    <div className="container">
                        <h1 className="nav-logo">
                            <a href="javascript:;"></a>
                        </h1>
                        <ul className="nav-aside">
                            <li className="nav-user">
                                <Link to="/account">个人中心</Link>
                                {/* <!--active--> */}
                                <div className="nav-user-wrapper">
                                    <div className="nav-user-list">
                                        <dl className="nav-user-avatar">
                                            <dd><span className="ng-scope"></span></dd>
                                            <dt className="ng-binding">+86 138****9453</dt>
                                        </dl>
                                        <ul>
                                            {/* <li className="order"><Link to="/account" exact>我的订单</Link></li> */}
                                            {/* <!--<li className="support"><a href="javascript:;">售后服务</a></li>
                                                <li className="coupon"><a href="javascript:;">我的优惠</a></li>
                                            <li className="information"><a href="javascript:;">账户资料</a></li>--> */}
                                            {/* <li className="address"><Link to="/address">收货地址</Link></li> */}
                                            {/* <!--	<li className="logout"><a href="javascript:;">退出</a></li>--> */}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            {/* <!--active--> */}
                            <CarPanel/>
                            {/* <car-panel className="nav-cart"></car-panel> */}
                        </ul>
                        <ul className="nav-list">
                            <li><a href="javascript:;">在线商城</a></li>
                            <li><a href="javascript:;">坚果 Pro</a></li>
                            <li><a href="javascript:;">Smartisan M1 / M1L</a></li>
                            <li><a href="javascript:;">Smartisan OS</a></li>
                            <li><a href="javascript:;">欢喜云</a></li>
                            <li><a href="javascript:;">应用下载</a></li>
                            <li><a href="javascript:;">官方论坛</a></li>
                        </ul>
                    </div>
                </div>
                <div className="nav-sub">
                    <div className="nav-sub-wrapper">
                        <div className="container">
                            <ul className="nav-list">
                                <li><a href="javascript:;">首页</a></li>
                                <li><a href="javascript:;">手机</a></li>
                                <li><a href="javascript:;">“足迹系列”手感膜</a></li>
                                <Link to="/"> 官方配件 </Link>
                                <li><a href="javascript:;">周边产品</a></li>
                                <li><a href="javascript:;">第三方配件</a></li>
                                <li><a href="javascript:;">全部商品</a></li>
                                <li><a href="javascript:;">服务</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
