(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    // invoke extension only if there is no native support
    var open = DOM.create("details").get("open");

    DOM.extend("details", typeof open !== "boolean", {
        constructor() {
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-details-element
            this.set("role", "group")
                .on("toggle", ["stopPropagation"], (stop) => { stop() })
                .children("summary:first-child").forEach(this.doInitSummary);

            this.defineAttribute("open", {
                get: this.doGetOpen[0],
                set: this.doSetOpen[0]
            });
        },
        doInitSummary(summary) {
            summary
                // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
                .set({role: "button", tabindex: 0})
                .on("click", [summary], this.doToggleOpen)
                .on("keydown", [summary, "which"], this.onKeyDown);
        },
        doGetOpen(attrValue) {
            attrValue = String(attrValue).toLowerCase();

            return attrValue === "" || attrValue === "open";
        },
        doSetOpen(propValue) {
            var currentValue = this.get("open");

            propValue = !!propValue;

            if (currentValue !== propValue) {
                this.set("aria-expanded", propValue).fire("toggle");

                return propValue ? "" : null;
            }
        },
        doToggleOpen(summary) {
            var details = summary.closest("details");

            details.set("open", !details.get("open"));
        },
        onKeyDown(summary, key) {
            if (key === VK_SPACE || key === VK_ENTER) {
                summary.fire("click");

                return false; // prevent default
            }
        }
    });
}(window.DOM, 32, 13));
