// Synchronize and manage account state tracking variables across files
document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup default state placeholders if empty
    initStateDefaults();

    // 2. Synchronize DOM elements inside the Student Dashboard view
    syncDashboardDOM();
});

function initStateDefaults() {
    if (!localStorage.getItem('simpath_name')) {
        localStorage.setItem('simpath_name', 'skibidi');
    }
    if (!localStorage.getItem('simpath_email')) {
        localStorage.setItem('simpath_email', 'tungtungtung@sahur');
    }
    // Default metrics matching image_373259.png baseline when fully loaded or reset
    if (!localStorage.getItem('simpath_sims_count')) {
        localStorage.setItem('simpath_sims_count', '2 / 3 Tasks');
    }
    if (!localStorage.getItem('simpath_tier_status')) {
        localStorage.setItem('simpath_tier_status', 'Tier A- Match');
    }
    if (!localStorage.getItem('simpath_apply_count')) {
        localStorage.setItem('simpath_apply_count', '2 Programs');
    }
}

function syncDashboardDOM() {
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const cfgName = document.getElementById('cfg-name');
    const cfgEmail = document.getElementById('cfg-email');

    if (nameEl) nameEl.innerText = localStorage.getItem('simpath_name');
    if (emailEl) emailEl.innerText = localStorage.getItem('simpath_email');
    if (cfgName) cfgName.value = localStorage.getItem('simpath_name');
    if (cfgEmail) cfgEmail.value = localStorage.getItem('simpath_email');

    // Render metrics elements from storage
    const metricSims = document.getElementById('metric-sims');
    const metricTier = document.getElementById('metric-tier');
    const metricApply = document.getElementById('metric-apply');

    if (metricSims) metricSims.innerText = localStorage.getItem('simpath_sims_count');
    if (metricTier) metricTier.innerText = localStorage.getItem('simpath_tier_status');
    if (metricApply) metricApply.innerText = localStorage.getItem('simpath_apply_count');

    // Render detailed milestones rows based on simulation execution state
    const lvl3State = document.getElementById('state-lvl3');
    const cohortState = document.getElementById('state-cohort');

    if (localStorage.getItem('simpath_lvl3_done') === 'true') {
        if (lvl3State) {
            lvl3State.className = "text-green-600 font-semibold";
            lvl3State.innerText = "Completed & Passed";
        }
    } else {
        if (lvl3State) {
            lvl3State.className = "text-amber-600 font-semibold";
            lvl3State.innerText = "Awaiting Access Activation";
        }
    }
    
    if (localStorage.getItem('simpath_cohort_done') === 'true') {
        if (cohortState) {
            cohortState.className = "text-green-600 font-semibold";
            cohortState.innerText = "Sprint Submitted for Evaluation";
        }
    } else {
        if (cohortState) {
            cohortState.className = "text-gray-400 font-semibold";
            cohortState.innerText = "Locked pending Level 3 submission";
        }
    }
}

function updateMockAccount() {
    const n = document.getElementById('cfg-name').value;
    const e = document.getElementById('cfg-email').value;
    localStorage.setItem('simpath_name', n);
    localStorage.setItem('simpath_email', e);
    
    syncDashboardDOM();
    alert("Profile configurations successfully synchronized across all user terminal panels.");
}

// NEW: Reset functionality to set all tasks back to zero/uncompleted states for fresh presentation demos
function resetSimulationProgress() {
    localStorage.removeItem('simpath_lvl3_done');
    localStorage.removeItem('simpath_cohort_done');
    localStorage.removeItem('simpath_applied');
    
    // Roll back metrics to baseline unsubmitted states
    localStorage.setItem('simpath_sims_count', '1 / 3 Tasks');
    localStorage.setItem('simpath_tier_status', 'Pending Review');
    localStorage.setItem('simpath_apply_count', '0 Programs');
    
    syncDashboardDOM();
    alert("🔄 Progress data successfully flushed! All simulation steps have been reset to default states.");
}