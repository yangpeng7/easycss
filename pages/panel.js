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
  const marginTop = Math.trunc(data.marginTop.replace(/px/, ""));
  const marginRight = Math.trunc(data.marginRight.replace(/px/, ""));
  const marginBottom = Math.trunc(data.marginBottom.replace(/px/, ""));
  const marginLeft = Math.trunc(data.marginLeft.replace(/px/, ""));

  const paddingTop = Math.trunc(data.paddingTop.replace(/px/, ""));
  const paddingRight = Math.trunc(data.paddingRight.replace(/px/, ""));
  const paddingBottom = Math.trunc(data.paddingBottom.replace(/px/, ""));
  const paddingLeft = Math.trunc(data.paddingLeft.replace(/px/, ""));

  const width = Math.trunc(data.width.replace(/px/, "")) || `${data.width} `;
  const height = Math.trunc(data.height.replace(/px/, "")) || ` ${data.height}`;

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

  pmt.innerText = marginTop;
  pmr.innerText = marginRight;
  pmb.innerText = marginBottom;
  pml.innerText = marginLeft;

  pat.innerText = paddingTop;
  par.innerText = paddingRight;
  pab.innerText = paddingBottom;
  pal.innerText = paddingLeft;

  ecpbc.innerText = width + "x" + height;

  ecpc.innerText = `width: ${data.width};
    height: ${data.height};
    margin:  ${data.marginTop} ${data.marginRight} ${data.marginBottom} ${
    data.marginLeft
  };
    padding:  ${data.paddingTop} ${data.paddingRight} ${data.paddingBottom} ${
    data.paddingLeft
  };
    ${data.boxShadow ? `box-shadow:  ${data.boxShadow};` : ""}
    ${data.background ? `background:  ${data.background};` : ""}
    ${data.border ? `border:  ${data.border};` : ""}
    ${data.borderRadius ? `border-radius:  ${data.borderRadius};` : ""}`;
};

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
