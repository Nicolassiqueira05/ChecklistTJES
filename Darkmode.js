document.querySelector("#darkmode")
  .addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
});