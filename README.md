# better-details-polyfill<br>[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Bower version][fury-image]][fury-url]
> `<details>` polyfill for [better-dom](https://github.com/chemerisuk/better-dom)

The goal for this project is to create a robust polyfill for the `<details>` element which provides consistent behavior in every browser (see [browser support](#browser-support)), so you can use this new element on your pages today.

[LIVE DEMO](http://chemerisuk.github.io/better-details-polyfill/)

## Features
* [live extension](https://github.com/chemerisuk/better-dom/wiki/Live-extensions) - works for current and future content
* `open` attribute support
* fires `toggle` event on open state change
* keyboard and ARIA-friendly
* fully customisable via CSS

## Installing
Use [bower](http://bower.io/) to download this extension with all required dependencies.

    $ bower install better-details-polyfill

This will clone the latest version of the __better-details-polyfill__ into the `bower_components` directory at the root of your project.

Then append the following tags on your page:

```html
<script src="bower_components/better-dom/dist/better-dom.js"></script>
<script src="bower_components/better-details-polyfill/dist/better-details-polyfill.js"></script>
```

## Browser support
#### Desktop
* Chrome
* Safari 6.0+
* Firefox 16+
* Opera 12.10+
* Internet Explorer 8+ (see [notes](https://github.com/chemerisuk/better-dom#notes-about-old-ies))

#### Mobile
* iOS Safari 6+
* Android 2.3+
* Chrome for Android

[travis-url]: http://travis-ci.org/chemerisuk/better-details-polyfill
[travis-image]: http://img.shields.io/travis/chemerisuk/better-details-polyfill/master.svg

[coveralls-url]: https://coveralls.io/r/chemerisuk/better-details-polyfill
[coveralls-image]: http://img.shields.io/coveralls/chemerisuk/better-details-polyfill/master.svg

[fury-url]: http://badge.fury.io/bo/better-details-polyfill
[fury-image]: https://badge.fury.io/bo/better-details-polyfill.svg

