import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import thunk from 'redux-thunk';

import reducer from './reducers';

const history = createHistory();

const routerML = routerMiddleware(history);

const store = function configureStore() {

    if(process.env.NODE_ENV === 'production'){
        let store = createStore(
            reducer,
            compose(
                applyMiddleware(thunk, routerML)
            )
        );

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers', () => {
                store.replaceReducer( reducer );
            });
        }

        return store;
    }else{
        return createStore(
            reducer,
            compose(
                applyMiddleware(thunk, routerML),
                window.devToolsExtension ? window.devToolsExtension() : f=>f
            )
        );
    }
}();

export {history, store};
