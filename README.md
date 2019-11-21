# rhy-chunkfilename-loader
use to rename the webpack's chunkfilename in import lib by async progress


```javascript
{
    test: /\.js$/,
    use: [{
            loader: 'rhy-chunkfilename-loader',
            options: {
                appPageRoot:path.join('src','pages')
            }
        }]
}

```

``` javascript
/* webpackChunkName: "asyncComponent" */ ===>/* webpackChunkName: "./[mutiplydirname]/static/components/asyncComponent" */

```