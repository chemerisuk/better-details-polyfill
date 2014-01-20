describe("better-details-polyfill", function() {
    "use strict";

    var details;

    beforeEach(function() {
        details = DOM.mock("details>summary>{test}^p>{some text}");
    });

    it("should make summary to be focusable", function() {
        expect(details.child(0).get("tabindex")).toBe("0");
    });

    it("should toggle open attribute on summary click", function() {
        var getSpy = spyOn(details, "get"),
            setSpy = spyOn(details, "set");

        getSpy.andReturn(null);
        details.doToggleOpenState();
        expect(setSpy).toHaveBeenCalledWith("open", "open");

        getSpy.andReturn("open");
        details.doToggleOpenState();
        expect(setSpy).toHaveBeenCalledWith("open", null);
    });

    it("should toggle details on space or enter key", function() {
        var spy = jasmine.createSpy("doToggleOpenState");

        expect(details.onKeyDown(spy, 14)).not.toBe(false);
        expect(spy.callCount).toBe(0);
        expect(details.onKeyDown(spy, 13)).toBe(false);
        expect(spy.callCount).toBe(1);
        expect(details.onKeyDown(spy, 32)).toBe(false);
        expect(spy.callCount).toBe(2);
    });
});
