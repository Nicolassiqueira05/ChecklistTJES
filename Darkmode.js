let ls = localStorage;

if(ls.getItem("dark")){
  document.querySelector("#darkmode").checked = ls.getItem("dark");
}

document.querySelector("#darkmode")
  .addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
    ls.setItem("dark", document.querySelector("#darkmode").checked)
});





