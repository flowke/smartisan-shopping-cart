
export default (load) => {

    return class extends Component{

        state = {
            Comp: null
        }

        componentWillReceiveProps(){
            this.load();
        }

        componentDidMount(){
            this.load();
        }

        load(){
            this.setState({Comp:null});
            load().then(Comp=>this.setState({Comp}));
        }

        render(){

            let {Comp} = this.state;
            // console.log(Comp);
            return Comp === null ? Comp : <Comp/>

        }
    }
}
