(function(DOM) {
    "use strict";

    DOM.extend("details", {
        constructor() {
            // invoke extension only if there is no native support
            if (typeof this.get("open") === "boolean") return false;

            var summary = this.child(0);

            summary
                .set("tabindex", 0) // make summary to be focusable
                .on("click", ["currentTarget"], this.doToggleOpenState)
                .on("keydown", ["currentTarget", "which"], this.onKeyDown);

            this.doDefineProp(this[0], "open");
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
        doToggleOpenState(summary) {
            var details = summary.closest("details");

            details.set("open", !details.get("open"));
        },
        onKeyDown(summary, key) {
            if (key === 13 || key === 32) {
                summary.fire("click");

                return false;
            }
        }
    });
}(window.DOM));
