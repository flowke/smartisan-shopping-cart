
import K from 'k';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            f: 79
        }
    }

    cla = ()=>{
        this.setState({f:Math.random()})
    }

    render(){

        return (
            <div
                onClick={this.cla}
            >{this.state.f}
                <K a={888}></K>
            </div>
        )
    }
}

ReactDOM.render(
    <div><App></App></div>,
    document.getElementById('root')
);


if(module.hot){
    module.hot.accept()
}
