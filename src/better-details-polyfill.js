(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    var JSCRIPT_VERSION=/*@cc_on @_jscript_version|@*/void 0;
    // invoke extension only if there is no native support
    var condition = typeof DOM.create("details").get("open") !== "boolean";

    DOM.extend("details", condition, {
        constructor() {
            var opened = this.get("open");
            opened = opened === "" || opened === "open";
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-details-element
            this.set("role", "group").set("aria-expanded", opened);
            this.children("summary:first-child").forEach(this.doInitSummary);
            this.doDefineProperty("open", opened);
        },
        doInitSummary(summary) {
            summary
                .set("tabindex", 0) // make summary to be focusable
                .set("role", "button") // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
                .on("click", ["currentTarget"], this.doToggleOpen)
                .on("keydown", ["currentTarget", "which"], this.onKeyDown);
        },
        doDefineProperty(propName, opened) {
            var node = this[0];

            Object.defineProperty(node, propName, {
                get() {
                    return opened;
                },
                set(value) {
                    opened = !!value;
                    node.setAttribute("aria-expanded", opened);

                    if (opened) {
                        node.setAttribute(propName, "", 1);
                    } else {
                        node.removeAttribute(propName, 1);
                    }
                    /* istanbul ignore if */
                    if (JSCRIPT_VERSION < 9) {
                        // fix refresh issue in IE8
                        node.className = node.className;
                    }
                }
            });
            /* istanbul ignore if */
            if (JSCRIPT_VERSION < 9) {
                // trick to avoid infinite recursion in IE8
                propName = propName.toUpperCase();

                if (opened) {
                    node.setAttribute(propName, opened, 1);
                }
            }
        },
        doToggleOpen(summary) {
            var details = summary.closest("details");

            details.set("open", !details.get("open"));
        },
        onKeyDown(summary, key) {
            if (key === VK_SPACE || key === VK_ENTER) {
                summary.fire("click");

                return false;
            }
        }
    });
}(window.DOM, 32, 13));
