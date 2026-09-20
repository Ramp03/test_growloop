/**
 * feedback-form.js
 * Logika untuk halaman "Beri Feedback": mengisi dropdown penerima
 * sesuai jenis target yang dipilih, menghitung karakter textarea,
 * dan menangani submit form.
 */

document.addEventListener('DOMContentLoaded', () => {
    setupTargetSelector();
    setupCharCounters();
    setupFormSubmit();
});

function setupTargetSelector() {
    const radios = document.querySelectorAll('input[name="target"]');
    const select = document.getElementById('pilihKaryawan');
    const dropdownLabel = document.getElementById('dropdownLabel');
    if (!radios.length || !select) return;

    const optionsByTarget = {
        individu: { label: 'Pilih Karyawan', items: EMPLOYEES.map((e) => ({ value: e.id, text: `${e.name} — ${e.role}` })) },
        team: { label: 'Pilih Tim/Divisi', items: TEAMS.map((t) => ({ value: t.id, text: t.name })) },
        manager: { label: 'Pilih Manager', items: MANAGERS.map((m) => ({ value: m.id, text: `${m.name} — ${m.role}` })) },
    };

    function renderOptions(targetType) {
        const config = optionsByTarget[targetType];
        if (!config) return;
        dropdownLabel.textContent = config.label;
        select.innerHTML = ['<option value="">Pilih…</option>']
            .concat(config.items.map((item) => `<option value="${item.value}">${item.text}</option>`))
            .join('');
    }

    radios.forEach((radio) => {
        radio.addEventListener('change', () => {
            if (radio.checked) renderOptions(radio.value);
        });
    });

    const checked = document.querySelector('input[name="target"]:checked');
    renderOptions(checked ? checked.value : 'individu');
}

function setupCharCounters() {
    const fields = [
        { textareaId: 'positifText', counterId: 'countPositif' },
        { textareaId: 'peningkatanText', counterId: 'countPeningkatan' },
        { textareaId: 'saranText', counterId: 'countSaran' },
    ];

    fields.forEach(({ textareaId, counterId }) => {
        const textarea = document.getElementById(textareaId);
        const counter = document.getElementById(counterId);
        if (!textarea || !counter) return;
        textarea.addEventListener('input', () => {
            counter.textContent = textarea.value.length;
        });
    });
}

function setupFormSubmit() {
    const form = document.getElementById('feedbackForm');
    const select = document.getElementById('pilihKaryawan');
    const errorMsg = document.getElementById('pilihKaryawanError');
    if (!form) return;

    if (select && errorMsg) {
        select.addEventListener('change', () => {
            if (select.value) {
                select.classList.remove('is-invalid');
                errorMsg.classList.add('is-hidden');
            }
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const penerima = select ? select.value : '';

        if (!penerima) {
            if (select && errorMsg) {
                select.classList.add('is-invalid');
                errorMsg.classList.remove('is-hidden');
                select.focus();
            }
            return;
        }

        if (select && errorMsg) {
            select.classList.remove('is-invalid');
            errorMsg.classList.add('is-hidden');
        }

        // Placeholder: di aplikasi nyata, data akan dikirim ke server di sini.
        alertInline('Feedback berhasil dikirim secara anonim. Terima kasih!');
        form.reset();
        document.getElementById('countPositif').textContent = '0';
        document.getElementById('countPeningkatan').textContent = '0';
        document.getElementById('countSaran').textContent = '0';
    });
}

function alertInline(message) {
    // Placeholder notifikasi sederhana; bisa diganti komponen toast.
    window.alert(message);
}
