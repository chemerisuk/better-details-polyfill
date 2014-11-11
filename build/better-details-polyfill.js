(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    // invoke extension only if there is no native support
    var open = DOM.create("details").get("open");

    DOM.extend("details", typeof open !== "boolean", {
        constructor: function() {
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-details-element
            this.set("role", "group")
                .on("toggle", ["stopPropagation"], function(stop)  { stop() })
                .defineAttribute("open", {
                    get: this.doGetOpen,
                    set: this.doSetOpen
                });

            var summaries = this.children("summary");
            // If there is no child summary element, the user agent
            // should provide its own legend (e.g. "Details")
            this.doInitSummary(summaries[0] || DOM.create("summary>`Details`"));
        },
        doInitSummary: function(summary) {
            // make sure that the <summary> is the first child
            if (this.child(0) !== summary) {
                this.prepend(summary);
            }

            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
            summary
                .set({role: "button", tabindex: 0})
                .on("keydown", ["which"], this.doToggleOpen)
                .on("click", this.doToggleOpen);
        },
        doGetOpen: function(attrValue) {
            attrValue = String(attrValue).toLowerCase();

            return attrValue === "" || attrValue === "open";
        },
        doSetOpen: function(propValue) {
            var currentValue = this.get("open");

            propValue = !!propValue;

            this.set("aria-expanded", propValue);

            if (currentValue !== propValue) {
                this.fire("toggle");
            }

            return propValue ? "" : null;
        },
        doToggleOpen: function(key) {
            if (!key || key === VK_SPACE || key === VK_ENTER) {
                this.set("open", !this.get("open"));
                // need to prevent default, because
                // the enter key usually submits a form
                return false;
            }
        }
    });
}(window.DOM, 32, 13));

DOM.importStyles("summary:first-child~*", "display:none");
DOM.importStyles("details[open]>*", "display:block");
DOM.importStyles("details>summary:first-child", "display:block");
DOM.importStyles("details:before", "content:'\\25BA';font-family:serif;font-size:.75em;margin-top:.25em;margin-left:.25em;position:absolute");
DOM.importStyles("details[open]:before", "content:'\\25BC'");
DOM.importStyles("summary:first-child", "text-indent:1.25em");
DOM.importStyles("details::before", "content:'';width:0;height:0;border:solid transparent;border-left-color:inherit;border-width:.25em .5em;margin-top:.75em;margin-left:.5em;-webkit-transform:rotate(0deg) scale(1.5);-ms-transform:rotate(0deg) scale(1.5);transform:rotate(0deg) scale(1.5);-webkit-transform-origin:25% 50%;-ms-transform-origin:25% 50%;transform-origin:25% 50%;-webkit-transition:-webkit-transform .15s ease-out;transition:transform .15s ease-out");
DOM.importStyles("details[open]::before", "content:'';-webkit-transform:rotate(90deg) scale(1.5);-ms-transform:rotate(90deg) scale(1.5);transform:rotate(90deg) scale(1.5)");
DOM.importStyles("summary::-webkit-details-marker", "display:none");
