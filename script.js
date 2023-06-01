function imgDownload(type) {
  html2canvas(document.querySelector(".divcontents")).then((canvas) => {
    download(canvas, "fileName");
  });
  function download(canvas, filename) {
    const data = canvas.toDataURL("image/png;base64");
    if (type === "download") {
      const donwloadLink = document.querySelector("#download");
      //Download when click
      donwloadLink.download = filename;
      donwloadLink.href = data;
    } else if (type === "preview") {
      //View create image on selected div
      var elem = document.createElement("img");
      elem.setAttribute("src", data);
      elem.setAttribute("height", "100");
      elem.setAttribute("width", "100%");
      elem.setAttribute("alt", "bss");
      document.getElementById("view").appendChild(elem);
    } else if (type === "print") {
      var printContents = document.querySelector(".divcontents").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    } else {
      copyDataURLToClipboard(data);
    }
  }
}

function copyDataURLToClipboard(dataURL) {
  const img = document.createElement("img");
  img.src = dataURL;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    const blob = dataURLtoBlob(canvas.toDataURL("image/png"));
    copyImageToClipboard(blob);
  };
}

function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function copyImageToClipboard(blob) {
  try {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    showTooltip();
  } catch (error) {
    console.error("Unable to copy image to clipboard", error);
  }
}

const tooltip = document.getElementById("tooltip");

function showTooltip() {
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";

  setTimeout(() => {
    hideTooltip();
  }, 1500);
}

function hideTooltip() {
  tooltip.style.visibility = "hidden";
  tooltip.style.opacity = "0";
}
