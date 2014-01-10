# better-details-polyfill [![Build Status](https://api.travis-ci.org/chemerisuk/better-details-polyfill.png?branch=master)](http://travis-ci.org/chemerisuk/better-details-polyfill)
> `<details>` polyfill for [better-dom](https://github.com/chemerisuk/better-dom)

[LIVE DEMO](http://chemerisuk.github.io/better-details-polyfill/)

## Installing
Use [bower](http://bower.io/) to download this extension with all required dependencies.

    bower install better-details-polyfill

This will clone the latest version of the __better-details-polyfill__ into the `bower_components` directory at the root of your project.

Then append the following html elements on your page:

```html
<html>
<head>
    ...
    <!--[if IE]>
        <link href="bower_components/better-dom/dist/better-dom-legacy.htc" rel="htc"/>
        <script src="bower_components/better-dom/dist/better-dom-legacy.js"></script>
    <![endif]-->
    <link href="bower_components/better-details-polyfill/dist/better-details-polyfill.css" rel="stylesheet"/>
</head>
<body>
    ...
    <script src="bower_components/better-dom/dist/better-dom.js"></script>
    <script src="bower_components/better-details-polyfill/dist/better-details-polyfill.js"></script>
</body>
</html>
```

## Browser support
* Chrome
* Safari 6.0+
* Firefox 16+
* Opera 12.10+
* IE8+