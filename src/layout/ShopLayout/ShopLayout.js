import Header from 'container/Header';
import ShopHeader from 'component/ShopHeader';

export default class ShopLayout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {children} = this.props;
        return (
            <div id="app">
                <Header>
                    <ShopHeader/>
                </Header>
                {children}
            </div>
        )
    }
}
