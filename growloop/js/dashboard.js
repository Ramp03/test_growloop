/**
 * dashboard.js
 * Mengisi panel "Feedback Terbaru" di dashboard dari data bersama,
 * supaya datanya konsisten dengan halaman Riwayat Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderRecentFeedback();
});

function renderRecentFeedback() {
    const list = document.getElementById('recentFeedbackList');
    if (!list || typeof FEEDBACK_HISTORY === 'undefined') return;

    const recent = FEEDBACK_HISTORY.slice(0, 3);
    list.innerHTML = recent
        .map((item) => {
            const avgValue = averageScore(item.scores);
            const avg = formatScore(avgValue);
            const pillClass = scoreBadgeClass(avgValue);
            const initials = initialsFromName(item.sender === 'Anonim' ? 'Anonim' : item.sender);
            const subtitle = [item.senderRole, item.senderTeam].filter(Boolean).join(' · ');

            return `
                <div class="fb-card-item">
                    <div class="fb-card-top">
                        <div class="fb-card-user">
                            <span class="fb-avatar">${initials}</span>
                            <div class="fb-user-info">
                                <span class="fb-user-name">${item.sender}</span>
                                ${subtitle ? `<span class="fb-user-role">${subtitle}</span>` : ''}
                            </div>
                        </div>
                        <span class="fb-card-date">${formatDateID(item.date)}</span>
                    </div>
                    <div class="fb-card-body">
                        <p class="fb-card-text">&ldquo;${item.good}&rdquo;</p>
                        <span class="score-pill ${pillClass}">${avg}</span>
                    </div>
                </div>
            `;
        })
        .join('');
}
