(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    var JSCRIPT_VERSION=/*@cc_on @_jscript_version|@*/void 0;
    // invoke extension only if there is no native support
    var open = DOM.create("details").get("open");

    DOM.extend("details", typeof open !== "boolean", {
        constructor() {
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-details-element
            this.set("role", "group");
            this.children("summary:first-child").forEach(this.doInitSummary);
            this.doDefineProperty();
        },
        doInitSummary(summary) {
            summary
                // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
                .set({role: "button", tabindex: 0})
                .on("click", [summary], this.doToggleOpen)
                .on("keydown", [summary, "which"], this.onKeyDown);
        },
        doDefineProperty() {
            var opened = this.get("open");

            Object.defineProperty(this[0], "open", {
                get: this.doGetOpen,
                set: this.doSetOpen
            });

            // trigger initial state
            this.set("open", opened === "" || opened === "open");
        },
        doGetOpen() {
            var node = this[0];
            var opened = String(node.getAttribute("open"));

            return opened === "" || opened.toLowerCase() === "open";
        },
        doSetOpen(value) {
            var node = this[0];
            var propName = JSCRIPT_VERSION < 9 ? "OPEN" : "open";

            node.setAttribute("aria-expanded", !!value);

            if (value) {
                node.setAttribute(propName, "", 1);
            } else {
                node.removeAttribute(propName, 1);
            }
            /* istanbul ignore next */
            if (JSCRIPT_VERSION < 9) {
                // fix refresh issue in IE8
                node.className = node.className;
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
