var generator = require('./lib/restful');

hexo.extend.generator.register('restful', function(site) {
    let {config,theme:{config:themeConfig}} = hexo;
    return generator(config, themeConfig, site);
});
