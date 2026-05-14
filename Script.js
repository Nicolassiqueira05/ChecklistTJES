let button = document.querySelector("#GenerateButton");

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
        getPendencia("check_oficio", "(X) Solicitação da contratação do (a) estagiário(a) assinado pelo Gestor da vaga de estágio, nos termos Resolução nº 07/2016;"),
        getPendencia("check_foto", "(X) 01 (uma) fotografia 3x4 (Art. 24);"),
        getPendencia("check_banco", "(X) Comprovante Bancário (cópia do extrato ou cartão) contendo número da conta corrente ou universitária (Banco do Estado do Espírito Santo - Banestes) (Art. 24);"),
        getPendencia("check_declaracao_ensino", "(X) Declaração, atualizada, da Instituição de Ensino Superior, constando a MATRÍCULA, o PERÍODO, o CURSO e o HORÁRIO DE FREQUÊNCIA (Art. 24); (OU INTEGRALIZAÇÃO CURRICULAR - UFES)"),
        getPendencia("check_rg_cpf", "(X) Cópia da Carteira de Identidade e do Cadastro de Pessoas Físicas (CPF) (Art. 24);"),
        getPendencia("check_curriculo", "(X) Currículo (deverá constar o número do telefone para contato e do endereço eletrônico (e-mail)) (Art. 24);"),
        getPendencia("check_residencia", "(X) Cópia de comprovante de residência (Art. 24);"),
        getPendencia("check_aso", "(X) ASO – Atestado de Saúde Ocupacional, fornecido por médico do trabalho, com validade de até 60 (sessenta) dias (Art. 24);"),
        getPendencia("check_titulo", "(X) Cópia do título de eleitor (Art. 24);"),
        getPendencia("check_ctps", "(X) Carteira de Trabalho e Previdência Social – CTPS"),
        getPendencia("check_parentesco", `(X) <a href="https://www.tjes.jus.br/PDF/setorestagio/modelos/2_Formulario_Declaracao%20de%20Parentesco%2020160428.doc" target="_blank" style="color: blue; text-decoration: underline;">Declaração de parentesco, devidamente preenchida e assinada (Art. 24);</a>;`),
        getPendencia("check_vinculo_oab", `(X) <a href="https://www.tjes.jus.br/wp-content/uploads/1_Formulario_Declaracao-de-Vinculo-Profissional-20160428.odt" target="_blank" style="color: blue; text-decoration: underline;">Declaração de não vínculo profissional com escritório de advocacia (Art. 24)</a>;`),
        getPendencia("check_declaracao_banco", `(X) <a href="https://www.tjes.jus.br/wp-content/uploads/Formul%C3%A1rio-Declara%C3%A7%C3%A3o-de-Conta-Banc%C3%A1ria-20170717.pdf" target="_blank" style="color: blue; text-decoration: underline;">Declaração de Conta Bancária, devidamente preenchida e assinada</a>;`),
        getPendencia("check_formulario_cadastro", `(X) <a href="https://www.tjes.jus.br/wp-content/uploads/Fomul%C3%A1rio-de-Cadastro-de-estagi%C3%A1rios.pdf" target="_blank" style="color: blue; text-decoration: underline;">Formulário Obrigatório de Cadastro de Estagiário</a>`),
        getPendencia("check_supervisor_anterior", `(X) Preencher <b>FORMULÁRIO DO SUPERVISOR DE ESTÁGIO</b> referente ao <b>ESTAGIÁRIO ANTERIOR</b> (modelo disponível no SEI ou em PDF <a href="https://www.tjes.jus.br/wp-content/uploads/Formulario_do_Supervisor_-_Estagiarios.pdf" target="_blank" style="color: blue; text-decoration: underline;">CLIQUE AQUI</a>)`)
    ];

    const pendenciasCertidoes = [
        getPendencia("check_certidao_eleitoral", "(X) Certidão Negativa da Justiça Eleitoral;"),
        getPendencia("check_certidao_militar", "(X) Certidão Negativa da Justiça Militar;"),
        getPendencia("check_certidao_criminal", "(X) Certidão Negativa de natureza Criminal da Justiça Estadual, Federal ou Distrito Federal;")
    ];

    const pendenciasPos = [
        getPendencia("check_pos_diploma", "(X) Cópia do diploma de conclusão do curso superior e declaração de inexistência de inscrição ativa junto à OAB (Art. 24);"),
        getPendencia("check_pos_vigencia", "(X) Declaração da Instituição de Ensino Superior contendo início e término do curso de pós-graduação.")
    ];

    const con = document.getElementById("check_con").checked
    const pos = document.getElementById("check_pos").checked

    const conciliador = getPendencia("check_conciliador_informatica", "(X) Declaração de conhecimentos básicos em informática e digitação.");
    const supervisorNovo = getPendencia("check_dados_supervisor_novo", "(X) A Seção de Seleção e Acompanhamento de Estágio informa que se faz necessário a indicação de <b>NOME COMPLETO E CPF DO SUPERVISOR</b> do Estagiário nessa unidade.");

    let corpoDocumentos = [
        ...pendenciasGerais,
        ...pendenciasCertidoes,
        ...(pendenciasPos.filter(i => i !== null).length > 0 && pos ? ["<br><b>Exclusivamente nos casos de estágio de Pós-Graduação:</b>", ...pendenciasPos] : []),
        ...(conciliador && con ? ["<br><b>Exclusivamente nos casos de estágio Conciliador:</b>", conciliador] : []),
        ...(supervisorNovo ? ["<br>" + supervisorNovo] : [])
    ].filter(i => i !== null).join("<br>");

    let htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.5; color: #000;">
        <p><b>À (AO) ${document.querySelector("#input-setor").value}</b></p>
        <p>Prezado (a) Senhor (a),</p>
        <p>Considerando que a emissão do <b>Termo de Compromisso de Estágio</b> deve ser nos termos da <b>Resolução nº 036/2025</b>, bem como o <b>Ato Normativo TJES nº 007/2026</b>.</p>
        <p>Considerando que a documentação apresentada está em desacordo com a referida Resolução, conforme descrito e assinalado abaixo, devolvemos para regularização e reenvio a esta <b>Seção de Seleção e Acompanhamento de Estágio</b> para prosseguimento e análise do pedido:</p>
       
        <p style="margin: 0; background-color: #fbff00">${corpoDocumentos}</p>
       
        <br>
        <p>Atenciosamente,</br>
        ${document.querySelector("#input-nome").value}
        </p>

    </div>`;

    writeClipboardHTML(htmlContent, htmlContent.replace(/<[^>]*>/g, ''));
});

const checkCon = document.getElementById("check_con")
const checkConciliadorInfo = document.getElementById("check_conciliador_informatica")

const checkPos = document.getElementById("check_pos")
const checkPosDiploma = document.getElementById("check_pos_diploma")
const checkPosVigencia = document.getElementById("check_pos_vigencia")

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
        checkPosVigencia.checked = false

        checkPosDiploma.disabled = true
        checkPosVigencia.disabled = true
    }else{
        checkPosDiploma.disabled = false
        checkPosVigencia.disabled = false
    }
}

checkCon.addEventListener("change", updateConciliador)
checkPos.addEventListener("change", updatePos)

updateConciliador()
updatePos()
