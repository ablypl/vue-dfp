'use strict';

export default {
    sizes : {
        banner: [[1200, 600], [1200, 400], [300, 250], [300, 300]],
        rectangle: [ [300, 250], [300, 300], [300, 600]]
    },
    /**
     * Install DoubleClick Plugin
     * @param Vue
     * @param options
     */
    install(Vue, options){
        Vue.component('google-ad', require('./components/BannerAd'));

        this.init(options, Vue)
    },
    /**
     * Initialize google tag manager
     * @param options
     */
    init(options, Vue){
        window.googletag = {};
        let googledfpviewable = 0;
        googletag.cmd = googletag.cmd || [];
        let gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';
        let useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') +
            '//www.googletagservices.com/tag/js/gpt.js';
        let node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);

        googletag.cmd.push(() => {
            this.extractOptions(options, Vue);

            googletag.pubads().enableSingleRequest();
            //googletag.pubads().enableSyncRendering();
            googletag.pubads().collapseEmptyDivs();
            // googletag.pubads().disableInitialLoad();
            googletag.enableServices();
            //googletag.display('dynamicload');
            // googletag.pubads().refresh();
        });

    },

    /**
     * Extract plugin options
     * @param options
     */
    extractOptions(options, Vue){
        options.sizes = Object.assign(this.sizes, options.sizes);
        options.mappings = this.prepareMappings(options.mappings);

        if(!options.default_size) {
            options.default_size = "banner";
        }

        Vue.prototype.$doubleclick = options;
    },

    /**
     * Prepare mapped sizes
     * @param mappings
     * @returns {*}
     */
    prepareMappings(mappings){
        Object.keys(mappings).forEach((key) => {
            mappings[key] = this.mapSize(mappings[key])
        });

        return mappings;
    },
    /**
     * Map single size
     * @param mapping
     * @returns {*}
     */
    mapSize(mapping){
        let mapper = googletag.sizeMapping();

        mapping.forEach((map) => {
            mapper.addSize(map.window, map.sizes)
        });

        return mapper.build();
    },
}
