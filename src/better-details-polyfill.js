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
                get: this.doGetOpen,
                set: this.doSetOpen
            });
        },
        doInitSummary(summary) {
            summary
                // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
                .set({role: "button", tabindex: 0})
                .on("keydown", ["which"], this.doToggleOpen)
                .on("click", this.doToggleOpen);
        },
        doGetOpen(attrValue) {
            attrValue = String(attrValue).toLowerCase();

            return attrValue === "" || attrValue === "open";
        },
        doSetOpen(propValue) {
            var currentValue = this.get("open");

            propValue = !!propValue;

            this.set("aria-expanded", propValue);

            if (currentValue !== propValue) {
                this.fire("toggle");
            }

            return propValue ? "" : null;
        },
        doToggleOpen(key) {
            if (!key || key === VK_SPACE || key === VK_ENTER) {
                this.set("open", !this.get("open"));
                // need to prevent default, because
                // the enter key usually submits a form
                return false;
            }
        }
    });
}(window.DOM, 32, 13));
