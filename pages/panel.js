window.addEventListener("message", function (event) {
  if (event.data.type === "computedStyle") {
    const ev = JSON.parse(event.data.data);
    console.log(ev);
    showComputedStyle(ev);
  }
});

document
  .getElementById("easy-css-panel-header-close")
  .addEventListener("click", handleClosePanel);
document
  .getElementById("easy-css-panel-code-copy")
  .addEventListener("click", handleCopyCode);

document
  .getElementById("easy-css-panel-header-icon")
  .addEventListener("click", () => {
    window.open("https://github.com/yangpeng7/easycss", "_blank");
  });

const showComputedStyle = (data) => {
  // margin
  let pmt = document.getElementById("easy-css-panel-margin-top");
  let pmr = document.getElementById("easy-css-panel-margin-right");
  let pmb = document.getElementById("easy-css-panel-margin-bottom");
  let pml = document.getElementById("easy-css-panel-margin-left");

  // padding
  let pat = document.getElementById("easy-css-panel-padding-top");
  let par = document.getElementById("easy-css-panel-padding-right");
  let pab = document.getElementById("easy-css-panel-padding-bottom");
  let pal = document.getElementById("easy-css-panel-padding-left");

  // width x height
  let ecpbc = document.getElementById("easy-css-panel-box-width-height");

  // code
  let ecpc = document.getElementById("easy-css-panel-code");

  pmt.innerText = replacePx(data.marginTop);
  pmr.innerText = replacePx(data.marginRight);
  pmb.innerText = replacePx(data.marginBottom);
  pml.innerText = replacePx(data.marginLeft);

  pat.innerText = replacePx(data.paddingTop);
  par.innerText = replacePx(data.paddingRight);
  pab.innerText = replacePx(data.paddingBottom);
  pal.innerText = replacePx(data.paddingLeft);

  ecpbc.innerText = replacePx(data.width) + " x " + replacePx(data.height);

  ecpc.innerText = `width: ${truncValue(data.width)};
    height: ${truncValue(data.height)};
    margin:  ${truncValue(data.marginTop)} ${truncValue(
    data.marginRight
  )} ${truncValue(data.marginBottom)} ${truncValue(data.marginLeft)};
    padding:  ${truncValue(data.paddingTop)} ${truncValue(
    data.paddingRight
  )} ${truncValue(data.paddingBottom)} ${truncValue(data.paddingLeft)};
    ${data.boxShadow ? `box-shadow:  ${data.boxShadow};` : ""}
    ${data.background ? `background:  ${data.background};` : ""}
    ${data.border ? `border:  ${data.border};` : ""}
    ${data.borderRadius ? `border-radius:  ${data.borderRadius};` : ""}`;
};

function replacePx(value) {
  return value.includes("px") ? Math.trunc(value.replace(/px/, "")) : value;
}

function truncValue(value) {
  return value.includes("px")
    ? Math.trunc(value.replace(/px/, "")) + "px"
    : value;
}

function handleClosePanel() {
  parent.window.postMessage({ msg: "EVENT_PANEL_CLOSE" }, "*");
}

function handleCopyCode() {
  const str = document.getElementById("easy-css-panel-code").innerText;
  parent.window.postMessage(
    {
      msg: "EVENT_COPY_CODE",
      code: str,
    },
    "*"
  );
}

let baseMouseX, baseMouseY;

document
  .getElementById("easy-css-panel-header-title")
  .addEventListener("mousedown", handleDragStart);

function handleDragStart(evt) {
  baseMouseX = evt.clientX;
  baseMouseY = evt.clientY;
  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
}

function handleDragMove(evt) {
  let offsetX = evt.clientX - baseMouseX;
  let offsetY = evt.clientY - baseMouseY;

  // 防止抖动过快
  if (Math.abs(offsetX) > 4 || Math.abs(offsetY) > 4) {
    parent.window.postMessage(
      {
        msg: "EVENT_DRAG_MOVE",
        offsetX: evt.clientX - baseMouseX,
        offsetY: evt.clientY - baseMouseY,
      },
      "*"
    );
  }
}

function handleDragEnd() {
  document.removeEventListener("mouseup", handleDragEnd);
  document.removeEventListener("mousemove", handleDragMove);
}
