(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    var JSCRIPT_VERSION=/*@cc_on @_jscript_version|@*/void 0;
    // invoke extension only if there is no native support
    var condition = typeof DOM.create("details").get("open") !== "boolean";

    DOM.extend("details", condition, {
        constructor() {
            var summary = this.child(0);

            summary
                .set("tabindex", 0) // make summary to be focusable
                .on("click", ["currentTarget"], this.doToggleOpen)
                .on("keydown", ["currentTarget", "which"], this.onKeyDown);
            /* istanbul ignore if */
            if (JSCRIPT_VERSION < 9) {
                // for a some reason IE8 crashes w/o setTimeout
                setTimeout(this.doDefineProp, 100);
            } else {
                this.doDefineProp();
            }
        },
        doDefineProp() {
            var node = this[0];
            var propName = "open";
            var initialValue = node.getAttribute(propName);

            Object.defineProperty(node, propName, {
                get() {
                    var value = String(node.getAttribute(propName, 1));

                    return !value || value.toLowerCase() === propName.toLowerCase();
                },
                set(value) {
                    if (value) {
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
            }

            if (initialValue !== null) {
                node.setAttribute(propName, initialValue, 1);
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
