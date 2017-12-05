import ShopLayout from 'layout/ShopLayout';
import {Shop} from 'route';

export default (
    <div>
        <Route path="/" render={ ()=>{
            return (
                <ShopLayout>
                    <Route exact path="/" component={Shop}/>
                    <Route path="/shop" component={Shop}/>
                </ShopLayout>
            );
        } }/>
    </div>
);
