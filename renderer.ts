function createSVGBlock(block: Block): HTMLElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "200");
  svg.setAttribute("height", "40");

  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", "0");
  rect.setAttribute("y", "0");
  rect.setAttribute("width", "200");
  rect.setAttribute("height", "40");
  rect.setAttribute("rx", block.type === "hat" ? "10" : "6"); // Rounded top for hat blocks
  rect.setAttribute("fill", block.color);

  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", "10");
  text.setAttribute("y", "25");
  text.setAttribute("fill", "white");
  text.setAttribute("font-size", "14");
  text.setAttribute("font-family", "sans-serif");
  text.textContent = block.label;

  svg.appendChild(rect);
  svg.appendChild(text);

  const wrapper = document.createElement("div");
  wrapper.className = "svg-block";
  wrapper.draggable = true;
  wrapper.appendChild(svg);

  wrapper.addEventListener("dragstart", (e) => {
    e.dataTransfer?.setData("text/plain", block.label);
  });

  return wrapper;
}
