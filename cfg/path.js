const path = require('path');

const rv = (...a)=>path.resolve(__dirname, '../',...a);

module.exports = {
    root: rv('./'),
    dist: rv('dist'),
    src: rv('src'),
    common: rv('src/common'),
    component: rv('src/component'),
    config: rv('src/config'),
    container: rv('src/container'),
    layout: rv('src/layout'),
    route: rv('src/route'),
    store: rv('src/store'),
    public: rv('public'),
    node_modules: rv('node_modules')
};
