const restful = require('./lib/restful');
const router = require('./lib/router-add-one');

hexo.extend.generator.register('restful', function(site) {
    let {config,theme:{config:themeConfig}} = hexo;
    return restful(config, themeConfig, site);
});

hexo.extend.generator.register('router-add-one',function(site){
    return router(site)
})