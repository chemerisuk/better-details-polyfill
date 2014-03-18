describe("better-details-polyfill", function() {
    "use strict";

    var details, summary;

    beforeEach(function() {
        details = DOM.mock("details>summary>`test`^p>`some text`");
        summary = details.child(0);
    });

    it("should make summary to be focusable", function() {
        expect(summary.get("tabindex")).toBe("0");
    });

    it("should toggle open attribute on summary click", function() {
        var getSpy = spyOn(details, "get"),
            setSpy = spyOn(details, "set");

        getSpy.and.returnValue(null);
        summary.fire("click");
        expect(setSpy).toHaveBeenCalledWith("open", "open");

        getSpy.and.returnValue("open");
        summary.fire("click");
        expect(setSpy).toHaveBeenCalledWith("open", null);
    });

    it("should toggle details on space or enter key", function() {
        var spy = jasmine.createSpy("click");

        summary.on("click", spy);

        expect(details.onKeyDown(summary, 14)).not.toBe(false);
        expect(spy.calls.count()).toBe(0);
        expect(details.onKeyDown(summary, 13)).toBe(false);
        expect(spy.calls.count()).toBe(1);
        expect(details.onKeyDown(summary, 32)).toBe(false);
        expect(spy.calls.count()).toBe(2);
    });
});
