/* =========================================

   SCAMSHIELD

========================================= */


let totalScans = 0;

let highRiskScans = 0;

let totalAmountChecked = 0;
/* =========================================
   RANDOM RISK REACTIONS
========================================= */

const lowRiskComments = [
    "😎 Your wallet can breathe easy.",
    "🛡️ ScamShield says: looks pretty chill.",
    "💚 No major red flags here. Nice.",
    "😌 Crisis avoided. Carry on.",
    "🧘 Your payment vibes are surprisingly peaceful.",
    "✨ Nothing suspicious screaming at us... yet.",
    "😎 Green zone. Your wallet approves.",
    "🛡️ Shield status: relaxed.",
    "💸 This payment isn't giving scam energy.",
    "🥱 ScamShield barely broke a sweat.",
    "🎯 Looks clean. Still, stay sharp.",
    "🟢 Your wallet lives another peaceful day."
];

const mediumRiskComments = [
    "🤨 Hmm... that's a little sus.",
    "👀 ScamShield is raising an eyebrow.",
    "⚠️ Something feels slightly off here.",
    "🧐 Maybe pause before hitting Pay.",
    "🤔 Your wallet wants a second opinion.",
    "🚧 Proceed carefully, detective.",
    "👀 Don't let the urgency fool you.",
    "⚠️ This payment deserves another look.",
    "😬 Not exactly giving us confidence.",
    "🔍 Time to investigate before you pay.",
    "🤨 ScamShield is officially suspicious.",
    "🟡 Yellow flag. Don't rush this."
];

const highRiskComments = [
    "🚨 BRO. STEP AWAY FROM THE PAYMENT.",
    "💀 Your wallet just filed a complaint.",
    "🚨 SCAM ENERGY DETECTED.",
    "🛑 Put the payment DOWN.",
    "💸 Your money is trying to escape.",
    "👮 ScamShield is calling the squad.",
    "🚨 Nope. We are NOT paying that.",
    "💀 This payment is looking REAL suspicious.",
    "🛑 Abort mission. Protect the wallet.",
    "🚨 Your wallet needs adult supervision.",
    "😳 BRO... WHAT WERE YOU ABOUT TO PAY?",
    "🔥 Red flags everywhere. BACK AWAY.",
    "💀 Even the wallet said 'nah bro'.",
    "🚨 ScamShield has entered panic mode.",
    "🛡️ Shield activated. Money protected."
];


function getRandomComment(comments) {

    return comments[
        Math.floor(
            Math.random() * comments.length
        )
    ];

}


/* =========================================

   NAVIGATION

========================================= */


function scrollToChecker() {


    document

        .getElementById("checker")

        .scrollIntoView({

            behavior: "smooth"

        });


}



function scrollToHow() {


    document

        .getElementById("how")

        .scrollIntoView({

            behavior: "smooth"

        });


}



/* =========================================

   DEMO DATA

========================================= */


function loadDemo() {


    document.getElementById("upi").value =

        "randomperson@upi";


    document.getElementById("amount").value =

        "1999";


    document.getElementById("message").value =

        "URGENT! Your KYC will expire today. Pay ₹1,999 immediately to avoid account suspension. Click the link and complete verification.";


    showToast("Sample scam loaded");


}



/* =========================================

   MAIN PAYMENT ANALYSIS

========================================= */


function analysePayment() {


    const upi =

        document.getElementById("upi").value.trim();


    const amount =

        Number(document.getElementById("amount").value);


    const message =

        document.getElementById("message").value.trim();



    if (!upi) {


        showToast("Please enter a UPI ID");


        return;


    }



    if (!amount || amount <= 0) {


        showToast("Please enter a valid amount");


        return;


    }



    const result =

        document.getElementById("result");


    result.classList.add("show");



    document.getElementById("riskScore").textContent = "0";


    document.getElementById("riskBar").style.width = "0%";


    document.getElementById("riskLevel").textContent =

        "ANALYSING...";


    document.getElementById("signals").innerHTML = "";



    removeContextQuestions();



    runPaymentAnalysis(

        upi,

        amount,

        message

    );


}



/* =========================================

   INITIAL RISK ENGINE

========================================= */


function runPaymentAnalysis(

    upi,

    amount,

    message

) {


    let score = 0;


    const signals = [];


    const text =

        message.toLowerCase();



    /* -------------------------------------

       URGENCY

    ------------------------------------- */


    const urgencyWords = [

        "urgent",

        "immediately",

        "now",

        "today",

        "quickly",

        "hurry",

        "expire",

        "expires"

    ];


    if (

        urgencyWords.some(word =>

            text.includes(word)

        )

    ) {


        score += 25;


        signals.push(

            "Urgency language detected"

        );


    }



    /* -------------------------------------

       ACCOUNT PRESSURE

    ------------------------------------- */


    const threatWords = [

        "blocked",

        "suspended",

        "suspend",

        "freeze",

        "legal action",

        "account will close",

        "penalty"

    ];


    if (

        threatWords.some(word =>

            text.includes(word)

        )

    ) {


        score += 25;


        signals.push(

            "Threat or account-pressure language detected"

        );


    }



    /* -------------------------------------

       COERCIVE LANGUAGE

    ------------------------------------- */


    const coerciveWords = [

        "hit you",

        "hurt you",

        "harm you",

        "kill you",

        "attack you",

        "beat you",

        "violence",

        "or else"

    ];


    if (

        coerciveWords.some(word =>

            text.includes(word)

        )

    ) {


        score += 10;


        signals.push(

            "Coercive language detected — context required"

        );


    }



    /* -------------------------------------

       PAYMENT LANGUAGE

    ------------------------------------- */


    const paymentWords = [

        "pay",

        "payment",

        "transfer",

        "send money",

        "deposit",

        "fee",

        "amount"

    ];


    if (

        paymentWords.some(word =>

            text.includes(word)

        )

    ) {


        score += 15;


        signals.push(

            "Direct payment request detected"

        );


    }



    /* -------------------------------------

       SUSPICIOUS LINK

    ------------------------------------- */


    const hasLink =

        text.includes("http://") ||

        text.includes("https://") ||

        text.includes("www.") ||

        text.includes(".com/") ||

        text.includes(".in/");


    if (hasLink) {


        score += 15;


        signals.push(

            "Link detected in payment message"

        );


    }



    /* -------------------------------------

       AMOUNT

    ------------------------------------- */


    if (amount >= 1000) {


        score += 10;


        signals.push(

            "Higher-value transaction detected"

        );


    }



    /* -------------------------------------

       UPI

    ------------------------------------- */


    const suspiciousUpiWords = [

        "support",

        "refund",

        "verify",

        "kyc",

        "help",

        "official",

        "security"

    ];


    if (

        suspiciousUpiWords.some(word =>

            upi.toLowerCase().includes(word)

        )

    ) {


        score += 20;


        signals.push(

            "Recipient ID contains suspicious keywords"

        );


    } else {


        score += 8;


        signals.push(

            "Recipient requires verification"

        );


    }



    /* -------------------------------------

       NO MESSAGE

    ------------------------------------- */


    if (!message) {


        score = Math.max(

            0,

            score - 10

        );


    }



    score =

        Math.min(

            100,

            score

        );



    /* -------------------------------------

       SHOW INITIAL RESULT

    ------------------------------------- */


    setTimeout(() => {


        showResult(

            score,

            signals,

            upi,

            amount,

            message

        );



        showContextQuestions(

            score,

            upi,

            amount,

            message,

            signals

        );


    }, 700);


}



/* =========================================

   CONTEXTUAL QUESTIONS

========================================= */


function showContextQuestions(

    initialScore,

    upi,

    amount,

    message,

    signals

) {


    if (

        initialScore < 20 &&

        !message

    ) {

        return;

    }



    const strongSignals =

        signals.filter(signal =>

            signal.includes("Urgency") ||

            signal.includes("Link") ||

            signal.includes("KYC") ||

            signal.includes("payment") ||

            signal.includes("account-pressure")

        ).length;



    /*

     * Extremely obvious cases can go

     * directly to the final assessment.

     */

    if (

        initialScore >= 85 &&

        strongSignals >= 3

    ) {

        return;

    }



    const result =

        document.getElementById("result");



    if (!result) {

        return;

    }



    const panel =

        document.createElement("div");


    panel.id =

        "contextQuestions";


    panel.className =

        "context-questions";



    const questions = [


        {

            id: "sender",

            number: "01",

            question:

                "Do you personally know the sender?",

            hint:

                "Think about whether you've interacted with this person before.",

            yes:

                "Yes, I know them",

            no:

                "No, I don't know them"

        },


        {

            id: "expected",

            number: "02",

            question:

                "Were you expecting this payment request?",

            hint:

                "Was this payment something you were already expecting?",

            yes:

                "Yes, I expected it",

            no:

                "No, it was unexpected"

        },


        {

            id: "method",

            number: "03",

            question:

                "Is this a normal payment method for them?",

            hint:

                "For example, is this the same UPI/account you normally use?",

            yes:

                "Yes, it's normal",

            no:

                "No, it's unusual"

        },


        {

            id: "pressure",

            number: "04",

            question:

                "Are they pressuring you to pay immediately?",

            hint:

                "Look for phrases like “right now”, “urgent”, or “don't delay”.",

            yes:

                "Yes, I'm being pressured",

            no:

                "No, there's no pressure"

        },


        {

            id: "verified",

            number: "05",

            question:

                "Have you independently verified who you're paying?",

            hint:

                "For example, by calling them through a trusted number.",

            yes:

                "Yes, I verified them",

            no:

                "No, I haven't verified"

        }


    ];



    let currentQuestion = 0;


    const answers = {};



    /* =====================================

       RENDER QUESTION

    ===================================== */


    function renderQuestion() {


        const question =

            questions[currentQuestion];



        const progress =

            Math.round(

                (currentQuestion /

                questions.length) * 100

            );



        panel.innerHTML = `


            <div class="context-top">


                <div class="context-label">


                    <span class="context-dot"></span>


                    CONTEXT CHECK


                </div>


                <div class="context-progress-text">


                    ${currentQuestion + 1}

                    /

                    ${questions.length}


                </div>


            </div>



            <div class="context-progress">


                <div

                    class="context-progress-fill"

                    style="width:${progress}%"

                ></div>


            </div>



            <div class="context-question-content">


                <div class="context-question-number">


                    ${question.number}


                </div>



                <div class="context-question-main">


                    <h3>

                        ${question.question}

                    </h3>


                    <p>

                        ${question.hint}

                    </p>


                </div>


            </div>



            <div class="context-answer-grid">


                <button

                    type="button"

                    class="context-answer"

                    data-value="yes"

                >


                    <span class="answer-icon">

                        ✓

                    </span>



                    <span class="answer-content">


                        <strong>

                            ${question.yes}

                        </strong>


                        <small>

                            Select this answer

                        </small>


                    </span>



                    <span class="answer-arrow">

                        →

                    </span>


                </button>



                <button

                    type="button"

                    class="context-answer"

                    data-value="no"

                >


                    <span class="answer-icon">

                        !

                    </span>



                    <span class="answer-content">


                        <strong>

                            ${question.no}

                        </strong>


                        <small>

                            Select this answer

                        </small>


                    </span>



                    <span class="answer-arrow">

                        →

                    </span>


                </button>


            </div>



            <div class="context-footer">


                <span>

                    Your answers help refine the risk score

                </span>


                <span>

                    ${progress}%

                </span>


            </div>


        `;



        const answerButtons =

            panel.querySelectorAll(

                ".context-answer"

            );



        answerButtons.forEach(button => {


            button.addEventListener(

                "click",

                () => {


                    const value =

                        button.dataset.value;



                    answers[question.id] =

                        value;



                    button.classList.add(

                        "selected"

                    );



                    setTimeout(() => {


                        if (

                            currentQuestion <

                            questions.length - 1

                        ) {


                            currentQuestion++;


                            renderQuestion();


                        } else {


                            showContextComplete();


                        }


                    }, 300);


                }

            );


        });


    }



    /* =====================================

       COMPLETION

    ===================================== */


    function showContextComplete() {


        panel.innerHTML = `


            <div class="context-complete">


                <div class="context-complete-icon">

                    ✓

                </div>



                <div class="context-complete-label">

                    CONTEXT COLLECTED

                </div>



                <h3>

                    Ready to calculate your final risk

                </h3>



                <p>

                    ScamShield has enough context to refine

                    the initial assessment.

                </p>



                <div class="context-summary">


                    <div>


                        <span>

                            Questions answered

                        </span>


                        <strong>

                            5 / 5

                        </strong>


                    </div>



                    <div>


                        <span>

                            Initial risk

                        </span>


                        <strong>

                            ${initialScore}%

                        </strong>


                    </div>


                </div>



                <button

                    type="button"

                    id="contextAnalyseButton"

                    class="context-analyse-button"

                >


                    CALCULATE FINAL RISK


                    <span>

                        →

                    </span>


                </button>


            </div>


        `;



        document

            .getElementById(

                "contextAnalyseButton"

            )

            .addEventListener(

                "click",

                () => {


                    refineRiskAssessment(

                        initialScore,

                        signals,

                        answers,

                        upi,

                        amount,

                        message

                    );


                }

            );


    }



    result.appendChild(panel);



    renderQuestion();



    setTimeout(() => {


        panel.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });


    }, 250);


}



/* =========================================

   REFINE RISK ASSESSMENT

========================================= */


function refineRiskAssessment(

    initialScore,

    originalSignals,

    answers,

    upi,

    amount,

    message

) {


    let adjustment = 0;


    const contextualSignals = [];



    /* -------------------------------------

       KNOWN SENDER

    ------------------------------------- */


    if (answers.sender === "yes") {


        adjustment -= 15;


        contextualSignals.push(

            "Sender is personally known"

        );


    } else {


        adjustment += 15;


        contextualSignals.push(

            "Sender is not personally known"

        );


    }



    /* -------------------------------------

       EXPECTED PAYMENT

    ------------------------------------- */


    if (answers.expected === "yes") {


        adjustment -= 15;


        contextualSignals.push(

            "Payment request was expected"

        );


    } else {


        adjustment += 15;


        contextualSignals.push(

            "Payment request was unexpected"

        );


    }



    /* -------------------------------------

       NORMAL METHOD

    ------------------------------------- */


    if (answers.method === "yes") {


        adjustment -= 10;


        contextualSignals.push(

            "Payment method matches normal behaviour"

        );


    } else {


        adjustment += 20;


        contextualSignals.push(

            "Unusual payment method reported"

        );


    }



    /* -------------------------------------

       PRESSURE

    ------------------------------------- */


    if (answers.pressure === "yes") {


        adjustment += 15;


        contextualSignals.push(

            "Sender is applying immediate pressure"

        );


    } else {


        adjustment -= 5;


        contextualSignals.push(

            "No immediate payment pressure reported"

        );


    }



    /* -------------------------------------

       VERIFICATION

    ------------------------------------- */


    if (answers.verified === "yes") {


        adjustment -= 15;


        contextualSignals.push(

            "Recipient was independently verified"

        );


    } else {


        adjustment += 10;


        contextualSignals.push(

            "Recipient has not been independently verified"

        );


    }



    /* -------------------------------------

       FINAL SCORE

    ------------------------------------- */


    let finalScore =

        initialScore + adjustment;



    finalScore =

        Math.max(

            0,

            Math.min(

                100,

                finalScore

            )

        );



    const finalSignals = [

        ...originalSignals,

        ...contextualSignals

    ];



    /* -------------------------------------

       COERCIVE LANGUAGE

    ------------------------------------- */


    const text =

        message.toLowerCase();



    const hasCoercion =

        [

            "hit you",

            "hurt you",

            "harm you",

            "kill you",

            "attack you",

            "beat you",

            "violence",

            "or else"

        ].some(word =>

            text.includes(word)

        );



    if (hasCoercion) {


        finalSignals.push(

            "Coercive language should be evaluated with sender context"

        );


    }



    /*

     * Prevent the final call from counting

     * another scan in history.

     */

    window.scamShieldContextRefining = true;



    removeContextQuestions();



    showResult(

        finalScore,

        finalSignals,

        upi,

        amount,

        message

    );



    setTimeout(() => {

        const result = document.getElementById("result");


        if (result) {

            result.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    }, 150);



    window.scamShieldContextRefining = false;



    showContextExplanation(

        initialScore,

        finalScore,

        adjustment

    );


}



/* =========================================

   CONTEXT EXPLANATION

========================================= */


function showContextExplanation(

    initialScore,

    finalScore,

    adjustment

) {


    const result =

        document.getElementById(

            "result"

        );



    if (!result) {

        return;

    }



    const existing =

        document.getElementById(

            "contextExplanation"

        );



    if (existing) {

        existing.remove();

    }



    const explanation =

        document.createElement("div");



    explanation.id =

        "contextExplanation";


    explanation.className =

        "context-explanation";



    let title =

        "CONTEXT ASSESSMENT UPDATED";



    let text = "";



    if (adjustment < 0) {


        text =

            "Your answers reduced the initial risk because the payment appears more familiar, expected, or independently verified.";


    } else if (adjustment > 0) {


        text =

            "Your answers increased the risk because the payment appears unexpected, unverified, pressured, or unusual.";


    } else {


        text =

            "Your answers did not materially change the initial assessment.";


    }



    explanation.innerHTML = `


        <strong>

            ${title}

        </strong>



        <p>

            ${text}

        </p>



        <small>

            Initial assessment:

            ${initialScore}%

            &nbsp;→&nbsp;

            Context-adjusted:

            ${finalScore}%

        </small>


    `;



    result.appendChild(

        explanation

    );


}



/* =========================================

   REMOVE CONTEXT UI

========================================= */


function removeContextQuestions() {


    const panel =

        document.getElementById(

            "contextQuestions"

        );



    if (panel) {


        panel.remove();


    }



    const explanation =

        document.getElementById(

            "contextExplanation"

        );



    if (explanation) {


        explanation.remove();


    }


}



/* =========================================

   RESULT + HERO UPDATE

========================================= */


function showResult(

    score,

    signals,

    upi,

    amount,

    message

) {


    animateScore(score);



    const riskBar =

        document.getElementById("riskBar");



    if (riskBar) {


        riskBar.style.width =

            score + "%";


    }



    const riskLevel =

        document.getElementById("riskLevel");



    if (riskLevel) {


        if (score >= 60) {


            riskLevel.textContent =

                "HIGH RISK";


            riskLevel.style.color =

                "var(--red)";


            if (riskBar) {

                riskBar.style.background =

                    "var(--red)";

            }


        } else if (score >= 30) {


            riskLevel.textContent =

                "MEDIUM RISK";


            riskLevel.style.color =

                "var(--yellow)";


            if (riskBar) {

                riskBar.style.background =

                    "var(--yellow)";

            }


        } else {


            riskLevel.textContent =

                "LOW RISK";


            riskLevel.style.color =

                "var(--green)";


            if (riskBar) {

                riskBar.style.background =

                    "var(--green)";

            }


        }


    }



    /* -------------------------------------

       SIGNALS

    ------------------------------------- */


    const signalsContainer =

        document.getElementById(

            "signals"

        );



    if (signalsContainer) {


        signalsContainer.innerHTML = "";



        if (signals.length === 0) {


            const item =

                document.createElement("div");


            item.className =

                "signal";


            item.textContent =

                "No major warning signals detected.";


            signalsContainer.appendChild(

                item

            );


        } else {


            signals.forEach(

                (signal, index) => {


                    const item =

                        document.createElement("div");


                    item.className =

                        "signal";


                    item.style.animationDelay =

                        `${index * 0.08}s`;


                    item.textContent =

                        signal;


                    signalsContainer.appendChild(

                        item

                    );


                }

            );


        }


    }



    /* -------------------------------------

       HISTORY

    ------------------------------------- */


    if (

        !window.scamShieldContextRefining

    ) {


        totalScans++;


        totalAmountChecked += amount;



        if (score >= 60) {


            highRiskScans++;


        }



        updateHistory();


    }



    /* -------------------------------------

       HERO

    ------------------------------------- */


    updateHero(

        score,

        upi,

        amount,

        message,

        signals

    );

    updateAuthorityReport(
    score,
    upi,
    amount,
    message,
    signals
);


}



/* =========================================

   HERO UPDATE

========================================= */


function updateHero(

    score,

    upi,

    amount,

    message,

    signals

) {


    const heroCard =

        document.getElementById(

            "heroSecurityCard"

        );



    if (heroCard) {


        heroCard.classList.add(

            "active"

        );


    }



    /* -------------------------------------

       SCORE

    ------------------------------------- */


    const heroScore =

        document.getElementById(

            "heroRiskScore"

        );



    if (heroScore) {


        heroScore.textContent =

            score;



        if (score >= 60) {


            heroScore.style.color =

                "var(--red)";


        } else if (score >= 30) {


            heroScore.style.color =

                "var(--yellow)";


        } else {


            heroScore.style.color =

                "var(--green)";


        }


    }



    /* -------------------------------------

       UPI

    ------------------------------------- */


    const heroUpi =

        document.getElementById(

            "heroUpi"

        );



    if (heroUpi) {


        heroUpi.textContent =

            upi;


    }



    /* -------------------------------------

       AMOUNT

    ------------------------------------- */


    const heroAmount =

        document.getElementById(

            "heroAmount"

        );



    if (heroAmount) {


        heroAmount.textContent =

            "₹" +

            Number(amount)

                .toLocaleString("en-IN");


    }



    /* -------------------------------------

       MESSAGE

    ------------------------------------- */


    const heroMessage =

        document.getElementById(

            "heroMessageText"

        );



    if (heroMessage) {


        heroMessage.textContent =

            message ||

            "No message provided";


    }



    /* -------------------------------------

       STATUS

    ------------------------------------- */


    const recipientStatus =

        document.getElementById(

            "heroRecipientStatus"

        );


    const messageStatus =

        document.getElementById(

            "heroMessageStatus"

        );


    const patternStatus =

        document.getElementById(

            "heroPatternStatus"

        );



    if (recipientStatus) {


        recipientStatus.textContent =

            "✓";


    }



    if (messageStatus) {


        messageStatus.textContent =

            message

                ? "✓"

                : "—";


    }



    if (patternStatus) {


        patternStatus.textContent =

            score >= 30

                ? "!"

                : "✓";


    }



    /* -------------------------------------

       HERO RISK LABEL

    ------------------------------------- */


    const heroRiskLabel =

        document.getElementById(

            "heroRiskLabel"

        );



    if (heroRiskLabel) {


        if (score >= 60) {


            heroRiskLabel.textContent =

                "HIGH RISK";


            heroRiskLabel.style.color =

                "var(--red)";


        } else if (score >= 30) {


            heroRiskLabel.textContent =

                "MEDIUM RISK";


            heroRiskLabel.style.color =

                "var(--yellow)";


        } else {


            heroRiskLabel.textContent =

                "LOW RISK";


            heroRiskLabel.style.color =

                "var(--green)";


        }


    }



    /* -------------------------------------

       HERO RISK BAR

    ------------------------------------- */


    const heroRiskLine =

        document.getElementById(

            "heroRiskLine"

        );



    if (heroRiskLine) {


        heroRiskLine.style.width =

            score + "%";



        if (score >= 60) {


            heroRiskLine.style.background =

                "var(--red)";


        } else if (score >= 30) {


            heroRiskLine.style.background =

                "var(--yellow)";


        } else {


            heroRiskLine.style.background =

                "var(--green)";


        }


    }



    /* -------------------------------------

       FLOATING AMOUNT TAG

    ------------------------------------- */


    const heroTagAmount =

        document.getElementById(

            "heroTagAmount"

        );



    if (heroTagAmount) {


        heroTagAmount.textContent =

            "₹" +

            Number(amount)

                .toLocaleString("en-IN") +

            " payment";


    }



    /* -------------------------------------

       FLOATING RISK TAG

    ------------------------------------- */


    const heroTagRisk =

        document.getElementById(

            "heroTagRisk"

        );



    if (heroTagRisk) {


        if (score >= 60) {


            heroTagRisk.textContent =

                "⚠ Risk detected";


            heroTagRisk.style.color =

                "#ff9a9a";


        } else if (score >= 30) {


            heroTagRisk.textContent =

                "⚠ Review payment";


            heroTagRisk.style.color =

                "var(--yellow)";


        } else {


            heroTagRisk.textContent =

                "✓ Low risk";


            heroTagRisk.style.color =

                "var(--green)";


        }


    }


}



/* =========================================

   SCORE ANIMATION

========================================= */


function animateScore(target) {


    const element =

        document.getElementById(

            "riskScore"

        );



    if (!element) {

        return;

    }



    let current = 0;


    const duration = 900;


    const startTime =

        performance.now();



    function update(now) {


        const progress =

            Math.min(

                (now - startTime) /

                duration,

                1

            );



        const eased =

            1 -

            Math.pow(

                1 - progress,

                3

            );



        current =

            Math.round(

                target * eased

            );



        element.textContent =

            current;



        if (progress < 1) {


            requestAnimationFrame(

                update

            );


        }


    }



    requestAnimationFrame(

        update

    );


}



/* =========================================

   MESSAGE SCANNER

========================================= */


function scanMessage() {


    const input =

        document.getElementById(

            "messageScanner"

        );


    const result =

        document.getElementById(

            "messageResult"

        );



    const message =

        input.value.trim()

            .toLowerCase();



    if (!message) {


        showToast(

            "Paste a message first"

        );


        return;


    }



    let score = 0;


    const reasons = [];



    if (

        /urgent|immediately|now|today|hurry/

            .test(message)

    ) {


        score += 25;


        reasons.push(

            "Urgency detected"

        );


    }



    if (

        /blocked|suspended|freeze|legal action/

            .test(message)

    ) {


        score += 25;


        reasons.push(

            "Threat detected"

        );


    }



    if (

        /pay|payment|transfer|send money|fee/

            .test(message)

    ) {


        score += 20;


        reasons.push(

            "Payment request detected"

        );


    }



    if (

        /kyc|verify|verification/

            .test(message)

    ) {


        score += 20;


        reasons.push(

            "KYC/verification language detected"

        );


    }



    if (

        /https?:\/\/|www\./

            .test(message)

    ) {


        score += 15;


        reasons.push(

            "Suspicious link detected"

        );


    }



    score =

        Math.min(

            score,

            100

        );



    result.classList.add("show");



    if (score >= 60) {


        result.style.background =

            "#321b1c";


        result.style.color =

            "var(--red)";


        result.textContent =

            `High risk — ${score}% risk. ${reasons.join(". ")}.`;


    } else if (score >= 30) {


        result.style.background =

            "#332d1b";


        result.style.color =

            "var(--yellow)";


        result.textContent =

            `Medium risk — ${score}% risk. ${reasons.join(". ")}.`;


    } else {


        result.style.background =

            "#172414";


        result.style.color =

            "var(--green)";


        result.textContent =

            "No major scam signals detected.";


    }



    totalScans++;



    if (score >= 60) {


        highRiskScans++;


    }



    updateHistory();


}



/* =========================================

   LINK CHECKER

========================================= */


function checkLink() {


    const input =

        document.getElementById(

            "linkInput"

        );


    const result =

        document.getElementById(

            "linkResult"

        );



    const link =

        input.value.trim()

            .toLowerCase();



    if (!link) {


        showToast(

            "Enter a link first"

        );


        return;


    }



    let score = 0;


    const reasons = [];



    if (

        !link.startsWith("https://")

    ) {


        score += 25;


        reasons.push(

            "Not using HTTPS"

        );


    }



    if (

        /bit\.ly|tinyurl|t\.co|goo\.gl/

            .test(link)

    ) {


        score += 25;


        reasons.push(

            "Shortened URL"

        );


    }



    if (

        /login|verify|kyc|refund|claim|support|password/

            .test(link)

    ) {


        score += 25;


        reasons.push(

            "Sensitive keyword detected"

        );


    }



    if (

        /@|%40|free|prize|winner/

            .test(link)

    ) {


        score += 25;


        reasons.push(

            "Suspicious URL pattern"

        );


    }



    score =

        Math.min(

            score,

            100

        );



    result.classList.add("show");



    if (score >= 60) {


        result.style.background =

            "#321b1c";


        result.style.color =

            "var(--red)";


        result.textContent =

            `Suspicious link — ${score}% risk. ${reasons.join(". ")}.`;


    } else if (score >= 30) {


        result.style.background =

            "#332d1b";


        result.style.color =

            "var(--yellow)";


        result.textContent =

            `Review this link — ${score}% risk. ${reasons.join(". ")}.`;


    } else {


        result.style.background =

            "#172414";


        result.style.color =

            "var(--green)";


        result.textContent =

            "No obvious warning signals detected.";


    }


}



/* =========================================

   SCAM SIMULATOR

========================================= */


function runSimulator() {


    const type =

        document.getElementById(

            "scamType"

        ).value;



    const result =

        document.getElementById(

            "simulatorResult"

        );



    const scenarios = {


        kyc: {

            score: 92,

            text:

                "KYC scam: urgent verification + account suspension pressure."

        },


        support: {

            score: 86,

            text:

                "Fake support scam: impersonation + payment request."

        },


        job: {

            score: 78,

            text:

                "Fake job scam: upfront fee or deposit request."

        },


        investment: {

            score: 95,

            text:

                "Investment scam: high-pressure transfer + guaranteed returns."

        },


        lottery: {

            score: 90,

            text:

                "Lottery scam: fake prize + upfront payment requirement."

        }


    };



    const scenario =

        scenarios[type];



    result.classList.add("show");


    result.style.background =

        "#321b1c";


    result.style.color =

        "var(--red)";



    result.textContent =

        `${scenario.text} Simulated risk: ${scenario.score}%.`;


}



/* =========================================

   HISTORY

========================================= */


function updateHistory() {


    const total =

        document.getElementById(

            "totalScans"

        );


    const highRisk =

        document.getElementById(

            "highRiskScans"

        );


    const amount =

        document.getElementById(

            "protectedAmount"

        );



    if (total) {


        total.textContent =

            totalScans;


    }



    if (highRisk) {


        highRisk.textContent =

            highRiskScans;


    }



    if (amount) {


        amount.textContent =

            "₹" +

            totalAmountChecked

                .toLocaleString("en-IN");


    }


}



/* =========================================

   PAUSE

========================================= */


function verifyPayment() {


    showToast(

        "Verify the recipient independently before paying."

    );


}



function cancelPayment() {


    showToast(

        "Payment paused. No money was sent."

    );


}

/* =========================================
   AUTHORITY REPORT
========================================= */

function updateAuthorityReport(
    score,
    upi,
    amount,
    message,
    signals
) {

    const report =
        document.getElementById(
            "authorityReport"
        );


    const reportUpi =
        document.getElementById(
            "reportUpi"
        );

    const reportAmount =
        document.getElementById(
            "reportAmount"
        );

    const reportScore =
        document.getElementById(
            "reportScore"
        );


    /*
     * Only show the authority report
     * for HIGH RISK results.
     */

    if (score < 60) {

        if (report) {
            report.style.display = "none";
        }

        closeAuthorityReport();

        return;

    }


    if (!report) {
        return;
    }


    report.style.display =
        "flex";


    if (reportUpi) {

        reportUpi.textContent =
            upi || "—";

    }


    if (reportAmount) {

        reportAmount.textContent =
            "₹" +
            Number(amount)
                .toLocaleString("en-IN");

    }


    if (reportScore) {

        reportScore.textContent =
            score + "%";

    }


    /*
     * Store the current report
     * information for the form.
     */

    window.scamShieldReportData = {

        score: score,

        upi: upi,

        amount: amount,

        message: message,

        signals: signals || []

    };

}


/* =========================================
   OPEN REPORT FORM
========================================= */

function openAuthorityReport() {

    const data =
        window.scamShieldReportData;


    if (!data) {

        showToast(
            "Complete a payment analysis first."
        );

        return;

    }


    const form =
        document.getElementById(
            "authorityReportForm"
        );


    if (!form) {
        return;
    }


    const upi =
        document.getElementById(
            "reportFormUpi"
        );

    const amount =
        document.getElementById(
            "reportFormAmount"
        );

    const score =
        document.getElementById(
            "reportFormScore"
        );

    const message =
        document.getElementById(
            "reportFormMessage"
        );

    const signals =
        document.getElementById(
            "reportFormSignals"
        );


    if (upi) {

        upi.value =
            data.upi || "";

    }


    if (amount) {

        amount.value =
            "₹" +
            Number(data.amount)
                .toLocaleString("en-IN");

    }


    if (score) {

        score.value =
            data.score + "%";

    }


    if (message) {

        message.value =
            data.message ||
            "No message provided";

    }


    if (signals) {

        signals.value =
            data.signals.length
                ? data.signals
                    .map(
                        signal =>
                            "• " + signal
                    )
                    .join("\n")
                : "No major warning signals detected.";

    }


    form.style.display =
        "block";


    setTimeout(() => {

        form.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 100);

}


/* =========================================
   CLOSE REPORT FORM
========================================= */

function closeAuthorityReport() {

    const form =
        document.getElementById(
            "authorityReportForm"
        );


    if (form) {

        form.style.display =
            "none";

    }

}


/* =========================================
   SUBMIT / CONNECT TO AUTHORITY
========================================= */

function submitAuthorityReport() {
    const data = window.scamShieldReportData;

    if (!data) {
        showToast("No report data available.");
        return;
    }

    const additionalDetails =
        document.getElementById("reportAdditionalDetails");

    const details =
        additionalDetails
            ? additionalDetails.value.trim()
            : "";

    const reportData = {
        recipient: data.upi,
        amount: data.amount,
        riskScore: data.score,
        message: data.message,
        signals: data.signals,
        additionalDetails: details,
        timestamp: new Date().toISOString()
    };

    // Save the prepared report for the demo/session
    sessionStorage.setItem(
        "scamShieldAuthorityReport",
        JSON.stringify(reportData)
    );

    // Open the official Government of India cybercrime portal
    window.open(
        "https://www.cybercrime.gov.in/",
        "_blank",
        "noopener,noreferrer"
    );

    showToast(
        "Opening the official Cyber Crime Reporting Portal..."
    );
}


/* =========================================

   TOAST

========================================= */


function showToast(message) {


    const toast =

        document.getElementById(

            "toast"

        );



    if (!toast) {

        return;

    }



    toast.textContent =

        message;



    toast.classList.add(

        "show"

    );



    setTimeout(() => {


        toast.classList.remove(

            "show"

        );


    }, 2800);


}