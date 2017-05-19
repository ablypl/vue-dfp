# Vue DoubleClick for Publishers
## Installation

```
npm install vue-doubleclick
```

Then require the plugin in you js file:

```javascript
import DoubleClick from 'vue-doubleclick';

Vue.use(DoubleClick, {
    id: '{your-dfp-id}'
});
```

Afterwards you can you BannerAd component:

```html
<google-ad unit="{Ad Unit Name}"></google-ad>
```

Component generates random container id, however you can pass your own value 

```html
<google-ad unit="{Ad Unit Name}" id="my-container-id"></google-ad>
```

## Mappings

Plugin allows you to define custom mappings (forcing ad size on different screens):

```javascript
let mappings = {
    rectangle: [
        { window: [0, 0], sizes: [[300, 250], [300, 300],[300, 100],[250, 250]] },
        { window: [1050, 350], sizes: [[250, 250], [300, 250], [300, 100], [300, 600], [240, 400], [160, 600], [120,600]] },
    ],
    banner: [
        { window: [0, 0], sizes: [[300, 250], [300, 300],[300, 100],[250, 250]] },
        { window: [750, 200], sizes: [[750, 300], [750, 200], [300, 300], [300,250], [750, 100], [728, 90], [600,200]] },
        { window: [1050, 350], sizes: [[1200, 400], [970, 90], [750, 300], [750, 200], [750, 100], [728, 90], [600,200], [900,300], [970, 250], [970, 415]] },
        { window: [1200, 350], sizes: [[1200, 600], [1200, 400]] },
    ]
};
```

and then pass it as another option at install:

```javascript
Vue.use(DoubleClick, {
    id: '{your-dfp-id}',
    mappings
});
```

## Ad Unit Sizes

You should define your own Ad Unit Sizes, however this plugin is delivered with 2 base sizes: 
```javascript
let sizes = {
    banner: [[1200, 600], [1200, 400], [300, 250], [300, 300]],
    rectangle: [ [300, 250], [300, 300], [300, 600]]
};
```

If you define your own sizes, pass them just like mappings

```javascript
Vue.use(DoubleClick, {
    id: '{your-dfp-id}',
    sizes
});
```

Contributing
------------

Any and all contributions will be greatly appreciated.