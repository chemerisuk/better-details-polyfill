(function(DOM, VK_SPACE, VK_ENTER) {
    "use strict";

    // add ARIA attributes for ALL browsers because current
    // native implementaions are weak:
    // https://bugs.webkit.org/show_bug.cgi?id=131111

    var hasNativeSupport = typeof DOM.create("details").get("open") === "boolean";

    DOM.extend("details", {
        constructor() {
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-details-element
            this.set("role", "group")
                .on("toggle", ["stopPropagation"], this._changeOpen.bind(this));

            var firstSummary = this.children("summary")[0];
            // If there is no child summary element, the user agent
            // should provide its own legend (e.g. "Details")
            if (!firstSummary) firstSummary = DOM.create("summary>`Details`");
            // make the first <summary> always to be the first child
            if (this.child(0) !== firstSummary) {
                this.prepend(firstSummary);
            }
            // http://www.w3.org/html/wg/drafts/html/master/interactive-elements.html#the-summary-element
            firstSummary.set("role", "button");
            /* istanbul ignore if */
            if (!hasNativeSupport) {
                this.define("open", this._getOpen, this._setOpen);

                this._initSummary(firstSummary);
            }

            this._changeOpen();
        },
        _initSummary(summary) {
            summary
                .set("tabindex", 0)
                .on("keydown", ["which"], this._toggleOpen.bind(this))
                .on("click", this._toggleOpen.bind(this));
        },
        _changeOpen(stop) {
            this.set("aria-expanded", this.get("open"));

            if (stop) stop(); // toggle event should not bubble
        },
        _getOpen(attrValue) {
            attrValue = String(attrValue).toLowerCase();

            return attrValue === "" || attrValue === "open";
        },
        _setOpen(propValue) {
            var currentValue = this.get("open");

            propValue = !!propValue;

            if (currentValue !== propValue) {
                // have to use setTimeout because the event should
                // fire AFTER the attribute was updated
                setTimeout(() => { this.fire("toggle") }, 0);
            }

            return propValue ? "" : null;
        },
        _toggleOpen(key) {
            if (!key || key === VK_SPACE || key === VK_ENTER) {
                this.set("open", !this.get("open"));
                // need to prevent default, because
                // the enter key usually submits a form
                return false;
            }
        }
    });
}(window.DOM, 32, 13));
