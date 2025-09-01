document.addEventListener("DOMContentLoaded", () => {
  const editorUI = document.getElementById("editor-ui");

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
    .then((res) => res.json())
    .then((data) => {
      renderBlockPalette(data);
    })
    .catch((err) => {
      console.error("Failed to load blocks.json:", err);
    });

  function renderBlockPalette(blockData) {
    blockData.categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "block-category";
      categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

      category.blocks.forEach((block) => {
        const blockEl = createSVGBlock(block);
        categoryDiv.appendChild(blockEl);
      });

      blockPalette.appendChild(categoryDiv);
    });
  }

  // Handle drop into script area
  scriptArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  scriptArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const blockLabel = e.dataTransfer.getData("text/plain");

    const droppedBlock = document.createElement("div");
    droppedBlock.className = "block";
    droppedBlock.textContent = blockLabel;

    scriptArea.appendChild(droppedBlock);
  });
});
