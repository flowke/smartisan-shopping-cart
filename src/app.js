import {Redirect} from 'react-router-dom';
import ShopLayout from 'layout/ShopLayout';
import Header from 'container/Header'
import {
    ShopView,
    GoodsDetailView,
    CartView
} from 'route';

export default (
    <div>
        <Route exact path="/" render={()=><Redirect to="/shop"/>}/>
        <Route path="/shop" render={ ()=>{
            return (
                <ShopLayout>
                    <Route exact path="/shop" component={ShopView}/>
                    <Route path="/shop/item/:id" component={GoodsDetailView}/>
                </ShopLayout>
            );
        } }/>
        <Route path="/cart" render={()=>{
            return (
                <div id="app">
                    <Header isCartIconShow={false}/>
                    <CartView/>
                </div>
            )
        }}/>
    </div>
);
