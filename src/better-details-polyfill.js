(function(DOM) {
    "use strict";

    var SUPPORTS_DETAILS = typeof DOM.create("details").get("open") === "boolean";
    // invoke extension only if there is no native support
    DOM.extend("details", !SUPPORTS_DETAILS, {
        constructor: function() {
            var summary = this.child(0);

            summary
                .set("tabindex", 0) // make summary to be focusable
                .on("click", this.doToggleOpenState, ["currentTarget"])
                .on("keydown", this.onKeyDown, ["currentTarget", "which"]);
        },
        doToggleOpenState: function(summary) {
            var details = summary.parent();

            details.set("open", details.get("open") == null ? "open" : null);
        },
        onKeyDown: function(summary, key) {
            if (key === 13 || key === 32) {
                summary.fire("click");

                return false;
            }
        }
    });
}(window.DOM));
