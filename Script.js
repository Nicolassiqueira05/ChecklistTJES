let button = document.querySelector("#GenerateButton");

function Objeto(setor){
	let splitedArray = setor.split(" ")
	if (splitedArray[0].charAt(splitedArray[0].length - 1) == "o" || splitedArray[0].charAt(splitedArray[0].length - 1) == "O"){
		return "À (AO)"
	}else if(splitedArray[0].charAt(splitedArray[0].length - 1) == "a" || splitedArray[0].charAt(splitedArray[0].length - 1) == "A"){
		return "À (AO)"	
	}else{
		return "À (AO)"
	}
}

async function writeClipboardHTML(htmlText, plainText) {
    try {
        const blobHTML = new Blob([htmlText], { type: "text/html" });
        const blobText = new Blob([plainText], { type: "text/plain" });
        const data = [new ClipboardItem({
            "text/html": blobHTML,
            "text/plain": blobText
        })];
        await navigator.clipboard.write(data);
        window.alert("Copiado com sucesso para o SEI!");
    } catch (error) {
        window.alert("Erro ao copiar, peça para o Nicolas checar o console")
        console.error("Erro ao copiar: ", error);
    }
}

button.addEventListener("click", () => {
    const getPendencia = (id, texto) => {
        const el = document.getElementById(id);
        return (el && !el.checked) ? texto : null;
    };

    const pendenciasGerais = [
        getPendencia("check_oficio", "(X) Solicitação da contratação do (a) estagiário(a) assinado pelo Gestor da vaga de estágio, nos termos <b>Resolução nº 056/2026</b>;"),
        getPendencia("check_banco", "(X) Comprovante Bancário (cópia do extrato ou cartão) contendo Nᵒ da conta corrente ou universitária (Banco do Estado do Espírito Santo - Banestes) (Art. 16);"),
        getPendencia("check_declaracao_ensino", "(X) Declaração, atualizada, da Instituição de Ensino Superior, constando a MATRÍCULA, o PERÍODO, o CURSO e o HORÁRIO DE FREQUÊNCIA (Art. 16); (OU INTEGRALIZAÇÃO CURRICULAR - UFES)"),
        getPendencia("check_rg_cpf", "(X) Cópia da Carteira de Identidade e do Cadastro de Pessoas Físicas (CPF) (Art. 16);"),
        getPendencia("check_residencia", "(X) Cópia de comprovante de residência (contendo CEP) (Art. 16);"),
        getPendencia("check_aso", "(X) ASO – Atestado de Saúde Ocupacional, fornecido por médico do trabalho, com validade de até 60 (sessenta) dias, contados da data de emissão (Art. 16);"),
        getPendencia("check_ctps", "(X) Cópia simples da Carteira de Trabalho e Previdência Social — CPTS ou da Carteira de Trabalho Digital;"),
        getPendencia("check_vinc", "(X) Declaração de inexistência de vínculo profissional ou de estágio com advogado ou sociedade de advogados;"),
        getPendencia("check_parentesco", `(X) <a href="https://www.tjes.jus.br/PDF/setorestagio/modelos/2_Formulario_Declaracao%20de%20Parentesco%2020160428.doc" target="_blank" style="color: blue; text-decoration: underline;">Declaração de parentesco, devidamente preenchida e assinada (Art. 16)</a>;`),
        getPendencia("check_formulario_cadastro", `(X) <a href="https://www.tjes.jus.br/wp-content/uploads/Fomul%C3%A1rio-de-Cadastro-de-estagi%C3%A1rios.pdf" target="_blank" style="color: blue; text-decoration: underline;">Formulário Obrigatório de Cadastro de Estagiário</a>(Com todas as informações devidamente preenchidas e legíveis, endereço, telefone, e-mail, etc);`),
        getPendencia("check_supervisor_anterior", `(X) Preencher <b>FORMULÁRIO DO SUPERVISOR DE ESTÁGIO</b> referente ao <b>ESTAGIÁRIO ANTERIOR</b> (modelo disponível no SEI ou em PDF <a href="https://www.tjes.jus.br/wp-content/uploads/Formulario_do_Supervisor_-_Estagiarios.pdf" target="_blank" style="color: blue; text-decoration: underline;">CLIQUE AQUI</a>);`)
    ];

    const pendenciasCertidoes = [
        getPendencia("check_certidao_eleitoral", "(X) Certidão Negativa da Justiça Eleitoral;"),
        getPendencia("check_certidao_militar", "(X) Certidão Negativa da Justiça Militar(disponível no site do STM);"),
        getPendencia("check_certidao_criminal", "(X) Certidão Negativa de natureza Criminal da Justiça Estadual, Federal ou Distrito Federal;")
    ];

    const pendenciasPos = [
        getPendencia("check_pos_diploma", "(X) Cópia do diploma de conclusão do curso superior;"),
	    getPendencia("check_pos_oab", "(X) Declaração de inexistência de inscrição ativa junto à Ordem dos Advogados do Brasil (OAB) (Art. 24);"),
        getPendencia("check_pos_vigencia", "(X) Declaração da Instituição de Ensino Superior contendo início e término do curso de pós-graduação.")
    ];

    const con = document.getElementById("check_con").checked
    const pos = document.getElementById("check_pos").checked

    const conciliador = getPendencia("check_conciliador_informatica", "(X) Declaração de conhecimentos básicos em informática e digitação.");
    const supervisorNovo = getPendencia("check_dados_supervisor_novo", "(X) A Seção de Seleção e Acompanhamento de Estágio informa que se faz necessário a indicação de <b>NOME COMPLETO E CPF DO SUPERVISOR</b> do Estagiário nessa unidade.");

    const certidoes = pendenciasCertidoes.filter(i => i !== null).map((texto, idx) => idx === 0 ? "<br>" + texto : texto);

    let corpoDocumentos = [
        ...pendenciasGerais,
        ...certidoes,
        ...(supervisorNovo ? ["<br>" + supervisorNovo] : []),
        ...(pendenciasPos.filter(i => i !== null).length > 0 && pos ? ["<br><b>Exclusivamente nos casos de estágio de Pós-Graduação:</b>", ...pendenciasPos] : []),
        ...(conciliador && con ? ["<br><b>Exclusivamente nos casos de estágio Conciliador:</b>", conciliador] : []),
    ].filter(i => i !== null).join(ls.getItem("spacing") == "true" ? "<br><br>" : "<br>");

    console.log(corpoDocumentos)

    let markupColor = document.querySelector('#markup').value

    console.log(markupColor)

    let htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.5; color: #000;">
        <p><b>${Objeto(document.querySelector("#input-setor").value)} ${document.querySelector("#input-setor").value}</b></p>
        <p>Prezado (a) Senhor (a),</p>
        <p>Considerando que a emissão do Termo de Compromisso de Estágio deve ser nos termos da <a href="https://sistemas.tjes.jus.br/ediario/index.php/component/ediario/?view=content&id=1852474">Resolução nº 056/2026</a>, bem como o <a href="https://sistemas.tjes.jus.br/ediario/index.php/component/ediario/?view=content&id=1852475">Ato Normativo nº 201/2026</a>.</p>
        <p>Considerando que a documentação apresentada está em desacordo com a referida Resolução, <b>conforme descrito e assinalado abaixo</b>, devolvemos para regularização e reenvio a esta Seção de Seleção e Acompanhamento de Estágio para prosseguimento e análise do pedido:</p>
       
       
        <p style="margin: 0; font-weight: ${ls.getItem("bold") == "true" ? 700 : 400}; background-color: ${markupColor};">${corpoDocumentos}</p>
       
        <p>Atenciosamente,</br>
        ${document.querySelector("#input-nome").value}
        </p>

    </div>`;

    writeClipboardHTML(htmlContent, htmlContent.replace(/<[^>]*>/g, ''));
});
//#fbff00
//#FF9999

const checkCon = document.getElementById("check_con")
const checkConciliadorInfo = document.getElementById("check_conciliador_informatica")

const checkPos = document.getElementById("check_pos")
const checkPosDiploma = document.getElementById("check_pos_diploma")
const checkPosVigencia = document.getElementById("check_pos_vigencia")
const checkPosOAB = document.getElementById("check_pos_oab")

function updateConciliador(){
    if(!checkCon.checked){
        checkConciliadorInfo.checked = false
        checkConciliadorInfo.disabled = true
    }else{
        checkConciliadorInfo.disabled = false
    }
}

function updatePos(){
    if(!checkPos.checked){
        checkPosDiploma.checked = false
	checkPosOAB.checked = false
        checkPosVigencia.checked = false

        checkPosDiploma.disabled = true
	checkPosOAB.disabled = true
        checkPosVigencia.disabled = true
    }else{
        checkPosDiploma.disabled = false
	checkPosOAB.disabled = false
        checkPosVigencia.disabled = false
    }
}

checkCon.addEventListener("change", updateConciliador)
checkPos.addEventListener("change", updatePos)

updateConciliador()
updatePos()


const container = document.querySelector("#items");
const btnToggle = document.querySelector("#toggle-drag");
const btnClear = document.querySelector("#clear-drag");
const ordemOriginal = [...container.children]; // guarda a ordem padrão
let dragAtivo = false;
let itemArrastado = null;

// identifica cada elemento (item ou título) de forma estável
const chave = el => el.querySelector("input")?.id ?? "titulo:" + el.textContent.trim();

// adiciona o "⋮⋮" em cada item
container.querySelectorAll(".item").forEach(item => {
    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.style.marginRight = "8px";
    handle.textContent = "⋮⋮";
    item.prepend(handle);
});

function atualizarEstadoDrag() {
    container.classList.toggle("editando", dragAtivo);
    container.querySelectorAll(".item").forEach(item => {
        item.draggable = dragAtivo;
    });

    btnToggle.innerHTML = `<svg class="icon" height="24px" viewBox="0 -960 960 960" width="24px">${
        dragAtivo
            ? '<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>'
            : '<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>'
    }</svg>`;
    btnToggle.classList.toggle("disabled", !dragAtivo);
    btnClear.style.display = dragAtivo ? "flex" : "none";
}

function salvarOrdem() {
    const ordem = [...container.children].map(chave);
    localStorage.setItem("ordem_pendencias", JSON.stringify(ordem));
}

function restaurarOrdem() {
    const ordem = JSON.parse(localStorage.getItem("ordem_pendencias") || "null");
    if (!ordem) return;

    const porChave = new Map([...container.children].map(el => [chave(el), el]));
    ordem.forEach(k => {
        const el = porChave.get(k);
        if (el) { container.appendChild(el); porChave.delete(k); }
    });
    porChave.forEach(el => container.appendChild(el)); // itens novos vão pro final
}

function resetarOrdem() {
    localStorage.removeItem("ordem_pendencias");
    ordemOriginal.forEach(el => container.appendChild(el)); // checkboxes continuam marcados
}

btnToggle.addEventListener("click", () => {
    dragAtivo = !dragAtivo;
    if (!dragAtivo) salvarOrdem();
    atualizarEstadoDrag();
});

btnClear.addEventListener("click", resetarOrdem);

// --- drag and drop ---
function getElementoAbaixo(y) {
    return [...container.querySelectorAll(".item:not(.dragging)")].reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return (offset < 0 && offset > closest.offset) ? { offset, element: child } : closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

let drag = null;

container.addEventListener("pointerdown", e => {
    const handle = e.target.closest(".drag-handle");
    if (!dragAtivo || !handle) return;

    const item = handle.closest(".item");
    const rect = item.getBoundingClientRect();

    // limites medidos ANTES de mexer em qualquer coisa
    const todos = [...container.querySelectorAll(".item")];
    const limiteTopo = todos[0].getBoundingClientRect().top;
    const limiteFundo = todos[todos.length - 1].getBoundingClientRect().bottom;

    const placeholder = document.createElement("div");
    placeholder.className = "item-placeholder";
    placeholder.style.height = rect.height + "px";
    item.after(placeholder);

    Object.assign(item.style, {
        position: "fixed",
        left: rect.left + "px",
        top: rect.top + "px",
        width: rect.width + "px",
        margin: "0",
        zIndex: "10"
    });
    item.classList.add("dragging");

    handle.setPointerCapture(e.pointerId);
    drag = { item, placeholder, offsetY: e.clientY - rect.top, height: rect.height, limiteTopo, limiteFundo };
    e.preventDefault();
});

container.addEventListener("pointermove", e => {
    if (!drag) return;
    const { item, placeholder, offsetY, height, limiteTopo, limiteFundo } = drag;

    const maxTop = limiteFundo - height;
    const top = Math.max(limiteTopo, Math.min(e.clientY - offsetY, maxTop));
    item.style.top = top + "px";

    const itens = [...container.querySelectorAll(".item:not(.dragging)")];
    const centro = top + height / 2;

    let abaixo;
    if (top <= limiteTopo + 1) {
        abaixo = itens[0];          // colado no topo: primeiro lugar
    } else if (top >= maxTop - 1) {
        abaixo = null;              // colado no fundo: último lugar
    } else {
        abaixo = itens.find(el => {
            const b = el.getBoundingClientRect();
            return centro < b.top + b.height / 2;
        });
    }

    if (abaixo) {
        if (placeholder.nextElementSibling !== abaixo) container.insertBefore(placeholder, abaixo);
    } else if (container.lastElementChild !== placeholder) {
        container.appendChild(placeholder);
    }
});

function soltar() {
    if (!drag) return;
    const { item, placeholder } = drag;
    item.style.cssText = "";
    item.classList.remove("dragging");
    placeholder.replaceWith(item);
    drag = null;
}

container.addEventListener("pointerup", soltar);
container.addEventListener("pointercancel", soltar);

restaurarOrdem();
atualizarEstadoDrag();