<script setup>
import { ref, computed, useAttrs, onMounted } from 'vue'


let props = defineProps({
  zoom: {
    type: Number,
    default: 1.5
  },
  zoomOn: {
    type: String,
    default: "hover"
  }
})

let image = ref(null)
let scaleFactor = computed (() => {
  return props.zoom
})
function zoomImage() {
  if (image.value) {
    zoomedIn.value = true;
    const rect = image.value.getBoundingClientRect();
    const zoomWindow = document.createElement("div");
    zoomWindow.id = "zoom-window";
    Object.assign(zoomWindow.style, {
      position:      "absolute",
      top:           "0px",              
      left:          "0px",
      width:         rect.width + "px",
      height:        rect.height + "px",
      overflow:      "hidden",
      pointerEvents: "none",            
      zIndex:        "1000"
    });

    const zoomedImage = document.createElement("img");
    zoomedImage.src = image.value.src;
    zoomedImage.alt = image.value.alt;
    Object.assign(zoomedImage.style, {
      top: 0,
      left: 0,
      width:"100%",
      height:"100%",
      position: "absolute",
      transform: `scale(${scaleFactor.value})`,
      transformOrigin: "center center",
      pointerEvents: "none",
    })


    zoomWindow.appendChild(zoomedImage);
    zoomContainer.value.appendChild(zoomWindow);
    if(props.zoomOn == "hover") {
      zoomWindow.addEventListener("mouseleave", () => {
        zoomContainer.value.removeChild(zoomWindow);
      });
    }else if (props.zoomOn == "click") {
      zoomWindow.addEventListener("click", () => {
        zoomContainer.value.removeChild(zoomWindow);
      });
    }
     image.value.addEventListener("mousemove", onZoomMove);

     function onZoomMove (event)  {
    const imgRect = image.value.getBoundingClientRect();

    let xPct = ((event.clientX - imgRect.left) / imgRect.width) * 100;
    let yPct = ((event.clientY - imgRect.top)  / imgRect.height)* 100;

    const s      = scaleFactor.value;
    const margin = ((s - 1) / (2 * s)) * 100;
    xPct = Math.min(100 - margin, Math.max(margin, xPct));
    yPct = Math.min(100 - margin, Math.max(margin, yPct));

    zoomedImage.style.transformOrigin = `${xPct}% ${yPct}%`;
    zoomWindow.style.top  = `${image.value.offsetTop}px`;
    zoomWindow.style.left = `${image.value.offsetLeft}px`;
  };


  }
}


function unzoomImage() {
  const zoomWindow = document.querySelector("#zoom-window");
    if (zoomWindow) {
      
      zoomedIn.value = false;
      zoomContainer.value.removeChild(zoomWindow);
    }

}
function toggleZoom() {
  let zoomWindow = document.querySelector("#zoom-window");
  if (zoomWindow) {
    unzoomImage()
  } else {
    zoomImage()
  }
}


let zoomContainer = ref(null)
function useZoom() {
  if (props.zoomOn === "hover") {
    zoomContainer.value.addEventListener("mouseover", zoomImage)
    zoomContainer.value.addEventListener("mouseout", unzoomImage)
  } else if (props.zoomOn === "click") {
    zoomContainer.value.addEventListener("click", toggleZoom)
  }
}

let zoomedIn = ref(false)

onMounted(() => {
  useZoom()
})

</script>

<template>
  <div ref="zoomContainer" id="zoomContainer" :style="{position: 'relative', display: 'inline-block', cursor: zoomedIn ? 'pointer' : 'zoom-in'}">
    <img v-bind="useAttrs()" ref="image" />
  </div>
</template>

