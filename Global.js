const ls = localStorage;

function setTheme(color) {
    color = color ?? "default";

    document.body.classList.remove("default", "dark", "pink", "dracula");
    document.body.classList.add(color);

    localStorage.setItem("tema", color);

    const select = document.querySelector("#temas");
    if (select) select.value = color;
}
function setBold(boolean){
    boolean = boolean ?? "false";

    localStorage.setItem("bold", boolean);

    const select = document.querySelector("#bold")
    if (select) select.value = boolean
}
function setSpacing(boolean){
    boolean = boolean ?? "false";

    localStorage.setItem("spacing", boolean);

    const select = document.querySelector("#spacing")
    if (select) select.value = boolean
}
console.log(1)
if(ls.getItem("tema")){
    setTheme(ls.getItem("tema"))
}else{
    ls.setItem("tema", "default")
    setTheme(ls.getItem("tema"))
}
if(ls.getItem("bold")){
    setBold(ls.getItem("bold"))
}else{
    ls.setItem("bold", "false")
    setBold(ls.getItem("bold"))
}

if(ls.getItem("spacing")){
    setSpacing(ls.getItem("spacing"))
}else{
    ls.setItem("spacing", "false")
    setSpacing(ls.getItem("spacing"))
}
function save(theme, bold, spacing){
    setTheme(theme)
    setBold(bold)
    setSpacing(spacing)
}

