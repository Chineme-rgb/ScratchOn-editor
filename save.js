// save.js
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save-btn");

  saveBtn.addEventListener("click", () => {
    // Simulate saving project state to MyStuff
    const projectState = {
      timestamp: new Date().toISOString(),
      message: "Project saved to MyStuff",
      // You can expand this with actual workspace data later
    };

    localStorage.setItem("scratchon-project", JSON.stringify(projectState));
    alert("Progress saved to MyStuff!");
  });
});
