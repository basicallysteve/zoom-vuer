import Zoom from "@components/Zoom.vue";
import { mount, flushPromises } from "@vue/test-utils";
import { describe, it } from "vitest";

describe("Zoom.vue", () => {
    it("renders a zoom component", () => {
        const wrapper = mount(Zoom, {
        props: {
            zoom: 1,
        },
        attrs: {
            src: "https://example.com/image.jpg",
            alt: "Test Image",
        }
        });
        expect(wrapper.exists()).toBe(true);
        let img = wrapper.find("img");
        expect(img.exists()).toBe(true);
        expect(img.attributes("src")).toBe("https://example.com/image.jpg");
        expect(img.attributes("alt")).toBe("Test Image");
    });
    
    it("should zoom on click", async () => {
        const wrapper = mount(Zoom, {
        props: {
            zoom: 2,
            zoomOn: "click"
        },
        attrs: {
            src: "https://example.com/image.jpg",
            alt: "Test Image",
        }
        });
        wrapper.find("#zoomContainer").trigger("click");
        await flushPromises();
        let zoomWindow = wrapper.find("#zoom-window");
        expect(zoomWindow.exists()).toBe(true);
        let zoomedImage = zoomWindow.find("img");
        expect(zoomedImage.exists()).toBe(true);
        expect(zoomedImage.attributes("src")).toBe("https://example.com/image.jpg");
        expect(zoomedImage.attributes("alt")).toBe("Test Image");
        expect(zoomedImage.attributes("style")).toContain("transform: scale(2)");
    });

    it("should move origin on mousemove", async () => {
        const wrapper = mount(Zoom, {
        props: {
            zoom: 2,
            zoomOn: "hover"
        },
        attrs: {
            src: "https://example.com/image.jpg",
            alt: "Test Image",
        }
        });
        await wrapper.find("#zoomContainer").trigger("mouseover");
        let zoomWindow = wrapper.find("#zoom-window");
        expect(zoomWindow.exists()).toBe(true);
        await wrapper.find("img").trigger("mousemove", {
            clientX: 100,
            clientY: 100
        });
        await flushPromises();
        let zoomedImage = zoomWindow.find("img");
        let transformOrigin = zoomedImage.attributes("style").match(/transform-origin: (.*?);/);
        expect(transformOrigin).toBeTruthy();
        expect(transformOrigin[1]).not.toBe("center center");

    });
    
    it("should zoom on hover", async () => {
        const wrapper = mount(Zoom, {
        props: {
            zoom: 2,
            zoomOn: "hover"
        },
        attrs: {
            src: "https://example.com/image.jpg",
            alt: "Test Image",
        }
        });
        await wrapper.find("#zoomContainer").trigger("mouseover");
        let zoomWindow = wrapper.find("#zoom-window");
        expect(zoomWindow.exists()).toBe(true);
        let zoomedImage = zoomWindow.find("img");
        expect(zoomedImage.exists()).toBe(true);
        expect(zoomedImage.attributes("src")).toBe("https://example.com/image.jpg");
        expect(zoomedImage.attributes("alt")).toBe("Test Image");
        expect(zoomedImage.attributes("style")).toContain("transform: scale(2)");
        await wrapper.find("#zoom-window").trigger("mouseleave");
        
        zoomWindow = wrapper.find("#zoom-window");
        expect(zoomWindow.exists()).toBe(false);
    });
});