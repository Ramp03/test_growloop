/**
 * data.js
 * Sumber data bersama untuk halaman Beri Feedback dan Riwayat Feedback.
 * Di aplikasi nyata, data ini akan datang dari API/backend.
 */

// Daftar karyawan yang bisa dipilih sebagai penerima feedback individu.
const EMPLOYEES = [
    { id: 'raka', name: 'Raka Pratama', role: 'Frontend Developer' },
    { id: 'dewi', name: 'Dewi Anggraini', role: 'Product Manager' },
    { id: 'yusuf', name: 'Yusuf Hakim', role: 'Backend Developer' },
    { id: 'sari', name: 'Sari Wulandari', role: 'QA Engineer' },
];

// Daftar tim/divisi.
const TEAMS = [
    { id: 'product', name: 'Tim Product' },
    { id: 'engineering', name: 'Tim Engineering' },
    { id: 'design', name: 'Tim Design' },
];

// Daftar manager/atasan langsung.
const MANAGERS = [
    { id: 'budi', name: 'Budi Santoso', role: 'Engineering Manager' },
];

// Label kompetensi + warna bar yang dipakai di panel detail riwayat.
const COMPETENCIES = [
    { key: 'komunikasi', label: 'Komunikasi', color: 'fill-orange' },
    { key: 'kerjasama', label: 'Kerja Sama Tim', color: 'fill-green' },
    { key: 'tanggungjawab', label: 'Tanggung Jawab', color: 'fill-blue' },
    { key: 'inisiatif', label: 'Inisiatif', color: 'fill-yellow' },
    { key: 'kualitas', label: 'Kualitas Kerja', color: 'fill-purple' },
];

/**
 * Riwayat feedback yang diterima pengguna saat ini (Mia Santoso).
 * `scores` dalam skala 1-5 per kompetensi; skor rata-rata pada kartu
 * dihitung otomatis dari nilai ini, jadi selalu konsisten dengan bar-nya.
 */
const FEEDBACK_HISTORY = [
    {
        id: 'fb-1',
        sender: 'Anonim',
        senderRole: 'Rekan Kerja',
        senderTeam: 'Tim Design',
        targetType: 'individu',
        targetLabel: 'Individu',
        date: '2026-05-28',
        scores: { komunikasi: 3.5, kerjasama: 4.6, tanggungjawab: 4.3, inisiatif: 3.5, kualitas: 4.6 },
        tags: [
            { label: 'Kolaborasi', kind: 'strength' },
            { label: 'Komunikasi', kind: 'improve' },
        ],
        good: 'Menunjukkan peningkatan besar dalam koordinasi proyek lintas tim. Kemampuan desain sistem sudah sangat matang dan konsisten dalam setiap deliverable.',
        improve: 'Perlu lebih aktif menyuarakan ide dan pendapat di forum tim, terutama saat rapat besar bersama stakeholder dari divisi lain.',
        suggestion: 'Ikuti workshop komunikasi dan public speaking. Coba jadwalkan sesi presentasi rutin ke tim untuk membangun kepercayaan diri.',
    },
    {
        id: 'fb-2',
        sender: 'Anonim',
        senderRole: 'Rekan Kerja',
        senderTeam: 'Tim Produk',
        targetType: 'team',
        targetLabel: 'Tim/Divisi',
        date: '2026-05-25',
        scores: { komunikasi: 3.0, kerjasama: 3.5, tanggungjawab: 4.0, inisiatif: 3.0, kualitas: 4.25 },
        tags: [
            { label: 'Dokumentasi', kind: 'strength' },
            { label: 'Manajemen Waktu', kind: 'improve' },
        ],
        good: 'Dokumentasi desain selalu rapi, terstruktur dengan baik, dan sangat mudah diimplementasikan oleh tim frontend.',
        improve: 'Terkadang revisi datang mendadak, diharapkan bisa lebih fleksibel dalam manajemen waktu pengerjaan.',
        suggestion: 'Diskusikan timeline lebih awal bersama manajemen produk sebelum sprint dimulai.',
    },
    {
        id: 'fb-3',
        sender: 'Anonim',
        senderRole: 'Rekan Kerja',
        senderTeam: 'Tim Engineering',
        targetType: 'manager',
        targetLabel: 'Manager',
        date: '2026-05-20',
        scores: { komunikasi: 4.5, kerjasama: 4.5, tanggungjawab: 4.75, inisiatif: 4.25, kualitas: 4.5 },
        tags: [
            { label: 'Kepemimpinan', kind: 'strength' },
            { label: 'Delegasi', kind: 'strength' },
        ],
        good: 'Selalu terbuka menerima masukan dari tim dan memberi arahan yang jelas di setiap sprint planning.',
        improve: 'Sesekali keputusan teknis diambil tanpa melibatkan anggota tim yang paling relevan.',
        suggestion: 'Libatkan lead teknis sejak tahap perencanaan agar keputusan lebih tepat sasaran.',
    },
];

function averageScore(scores) {
    const values = Object.values(scores);
    const total = values.reduce((sum, v) => sum + v, 0);
    return total / values.length;
}

function formatScore(value) {
    return value.toFixed(1);
}

function formatDateID(isoDate) {
    const date = new Date(isoDate + 'T00:00:00');
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function initialsFromName(name) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');
}

/**
 * Kelas warna badge skor: hijau untuk skor baik (>= 4), lavender netral
 * untuk skor yang masih bisa ditingkatkan.
 */
function scoreBadgeClass(value) {
    return value >= 4 ? 'score-pill-good' : 'score-pill-neutral';
}
