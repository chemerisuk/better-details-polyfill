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
            var state = this.get("open") == null ? "open" : null;

            this
                .set("open", state)
                // trigger reflow in legacy IE
                .style("zoom", state === "open" ? 0 : 1);
        },
        onKeyDown: function(key) {
            if (key === 13 || key === 32) {
                this._toggleOpenState();

                return false;
            }
        }
    });
}(window.DOM));
