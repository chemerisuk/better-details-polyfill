(function(DOM) {
    "use strict";

    var SUPPORTS_DETAILS = typeof DOM.create("details").get("open") === "boolean";
    // invoke extension only if there is no native support
    DOM.extend("details", !SUPPORTS_DETAILS, {
        constructor: function() {
            var summary = this.child(0);

            summary
                .set("tabindex", 0) // make summary to be focusable
                .on("click", this.doToggleOpenState.bind(this))
                .on("keydown", this.onKeyDown.bind(this, summary), ["which"]);
        },
        doToggleOpenState: function() {
            this.set("open", this.get("open") == null ? "open" : null);
            // FIXME: remove after better-dom update to 1.7.4
            this.toggleClass("fake-class-to-fix-legacy-android-reflow");
        },
        onKeyDown: function(summary, key) {
            if (key === 13 || key === 32) {
                summary.fire("click");

                return false;
            }
        }
    });
}(window.DOM));
