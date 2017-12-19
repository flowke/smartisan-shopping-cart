import {NavLink} from 'react-router-dom';

import './shopHeader.css';


export default function shopHeader(){
    return (
        <div className="nav-sub">
            <div className="nav-sub-wrapper">
                <div className="container">
                    <ul className="nav-list">
                        <li><a href="javascript:;">首页</a></li>
                        <li><a href="javascript:;">手机</a></li>
                        <li><a href="javascript:;">“足迹系列”手感膜</a></li>
                        <li>
                            <NavLink  to="/" activeClassName="active">
                                官方配件
                            </NavLink>
                        </li>
                        <li><a href="javascript:;">第三方配件</a></li>
                        <li><a href="javascript:;">全部商品</a></li>
                        <li><a href="javascript:;">服务</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
