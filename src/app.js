import ShopLayout from 'layout/ShopLayout';
import {
    ShopView,
    GoodsDetailView
} from 'route';

export default (
    <div>
        <Route path="/" render={ ()=>{
            return (
                <ShopLayout>
                    <Route exact path="/" component={ShopView}/>
                    <Route exact path="/shop" component={ShopView}/>
                    <Route path="/shop/item/:id" component={GoodsDetailView}/>
                </ShopLayout>
            );
        } }/>
    </div>
);
