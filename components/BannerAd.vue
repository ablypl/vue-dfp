<template>
    <div :id="id"></div>
</template>
<script type="text/babel">
    export default {
        name: 'BannerAd',
        // component variables

        props: {
            id: {
                default: () => {
                    return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1)
                }
            },
            unit: {
                required: true
            },
            size: { },
            slotType: {
                default: 'normal'
            }
        },

        computed: {
            adUnit(){
                return `/${this.$doubleclick.id}/${this.unit}`
            },

            adSize(){
                if(!this.size) {
                    return this.$doubleclick.default_size;
                }
                return this.size
            },

            sizes(){
                try {
                    return this.$doubleclick.sizes[this.adSize];
                } catch(e){
                    return [1200, 400]
                }
            },

            mapping(){
                try {
                    return this.$doubleclick.mappings[this.adSize]
                } catch(e) {
                    console.error(`Mappings for ${this.adSize} ad size is not defined`)
                }
            }
        },

        methods: {
            display() {
                googletag.cmd.push(() => {
                    this.define();
                    googletag.display(this.id)
                });
            },

            define(){
                if(this.slotType === 'out-of-page') {
                    return this.defineOutOfPageSlot();
                }

                return this.defineSlot();
            },

            defineSlot(){
                googletag.defineSlot(this.adUnit, this.sizes, this.id).defineSizeMapping(this.mapping).addService(googletag.pubads());
            },

            defineOutOfPageSlot(){
                googletag.defineOutOfPageSlot(this.adUnit, this.id).addService(googletag.pubads())
            }
        },

        mounted(){
            this.display();
        },

        beforeDestroy () {
            googletag.cmd.push(() => {
                googletag.destroySlots()
            })
        }
    }
</script>

