
import {store} from 'store';
import {push} from 'react-router-redux';
import {Link as L, NavLink as NL} from 'react-router-dom';

let wrapper = Comp => (props) => {

    let onClick = (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();

        let {to} = props;

        let params = [];
        
        if(typeof to === 'string'){
            params = [to];
        }else{
            let {state, ...rest} = to;
            params = [rest, state];
        }

        store.dispatch( push(...params) );
    }

    return (
        <Comp
            {...props}
            onClick={onClick}
        />
    )
};

let propTypes = {
    to: PT.oneOfType([
        PT.string,
        PT.object
    ])
};

export const Link = wrapper(L);
export const NavLink = wrapper(NL);

Link.propTypes = NavLink.propTypes = propTypes;
