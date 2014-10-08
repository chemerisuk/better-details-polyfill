(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";
    // invoke extension only if there is no native support
    var condition = typeof DOM.create("details").get("open") !== "boolean";

    DOM.extend("details", condition, {
        constructor() {
            var summary = this.child(0);

            summary
                .set("tabindex", 0) // make summary to be focusable
                .on("click", ["currentTarget"], this.doToggleOpen)
                .on("keydown", ["currentTarget", "which"], this.onKeyDown);

            if (condition) this.doDefineProp(this[0], "open");
        },
        doDefineProp(node, propName) {
            var LEGACY_IE = !document.addEventListener;

            setTimeout(() => {
                var initialValue = node.getAttribute(propName, 1);
                // for a some reason IE8 crashes w/o setTimeout
                Object.defineProperty(node, propName, {
                    get() {
                        var value = String(node.getAttribute(propName, 1)).toLowerCase();

                        return value === "" || value === propName.toLowerCase();
                    },
                    set(value) {
                        if (value) {
                            node.setAttribute(propName, "", 1);
                        } else {
                            node.removeAttribute(propName, 1);
                        }
                        // fix refresh issue in IE8
                        if (LEGACY_IE) node.className = node.className;
                    }
                });
                // trick to avoid infinite recursion in IE8
                if (LEGACY_IE) propName = propName.toUpperCase();

                if (initialValue !== null) {
                    node.setAttribute(propName, initialValue, 1);
                }
            }, 0);
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
