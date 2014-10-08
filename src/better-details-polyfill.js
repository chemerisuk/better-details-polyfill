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

            this.doDefineOpen(this[0]);
        },
        doDefineOpen(node) {
            var LEGACY_IE = !document.addEventListener;

            setTimeout(() => {
                var attrName = LEGACY_IE ? "OPEN" : "open";
                var initialValue = node.getAttribute("open", 1);

                Object.defineProperty(node, "open", {
                    get() {
                        var value = node.getAttribute(attrName, 1);

                        return value === "" || value === "open";
                    },
                    set(value) {
                        if (value) {
                            node.setAttribute(attrName, "", 1);
                        } else {
                            node.removeAttribute(attrName, 1);
                        }

                        if (LEGACY_IE) node.className = node.className;
                    }
                });

                if (initialValue !== null) {
                    node.setAttribute(attrName, initialValue, 1);
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
