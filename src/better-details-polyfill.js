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
