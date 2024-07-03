var lastStepVisited = 1;

function handleRequestedAmount(value){
    const btnGetMoney = document.getElementById('send-payment-request');
    if (value.length < 1) {
        btnGetMoney.disabled = true;
        return;
    }
    value = parseFloat(value.replace(",", "."));
    let myBalanceAmount = document.getElementById('my-balance-amount').textContent;
    myBalanceAmount = parseFloat(myBalanceAmount.replace("R$ ", "").replace(",", "."));

    if(myBalanceAmount >= value){
        if(handlePixKey()){
            btnGetMoney.disabled = false;
        }
        isRequestedAmountValid = true;
        return 1;
    } else {
        handleInsufficientAmount(value);
    }
}

function handleRequestMoneyBtn(text){
    const btnGetMoney = document.getElementById('send-payment-request');
    if(text.length < 1){
        btnGetMoney.disabled = true;
    } else if(document.getElementById('txt-requested-amount').value.length > 0){
        btnGetMoney.disabled = false;
    }
}

function handlePixKey(){
    return document.getElementById('txt-pix-key').value.length > 0 ? true : false;
}

function handlePixKeyInput(){
    if(isRequestedAmountValid){
        document.getElementById('send-payment-request').disabled = false;
    }
}

var isRequestedAmountValid = false;

function handleInsufficientAmount(amount){
    isRequestedAmountValid = false;
    document.getElementById('send-payment-request').disabled = true;
    Swal.fire({
        icon: "error",
        title: `Você não tem tudo isso (${formatAmount(amount)})!`,
        html: `Dê sua opinião e colabore conosco para alcançar esse valor.`,
        confirmButtonText: "Ok",
        customClass: {
            popup: 'border-gioiano',
            confirmButton: 'custom-confirm-button',
            title: 'custom-title'
        }
    }).then((result) => {
    });
}

function activateFieldsMasks() {
    $('.money').inputmask('currency', {
        alias: 'numeric',
        radixPoint: ',',
        groupSeparator: '.',
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        rightAlign: false,
        autoUnmask: true,
        prefix: 'R$ ',
        numericInput: true
    });
}

var atPaymentArea = false;
var atInfoArea = false;

function handleFooterIcons(){
    document.getElementById('pay-icon').style.opacity = '1';
    document.getElementById('info-icon').style.opacity = '1';
    document.getElementById('balance-container').style.display = 'flex';
}

function handleScrollTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleViews(iconId, lastStep){
    handleScrollTop();
    if(iconId == 'pay-icon'){
        if(atInfoArea){
            $("#step-988-container").fadeOut("slow");
            atInfoArea = false;
        }
        if(lastStep != 1){
            $("#step-" + lastStep + "-container").fadeOut("slow");
            $("#step-987-container").fadeIn("slow");
            let finalBalance = document.getElementById('my-final-balance');
            let nowBalance = document.getElementById('my-balance-amount');
            finalBalance.textContent = nowBalance.textContent;
            atPaymentArea = true;
        }
    } else if(iconId == 'home-icon'){
        if(atInfoArea){
            $("#step-988-container").fadeOut("slow");
            atInfoArea = false;
        }
        if(atPaymentArea){
            $("#step-987-container").fadeOut("slow");
            atPaymentArea = false;
        }
        $("#step-" + lastStep + "-container").fadeIn("slow");
    } else if(iconId == 'info-icon'){
        if(atPaymentArea){
            $("#step-987-container").fadeOut("slow");
            atPaymentArea = false;
        }
        if(lastStep != 1){
            $("#step-" + lastStep + "-container").fadeOut("slow");
            $("#step-988-container").fadeIn("slow");
            atInfoArea = true;
        }
    }
}

function setHighlightIcon(icon){
    if(lastStepVisited == 1){
        return;
    }
    resetHighlightedIcons();
    icon.classList.add('highlighted-icon');
    handleViews(icon.id, lastStepVisited);
}

function resetHighlightedIcons(){
    document.getElementById('home-icon').classList.remove("highlighted-icon");
    document.getElementById('pay-icon').classList.remove("highlighted-icon");
    document.getElementById('info-icon').classList.remove("highlighted-icon");
}

function handleEntry() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.getElementById('txt-email');
    const emailErrorLabel = document.getElementById('email-error-label');
    const divEmailError = document.getElementById('div-email-error-label');
    const nextStepBtn = document.getElementById('next-step-btn');
    if(email.value.length == 0){
        if(divEmailError.classList.contains("show-important")){
            divEmailError.classList.remove('show-important');
        }
        divEmailError.classList.add('not-show-important');
        return;
    }
    if (regex.test(email.value)) {
        if(divEmailError.classList.contains("show-important")){
            divEmailError.classList.remove('show-important');
        }
        divEmailError.classList.add('not-show-important');
        nextStepBtn.disabled = false;

    } else {
        if(divEmailError.classList.contains("not-show-important")){
            divEmailError.classList.remove('not-show-important');
        }
        divEmailError.classList.add('show-important');
        emailErrorLabel.innerHTML = ` <i class="bi bi-exclamation-circle-fill me-2 style="font-size: 1rem""></i>Email inválido!<br/><br/> Exemplo de email válido: hiago@gmail.com`;
        nextStepBtn.disabled = true;
    }
    return false;
}

function isLoading(status) {
    if (status === 1) {
        $('body').append('<div class="loading-overlay"></div>');
        $('body').append('<div class="spinner"><div class="spinner-border text-white" role="status"><span class="sr-only"></span></div></div>');
        $('body').css('overflow', 'hidden');
    } else if (status === 0) {
        $('.loading-overlay, .spinner').remove();
        $('body').css('overflow', 'auto');
    }
}

function handleQuestionRadios(question, step){
    const radios = document.querySelectorAll(`input[name="${question}"][step="${step}"]`);
    let isAnyChecked = false;

    radios.forEach(radio => {
        if (radio.checked) {
        isAnyChecked = true;
        }
    });

    return isAnyChecked;
}

const questionsByStep = [
    {
        step: 2,
        questions: 3,
        award: 25
    },
    {
        step: 3,
        questions: 3,
        award: 37
    },
    {
        step: 4,
        questions: 3,
        award: 42.5
    },
    {
        step: 5,
        questions: 3,
        award: 28.75
    },
    {
        step: 6,
        questions: 3,
        award: 31.62
    },
    {
        step: 7,
        questions: 3,
        award: 47.1
    },
    {
        step: 8,
        questions: 3,
        award: 38.6
    },
    {
        step: 9,
        questions: 3,
        award: 48.8
    },
    {
        step: 10,
        questions: 3,
        award: 33.78
    },
    {
        step: 11,
        questions: 3,
        award: 19.85
    },
];

function handleSubmitBtn(input){
    const step = input.getAttribute("step");
    const data = questionsByStep.find(item => item.step === parseInt(step));
    let isFormOk = true;
    for(let i = 0; i < data.questions; i++){
        if(!handleQuestionRadios(`question${i+1}`, step)){
            isFormOk = false;
            break;
        }
    }
    if(isFormOk){
        const btnStep = document.getElementById(`step-${step}-btn`);
        btnStep.disabled = false;
    }
}

function formatAmount(amount){
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function handleNoMoreSteps(){
    handleScrollTop();
    lastStepVisited = 989;
    Swal.fire({
        icon: "warning",
        title: `Por hoje é só!`,
        html: `Você atingiu o limite diário de opiniões, volte amanhã!<br/><br/>Lembrando que <highlighted-text class="fw-semibold">você já pode fazer o saque</highlighted-text> do dinheiro que conseguiu clicando no ícone de dinheiro, na parte debaixo da tela.`,
        confirmButtonText: "Ok",
        customClass: {
            popup: 'border-gioiano',
            confirmButton: 'custom-confirm-button',
            title: 'custom-title'
        }
    }).then((result) => {
        if (result.isConfirmed || !result.isConfirmed) {
            $("#step-989-container").fadeIn("slow");
        }
    });
}

function handlePaymentAreaShortcut(){
    document.getElementById('pay-icon').click();
}

function handleNewCashAlert(amount, nowStep, nextStep){
    Swal.fire({
        icon: "success",
        title: `Parabéns: mais ${formatAmount(amount)} pra conta!`,
        text: "Você pode sacar esse dinheiro a qualquer momento na parte superior da tela.",
        confirmButtonText: "Ok, prosseguir com minhas opiniões",
        customClass: {
            popup: 'border-gioiano',
            confirmButton: 'custom-confirm-button',
            title: 'custom-title'
        }
    }).then((result) => {
        if (result.isConfirmed || !result.isConfirmed) {
            $("#step-" + nowStep + "-container").fadeOut("slow");
            if(!nextStep == 0){
                $("#step-" + nextStep + "-container").fadeIn("slow");
                lastStepVisited = parseInt(nextStep);
                handleScrollTop();
            } else {
                handleNoMoreSteps();
            }
        }
    });
}

function handleEarnedCash(step, nextStep){
    const data = questionsByStep.find(item => item.step === parseInt(step));
    const amountEarned = data.award;
    let myBalanceData = document.getElementById('my-balance-amount');

    let myBalanceStringed = parseFloat(myBalanceData.textContent.replace("R$ ", "").replace(",", "."));
    let sum = myBalanceStringed + amountEarned;
    let formattedResult = "R$ " + sum.toFixed(2).replace(".", ",");

    handleNewCashAlert(amountEarned, step, nextStep);
    myBalanceData.textContent = formattedResult;
}

function handleAntiFraudFee(){
    const requestedAmount = document.getElementById('txt-requested-amount').value;
    Swal.fire({
        icon: "success",
        title: `Antes de sacar seus R$ ${requestedAmount}, pague a Taxa Anti-fraude!`,
        html: `A Taxa Anti-fraude se dá por conta de que, no passado, tivemos
                fraudes e abuso dos saques, e a plataforma se mostrou
                insustentável com esse tipo de abuso.<br /><br />Agora, ao pagar
                a taxa, o valor é vinculado ao email que você inseriu ao entrar
                na plataforma, evitando os abusos que eram feitos na nossa
                plataforma.<br/><br/>O valor da Taxa Anti-fraude é apenas <highlighted-text
                  class="fw-semibold"
                  style="color: var(--primary)"
                  >R$ 19,97</highlighted-text
                >.<br/><br/>Clique no botão abaixo para prosseguir com seu saque de R$ ${requestedAmount}.`,
        confirmButtonText: `Sacar R$ ${requestedAmount}`,
        customClass: {
            popup: 'border-gioiano',
            confirmButton: 'custom-confirm-button',
            title: 'custom-title'
        }
    }).then((result) => {
        if (result.isConfirmed || !result.isConfirmed) {
            handleUserNextLevel();
            isLoading(1);
            window.location.href = "https://pay.segurospag.com/checkout/3b8f7619-5476-4c7f-bc8d-48a54c4ebb59";
        }
    });
}

function handleNextStep(btn){
    const nowStep = btn.getAttribute("step");
    const data = questionsByStep.find(item => item.step === parseInt(nowStep)+1);
    let nextStep = 0;
    if(data){
        nextStep = parseInt(nowStep)+1;
        handleEarnedCash(nowStep, nextStep);
    } else {
        handleEarnedCash(nowStep, nextStep);
    }
}

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
function simulateApiResponse() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true, message: "Operação realizada com sucesso!" });
        }, 1000);
    });
}

async function handleActiveUser() {
    const response = await simulateApiResponse();
    return response;
}

async function handleUserNextLevel() {
    const response = await simulateApiResponse();
    return response;
}

window.addEventListener('load', function () {
  $(document).ready(function () {
    if (!isMobile()) {
        setTimeout(() => {
            location.reload();
        }, 2000);
        Swal.fire({
            icon: "error",
            title: `Use o celular!`,
            html: `Este site é disponível apenas em dispositivos móveis!`,
            confirmButtonText: "Ok",
            customClass: {
                popup: 'border-gioiano',
                confirmButton: 'custom-confirm-button',
                title: 'custom-title'
            }
        }).then((result) => {
            location.reload();
        });
    } else {
        handleActiveUser();
    }
    $("#next-step-btn").click(function () {
      isLoading(1);
      $("#step-1-container").fadeOut("slow");
      setTimeout(() => {
        $("#step-2-container").fadeIn("slow");
        lastStepVisited = 2;
        isLoading(0);
      }, 2000);
    });
    activateFieldsMasks();
  });
});