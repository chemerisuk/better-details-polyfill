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
