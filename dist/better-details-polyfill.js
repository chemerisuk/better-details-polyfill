/**
 * @file src/better-details-polyfill.js
 * @version 1.0.0-beta.2 2014-01-20T18:21:11
 * @overview <details> polyfill for better-dom
 * @copyright Maksim Chemerisuk 2014
 * @license MIT
 * @see https://github.com/chemerisuk/better-details-polyfill
 */
(function(DOM, undefined) {
    "use strict";

    var supportsDetails = typeof DOM.create("details").get("open") === "boolean";

    DOM.extend("details", !supportsDetails, {
        constructor: function() {
            var summary = this.child(0, "summary");

            summary
                .set("tabindex", 0) // make summary focusable
                .on("click", this.doToggleOpenState.bind(this))
                .on("keydown", this.onKeyDown.bind(this, this.doToggleOpenState), ["which"]);
        },
        doToggleOpenState: function() {
            this
                .set("open", this.get("open") == null ? "open" : null);
        },
        onKeyDown: function(doToggleOpenState, key) {
            if (key === 13 || key === 32) {
                doToggleOpenState.call(this);

                return false;
            }
        }
    });
}(window.DOM));
