type Block = {
  id: string;
  opcode: string;
  label: string;
  color: string;
  type: "hat" | "command" | "reporter" | "custom";
};

type BlockCategory = {
  name: string;
  blocks: Block[];
};

type BlockData = {
  categories: BlockCategory[];
};

document.addEventListener("DOMContentLoaded", () => {
  const editorUI = document.getElementById("editor-ui") as HTMLElement;

  // Create layout containers
  const blockPalette = document.createElement("aside");
  blockPalette.id = "block-palette";

  const scriptArea = document.createElement("section");
  scriptArea.id = "script-area";

  const stagePreview = document.createElement("section");
  stagePreview.id = "stage-preview";

  editorUI.appendChild(blockPalette);
  editorUI.appendChild(scriptArea);
  editorUI.appendChild(stagePreview);

  // Load blocks from JSON
  fetch("blocks.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load blocks.json");
      return res.json();
    })
    .then((data: BlockData) => {
      renderBlockPalette(data);
    })
    .catch((err) => {
      console.error("Error loading blocks:", err);
    });

  function renderBlockPalette(blockData: BlockData): void {
    blockData.categories.forEach((category: BlockCategory) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "block-category";
      categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

      category.blocks.forEach((block: Block) => {
        const blockEl = createSVGBlock(block);
        categoryDiv.appendChild(blockEl);
      });

      blockPalette.appendChild(categoryDiv);
    });
  }

  function createSVGBlock(block: Block): HTMLDivElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "200");
    svg.setAttribute("height", "40");

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "200");
    rect.setAttribute("height", "40");

    const rx = block.type === "hat" ? "10" : block.type === "reporter" ? "20" : "6";
    rect.setAttribute("rx", rx);
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

    wrapper.addEventListener("dragstart", (e: DragEvent) => {
      e.dataTransfer?.setData("text/plain", block.label);
    });

    return wrapper;
  }

  // Handle drop into script area
  scriptArea.addEventListener("dragover", (e: DragEvent) => {
    e.preventDefault();
  });

  scriptArea.addEventListener("drop", (e: DragEvent) => {
    e.preventDefault();
    const blockLabel = e.dataTransfer?.getData("text/plain");

    if (blockLabel) {
      const droppedBlock = document.createElement("div");
      droppedBlock.className = "svg-block";
      droppedBlock.textContent = blockLabel;
      scriptArea.appendChild(droppedBlock);
    }
  });
});
