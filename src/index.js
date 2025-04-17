import Zoom from "@components/Zoom.vue";

Zoom.install = (app) => {
    app.component('ZoomVuer', Zoom);
};
export default {
    Zoom
};
export { Zoom };