import Header from 'container/Header';

export default class ShopLayout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {children} = this.props;
        return (
            <div id="app">
                <Header></Header>
                {children}
            </div>
        )
    }
}
