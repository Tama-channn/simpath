// Global tracking structure for the multi-question simulator engine
let currentSimLevel = 1;
let currentStepIndex = 0;
let accumulatedScore = 0;

// High-density question dictionary (Upgraded to 7 comprehensive questions per level)
const multiPhaseQuizData = {
    1: [
        {
            q: "Phase 1: Operational Prioritization — You discover an ongoing data ingestion failure while simultaneously formatting an urgent corporate strategy presentation deck for an executive meeting starting in 45 minutes. What is your immediate course of action?",
            options: [
                { text: "A. Ignore system troubleshooting entirely; allocate 100% of your time to polishing presentation layout slides.", score: 20 },
                { text: "B. Attempt manual database debug sweeps, then ask to delay the executive sync session.", score: 10 },
                { text: "C. Delegate data capture logs to an available developer peer, keeping your main focus on preparing the strategy deck outlines.", score: 35 },
                { text: "D. Perform an impact triage: finalize deck deliverables in 30 minutes, then use the final 15 minutes to initiate system log scans.", score: 50 }
            ]
        },
        {
            q: "Phase 2: Data Discrepancy — A key project stakeholder notices conflicting revenue baseline definitions between two market performance reports you compiled. How do you fix this?",
            options: [
                { text: "A. Advise the stakeholder to overlook the minor data variances since the final outputs align.", score: 5 },
                { text: "B. Review both reporting architectures, isolate the root variance source, and deploy a unified metrics map within an hour.", score: 50 },
                { text: "C. Attribute the fault entirely to analytics logging tool issues and submit an extended delivery window request.", score: 10 },
                { text: "D. Erase both historical report logs and build a fresh dashboard tracking layout from absolute scratch.", score: 25 }
            ]
        },
        {
            q: "Phase 3: Executive Communication — Your team's product sprint delays mean an automated tracking system won't go live by Friday's client review. How do you brief the director?",
            options: [
                { text: "A. Wait until Friday morning to see if developers fix it via a last-minute push.", score: 10 },
                { text: "B. Send an immediate structural update explaining the delay, root blockages, and an adjusted milestone roadmap.", score: 50 },
                { text: "C. Avoid mentioning the technical delay and present only the successful design prototypes.", score: 20 }
            ]
        },
        {
            q: "Phase 4: Resource Allocation — You are assigned to two critical client deliverables with overlapping deadlines. Both accounts request your full attention. How do you manage your timeline?",
            options: [
                { text: "A. Work overtime without informing management to finish both independently.", score: 30 },
                { text: "B. Pick the account with higher revenue and delay the second account without notification.", score: 15 },
                { text: "C. Map resource hours, evaluate dependencies, and request project managers to align on priority status.", score: 50 }
            ]
        },
        {
            q: "Phase 5: Product KPI Definition — You need to choose a primary North Star metric for a newly launched B2B collaboration platform. Which metric provides the truest signal?",
            options: [
                { text: "A. Total registered user accounts created since the launch campaign.", score: 15 },
                { text: "B. Number of active teams executing at least 3 shared workflow logs per week.", score: 50 },
                { text: "C. Monthly marketing landing page visitor traffic spikes.", score: 25 }
            ]
        },
        {
            q: "Phase 6: Stakeholder Alignment — A senior engineering lead rejects your product requirements document, calling your features scope-heavy. How do you handle the bottleneck?",
            options: [
                { text: "A. Escalate the issue to the executive sponsor to bypass the engineer's feedback loops.", score: 10 },
                { text: "B. Set up a review mapping session to co-create a phased release plan based on exact engineering bandwidth.", score: 50 },
                { text: "C. Strip down all core analytical features immediately to avoid any conflict.", score: 25 }
            ]
        },
        {
            q: "Phase 7: Critical Insight Synthesis — You are reviewing an internal business report filled with dense tracking tables. How do you deliver your conclusions to leadership?",
            options: [
                { text: "A. Attach the raw data spreadsheet directly to a short email note.", score: 15 },
                { text: "B. Synthesize a 3-bullet executive summary highlighting key operational trends, financial impacts, and an action recommendation.", score: 50 },
                { text: "C. Write a comprehensive 10-page text narrative detailing every single tracking parameter.", score: 30 }
            ]
        }
    ],
    2: [
        {
            q: "Phase 1: Competitive Response — An aggressive market competitor implements an immediate 30% discount on their main offering, causing a severe drop in your conversion pipelines. What is your tactical response?",
            options: [
                { text: "A. Match their action with an immediate 35% sitewide markdown strategy to preserve raw transaction volume metrics.", score: 15 },
                { text: "B. Analyze behavior data for high-value user cohorts. Introduce immediate value-add enhancements and retention guarantees.", score: 50 },
                { text: "C. Double your current broad visibility marketing spend allocations without adjusting your price structure models.", score: 30 }
            ]
        },
        {
            q: "Phase 2: Churn Mitigation — Data shows an 18% spike in subscription cancellations right after user billing cycle renewals. What is your hypothesis?",
            options: [
                { text: "A. Users are forgetting their login profiles and passwords.", score: 10 },
                { text: "B. The core product value model fails to engage users beyond the initial promotional month.", score: 50 },
                { text: "C. Payment checkout pages are suffering structural UI loading bugs.", score: 30 }
            ]
        },
        {
            q: "Phase 3: Digital Acquisition — Your cost-per-click metrics have scaled up 40% over the last quarter while active trial signups remain completely flat. How do you optimize?",
            options: [
                { text: "A. Shut down all digital acquisition funnels and pause marketing campaigns entirely.", score: 15 },
                { text: "B. Run detailed landing page asset A/B tests and audit target audience segments to remove low-intent traffic.", score: 50 },
                { text: "C. Double down on ad spend volume to overwhelm the target keyword auctions.", score: 20 }
            ]
        },
        {
            q: "Phase 4: Pricing Model Pivot — The executive team wants to transition from a flat usage fee to a multi-tiered subscription framework. What is your first step?",
            options: [
                { text: "A. Launch the new pricing system immediately to observe real-world performance spikes.", score: 15 },
                { text: "B. Segment historical customer usage logs to build predictive revenue impact models.", score: 50 },
                { text: "C. Send a mass feedback survey asking users what they want to pay.", score: 30 }
            ]
        },
        {
            q: "Phase 5: Feature Monetization — Your product team wants to monetize an advanced reporting widget. Where do you place the paywall layer?",
            options: [
                { text: "A. Lock the entire feature behind a payment screen from day one.", score: 25 },
                { text: "B. Offer a free 3-report trial tier, triggering the paywall structure once utility value is established.", score: 50 },
                { text: "C. Keep it free forever and place display ads inside the dashboard view space.", score: 10 }
            ]
        },
        {
            q: "Phase 6: Conversion Loop Tuning — The checkout conversion flow drops 50% between the add-to-cart step and final payment submission. What do you investigate first?",
            options: [
                { text: "A. Rewrite the promotional ad banners running on social media pipelines.", score: 15 },
                { text: "B. Audit checkout form fields for technical errors, speed delays, or hidden delivery costs.", score: 50 },
                { text: "C. Change the brand color schemes across the storefront layout panels.", score: 10 }
            ]
        },
        {
            q: "Phase 7: Retention Loop Design — What is the most reliable strategy to improve retention metrics for an active community product track?",
            options: [
                { text: "A. Launch weekly notification push loops reminding users to open the app.", score: 20 },
                { text: "B. Build systematic user-to-user interaction hooks and rewarding onboarding milestone paths.", score: 50 },
                { text: "C. Send out monthly email discount coupons to all user profiles.", score: 30 }
            ]
        }
    ]
};

// Toggle logic handling industry and role tags selection
function toggleFilter(btnElement, type) {
    btnElement.classList.toggle('bg-gray-100');
    btnElement.classList.toggle('text-gray-700');
    btnElement.classList.toggle('bg-simpath');
    btnElement.classList.toggle('text-white');

    const activeButtons = Array.from(document.querySelectorAll('.bg-simpath')).map(b => b.innerText.trim());
    const cards = document.querySelectorAll('#simulation-cards-container > div');

    if (activeButtons.length === 0) {
        cards.forEach(c => c.classList.remove('hidden'));
        return;
    }

    cards.forEach(card => {
        const cardRole = card.getAttribute('data-role');
        const cardIndustry = card.getAttribute('data-industry');
        
        const matchesRole = activeButtons.includes(cardRole);
        const matchesIndustry = activeButtons.includes(cardIndustry);

        if (matchesRole || matchesIndustry) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function openSimulationSystem(level) {
    currentSimLevel = level;
    currentStepIndex = 0;
    accumulatedScore = 0;
    document.getElementById('quiz-system-modal').classList.remove('hidden');
    renderSimulatorQuestion();
}

function closeSimulationSystem() {
    document.getElementById('quiz-system-modal').classList.add('hidden');
}

function renderSimulatorQuestion() {
    const questionsList = multiPhaseQuizData[currentSimLevel];
    const currentQuestionObject = questionsList[currentStepIndex];
    const modalBody = document.getElementById('q-modal-body');
    const modalFooter = document.getElementById('q-modal-footer');

    let optionsHtml = '';
    currentQuestionObject.options.forEach((opt, idx) => {
        optionsHtml += `
            <label class="block p-3.5 border rounded-xl hover:bg-slate-50 border-slate-200 cursor-pointer flex items-start space-x-3 transition">
                <input type="radio" name="sim-option-node" value="${opt.score}" class="mt-1 text-simpath focus:ring-simpath">
                <span class="text-sm text-slate-700">${opt.text}</span>
            </label>
        `;
    });

    modalBody.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center text-xs font-bold text-simpath uppercase">
                <span>Simulation Assessment Core</span>
                <span>Question ${currentStepIndex + 1} of ${questionsList.length}</span>
            </div>
            <p class="font-semibold text-slate-900 bg-slate-50 border p-4 rounded-xl text-sm leading-relaxed">${currentQuestionObject.q}</p>
            <div class="space-y-2.5">${optionsHtml}</div>
        </div>
    `;

    const isLast = (currentStepIndex === questionsList.length - 1);
    modalFooter.innerHTML = `
        <span class="text-xs text-slate-400">Target Level: Tier ${currentSimLevel}</span>
        <button onclick="processQuestionAdvance(${isLast})" class="bg-simpath text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-simpath-hover shadow">
            ${isLast ? "Compile Performance Metrics" : "Advance to Next Phase"}
        </button>
    `;
}

function processQuestionAdvance(isLast) {
    const selected = document.querySelector('input[name="sim-option-node"]:checked');
    if (!selected) {
        alert("Please select an operational path before advancing.");
        return;
    }

    accumulatedScore += parseInt(selected.value);

    if (!isLast) {
        currentStepIndex++;
        renderSimulatorQuestion();
    } else {
        renderAIAppraisalOutput();
    }
}

function renderAIAppraisalOutput() {
    const modalBody = document.getElementById('q-modal-body');
    const modalFooter = document.getElementById('q-modal-footer');
    
    // Calculate final grade ratio from the 7 combined questions
    const meanGrade = Math.round(accumulatedScore / multiPhaseQuizData[currentSimLevel].length) + 45;
    const finalScore = meanGrade > 100 ? 100 : meanGrade;

    modalBody.innerHTML = `
        <div class="text-center py-6 space-y-4">
            <div class="inline-block bg-emerald-50 border-2 border-emerald-500 rounded-full w-24 h-24 flex flex-col items-center justify-center text-emerald-700 mx-auto">
                <span class="text-2xl font-black">${finalScore}</span>
                <span class="text-[9px] uppercase tracking-widest font-bold">AI Score</span>
            </div>
            <h3 class="font-extrabold text-lg text-slate-900">7-Phase Diagnostic Track Completed!</h3>
            <p class="text-xs text-slate-600 max-w-md mx-auto leading-relaxed bg-purple-50 p-4 rounded-xl border text-left">
                <strong>SimPath AI Engine Note:</strong> Profile logs indicate an excellent grasp of strategic optimization mechanics, customer cohort tracking, and operational resource triage. Deep logical analysis skills confirmed.
            </p>
        </div>
    `;

    modalFooter.innerHTML = `
        <button onclick="closeSimulationSystem()" class="text-xs text-slate-500 hover:underline">Dismiss Screen</button>
        <a href="apply-match.html" class="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition">Proceed to Level 3 Case Brief</a>
    `;
}

function triggerPaymentMock() {
    const conf = confirm("💳 Launch Premium Upgrade Simulation?\n\nThis opens the payment track to unlock premium Level 3+ case studies matching real enterprise operations.");
    if (conf) {
        window.location.href = "apply-match.html";
    }
}