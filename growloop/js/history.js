/**
 * history.js
 * Merender kartu riwayat feedback dan panel detail dari data bersama
 * (data.js), termasuk navigasi keyboard dan penutupan panel dengan Esc.
 */

const TARGET_BADGE_CLASS = {
    individu: 'badge-individu',
    team: 'badge-tim',
    manager: 'badge-manager',
};

const TARGET_ICON_CLASS = {
    individu: 'fa-user',
    team: 'fa-users',
    manager: 'fa-user-tie',
};

let lastFocusedCard = null;

document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderCardList();
    setupPanelClose();
});

function renderSummary() {
    const subCount = document.getElementById('subCount');
    if (subCount) {
        subCount.textContent = `${FEEDBACK_HISTORY.length} feedback diterima sepanjang 2026`;
    }
}

function renderCardList() {
    const grid = document.getElementById('historyGridFlow');
    if (!grid) return;

    grid.innerHTML = FEEDBACK_HISTORY.map((item, index) => {
        const avg = formatScore(averageScore(item.scores));
        const badgeClass = TARGET_BADGE_CLASS[item.targetType] || 'badge-individu';
        const iconClass = TARGET_ICON_CLASS[item.targetType] || 'fa-user';
        const tags = item.tags
            .map((tag) => `<span class="skill-tag tag-${tag.kind === 'strength' ? 'strength' : 'improve'}">${tag.label}</span>`)
            .join('');

        return `
            <button type="button" class="feedback-card-item animate-fade-up" style="animation-delay: ${0.1 + index * 0.05}s;" data-id="${item.id}">
                <div class="card-meta-header">
                    <div class="meta-user">
                        <h3>${item.sender}</h3>
                        <span class="target-indicator ${badgeClass}"><i class="fa-solid ${iconClass}" aria-hidden="true"></i> ${item.targetLabel}</span>
                    </div>
                    <div class="meta-score">
                        ${avg} <i class="fa-regular fa-star" aria-hidden="true"></i>
                    </div>
                </div>
                <p class="card-text-snippet">${item.good}</p>
                <div class="card-badge-skills">${tags}</div>
            </button>
        `;
    }).join('');

    grid.querySelectorAll('.feedback-card-item').forEach((card) => {
        card.addEventListener('click', () => openFeedbackDetail(card.dataset.id, card));
    });
}

function openFeedbackDetail(id, cardEl) {
    const item = FEEDBACK_HISTORY.find((f) => f.id === id);
    if (!item) return;

    document.querySelectorAll('.feedback-card-item').forEach((c) => c.classList.remove('is-selected'));
    if (cardEl) {
        cardEl.classList.add('is-selected');
        lastFocusedCard = cardEl;
    }

    const avg = formatScore(averageScore(item.scores));

    document.getElementById('pnlAvatar').textContent = initialsFromName(item.sender === 'Anonim' ? 'Anonim' : item.sender);
    document.getElementById('pnlName').textContent = item.sender;
    document.getElementById('pnlTarget').textContent = item.targetLabel;
    document.getElementById('pnlTarget').className = `target-indicator ${TARGET_BADGE_CLASS[item.targetType] || 'badge-individu'}`;
    document.getElementById('pnlDate').textContent = formatDateID(item.date);
    document.getElementById('pnlScore').textContent = avg;
    document.getElementById('pnlGoodText').textContent = item.good;
    document.getElementById('pnlImproveText').textContent = item.improve;
    document.getElementById('pnlDevelopText').textContent = item.suggestion;

    COMPETENCIES.forEach((comp, index) => {
        const bar = document.getElementById(`compBar${index + 1}`);
        const row = bar ? bar.closest('.side-bar-row') : null;
        const scoreLabel = row ? row.querySelector('.side-score-label') : null;
        if (!bar) return;
        const value = item.scores[comp.key] || 0;
        bar.style.setProperty('--target-width', `${(value / 5) * 100}%`);
        bar.style.width = `${(value / 5) * 100}%`;
        bar.className = `side-bar-fill ${comp.color}`;
        if (scoreLabel) scoreLabel.textContent = formatScore(value);
    });

    const panel = document.getElementById('historySideDetail');
    const grid = document.getElementById('historyGridFlow');
    panel.classList.remove('is-hidden');
    grid.classList.add('split-grid');

    // Pindahkan fokus ke tombol tutup agar pengguna keyboard langsung berada di panel.
    document.getElementById('btnClosePanel').focus();
}

function closeFeedbackDetail() {
    const panel = document.getElementById('historySideDetail');
    const grid = document.getElementById('historyGridFlow');
    panel.classList.add('is-hidden');
    grid.classList.remove('split-grid');
    document.querySelectorAll('.feedback-card-item').forEach((c) => c.classList.remove('is-selected'));

    if (lastFocusedCard) {
        lastFocusedCard.focus();
    }
}

function setupPanelClose() {
    const closeBtn = document.getElementById('btnClosePanel');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFeedbackDetail);
    }

    document.addEventListener('keydown', (event) => {
        const panel = document.getElementById('historySideDetail');
        if (event.key === 'Escape' && panel && !panel.classList.contains('is-hidden')) {
            closeFeedbackDetail();
        }
    });
}
