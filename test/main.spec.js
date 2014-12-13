describe("better-details-polyfill", function() {
    "use strict";

    var details, summary;

    beforeEach(function() {
        details = DOM.mock("details>summary>`test`^p>`some text`");
        summary = details.child(0);

        details._initSummary(summary);
    });

    it("makes <summary> to be focusable", function() {
        expect(summary.get("tabindex")).toBe(0);
    });

    it("should toggle open attribute on summary click", function() {
        var getSpy = spyOn(details, "get"),
            setSpy = spyOn(details, "set");

        getSpy.and.returnValue(null);
        summary.fire("click");
        expect(setSpy).toHaveBeenCalledWith("open", true);

        getSpy.and.returnValue("open");
        summary.fire("click");
        expect(setSpy).toHaveBeenCalledWith("open", false);
    });

    it("should toggle details on space or enter key", function() {
        var getSpy = spyOn(details, "get"),
            setSpy = spyOn(details, "set");

        getSpy.and.returnValue(null);
        details._toggleOpen(13);
        expect(setSpy).toHaveBeenCalledWith("open", true);

        getSpy.and.returnValue("open");
        details._toggleOpen(14); // invalid key test
        expect(setSpy).not.toHaveBeenCalledWith("open", false);
        details._toggleOpen(32);
        expect(setSpy).toHaveBeenCalledWith("open", false);
    });

    it("implements open attribute support", function() {
        var value = null;

        expect(details._getOpen(value)).toBe(false);
        value = details._setOpen(true);
        expect(details._getOpen(value)).toBe(true);
        value = details._setOpen(false);
        expect(details._getOpen(value)).toBe(false);
    });

    it("makes summary to be the first child", function() {
        var details = DOM.mock("details>p>`some text`^summary>`test`");
        var summary = details.child(0);

        expect(summary.toString()).toBe("<summary>");
    });

    // describe("toggle event", function() {
    //     it("is triggered on open attribute change", function() {
    //         var toggleSpy = jasmine.createSpy("toggle");

    //         DOM.find("body").append(details);

    //         details.on("toggle", toggleSpy);
    //         details._setOpen(true);
    //         expect(toggleSpy.calls.count()).toBe(1);

    //         spyOn(details, "get").and.returnValue(true);
    //         details._setOpen(false);
    //         expect(toggleSpy.calls.count()).toBe(2);

    //         details.remove();
    //     });

    //     it("does not bubble", function() {
    //         var toggleSpy = jasmine.createSpy("toggle"),
    //             bodySpy = jasmine.createSpy("body");

    //         DOM.find("body").append(details).on("toggle", bodySpy);

    //         details.on("toggle", toggleSpy)._setOpen(true);
    //         expect(toggleSpy).toHaveBeenCalled();
    //         expect(bodySpy).not.toHaveBeenCalled();

    //         details.remove();
    //     });
    // });
});
