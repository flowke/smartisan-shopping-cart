import ShopLayout from 'layout/ShopLayout';
import {ShopView} from 'route';

export default (
    <div>
        <Route path="/" render={ ()=>{
            return (
                <ShopLayout>
                    <Route exact path="/" component={ShopView}/>
                    <Route path="/shop" component={ShopView}/>
                </ShopLayout>
            );
        } }/>
    </div>
);
