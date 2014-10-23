(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    // invoke extension only if there is no native support
    var open = DOM.create("details").get("open");

    DOM.extend("details", typeof open !== "boolean", {
        constructor: function() {
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-details-element
            this.set("role", "group")
                .on("toggle", ["stopPropagation"], function(stop)  { stop() })
                .children("summary:first-child").forEach(this.doInitSummary);

            this.defineAttribute("open", {
                get: this.doGetOpen[0],
                set: this.doSetOpen[0]
            });
        },
        doInitSummary: function(summary) {
            summary
                // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
                .set({role: "button", tabindex: 0})
                .on("click", [summary], this.doToggleOpen)
                .on("keydown", [summary, "which"], this.onKeyDown);
        },
        doGetOpen: function(attrValue) {
            attrValue = String(attrValue).toLowerCase();

            return attrValue === "" || attrValue === "open";
        },
        doSetOpen: function(propValue) {
            var currentValue = this.get("open");

            propValue = !!propValue;

            if (currentValue !== propValue) {
                this.set("aria-expanded", propValue).fire("toggle");

                return propValue ? "" : null;
            }
        },
        doToggleOpen: function(summary) {
            var details = summary.closest("details");

            details.set("open", !details.get("open"));
        },
        onKeyDown: function(summary, key) {
            if (key === VK_SPACE || key === VK_ENTER) {
                summary.fire("click");

                return false; // prevent default
            }
        }
    });
}(window.DOM, 32, 13));

DOM.importStyles("summary~*", "display:none");
DOM.importStyles("details[open]>*", "display:block");
DOM.importStyles("details>summary:first-child", "display:block;overflow:hidden");
DOM.importStyles("summary:before", "content:'\\25BA';display:inline-block;width:1.25em;font-family:serif;font-size:.75em;margin-left:.25em");
DOM.importStyles("details[open]>summary:first-child:before", "content:'\\25BC'");
DOM.importStyles("summary::before", "content:'';width:0;height:0;border:solid transparent;border-left-color:inherit;border-width:.25em .5em;margin-right:.25em;position:relative;top:-.15em;left:.15em;-webkit-transform:rotate(0deg) scale(1.5);-ms-transform:rotate(0deg) scale(1.5);transform:rotate(0deg) scale(1.5);-webkit-transform-origin:25% 50%;-ms-transform-origin:25% 50%;transform-origin:25% 50%;-webkit-transition:-webkit-transform .15s ease-out;transition:transform .15s ease-out");
DOM.importStyles("details[open]>summary:first-child::before", "content:'';-webkit-transform:rotate(90deg) scale(1.5);-ms-transform:rotate(90deg) scale(1.5);transform:rotate(90deg) scale(1.5)");
DOM.importStyles("summary::-webkit-details-marker", "display:none");
