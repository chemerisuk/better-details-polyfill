/**
 * @file src/better-details-polyfill.js
 * @version 1.0.0-beta.1 2014-01-10T23:27:53
 * @overview <details> polyfill for better-dom
 * @copyright Maksim Chemerisuk 2014
 * @license MIT
 * @see https://github.com/chemerisuk/better-details-polyfill
 */
(function(DOM, undefined) {
    "use strict";

    // do nothing if there is a native support
    if(typeof DOM.create("details").get("open") === "boolean") return;

    DOM.extend("details", {
        constructor: function() {
            var summary = this.child(0, "summary");

            summary
                .set("tabindex", 0) // make summary focusable
                .on("click", this._toggleOpenState.bind(this))
                .on("keydown", this.onKeyDown.bind(this), ["which"]);
        },
        _toggleOpenState: function() {
            this
                .set("open", this.get("open") == null ? "open" : null)
                // trigger reflow in legacy IE by toggling a fake class
                .toggleClass("ie8-must-die");
        },
        onKeyDown: function(key) {
            if (key === 13 || key === 32) {
                this._toggleOpenState();

                return false;
            }
        }
    });
}(window.DOM));
