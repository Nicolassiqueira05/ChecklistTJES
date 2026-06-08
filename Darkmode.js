const ls = localStorage;
const darkToggle = document.querySelector("#darkmode");

const isDark = ls.getItem("dark") === "true";

if (ls.getItem("dark") !== null) {
  darkToggle.checked = isDark;
  document.body.classList.toggle("dark", isDark);
}

darkToggle.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  document.body.classList.toggle("dark", isChecked);
  ls.setItem("dark", isChecked); // Stored as "true" or "false"
});


