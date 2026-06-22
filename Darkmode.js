const ls = localStorage;

function setTheme(color) {
    document.body.classList.remove("default", "dark", "pink", "dracula");
    document.body.classList.add(color);

    localStorage.setItem("tema", color);

    const select = document.querySelector("#temas");
    if (select) select.value = color;
}

setTheme(ls.getItem("tema"))