const data = [
    { id: 1, name: "TEGAL", img: "img/tegal.jpg" },
    { id: 2, name: "BATANG", img: "img/batang.jpg" },
    { id: 3, name: "BREBES", img: "img/brebes.jpg" },
    { id: 4, name: "KOTA PEKALONGAN", img: "img/kotapekalongan.jpg" },
    { id: 5, name: "KOTA TEGAL", img: "img/kotategal.jpg" },
    { id: 6, name: "PEKALONGAN", img: "img/pekalongan.jpg" },
    { id: 7, name: "PEMALANG", img: "img/pemalang.jpg" }
];

let score = 0;
let activeCard = null;
let matchedIds = []; // Menyimpan ID yang sudah berhasil dipasangkan

function initGame() {
    score = 0;
    activeCard = null;
    matchedIds = [];
    document.getElementById('score').innerText = score;
    document.getElementById('msg').innerText = "Klik sebuah kartu di bawah untuk melihat wilayahnya!";
    
    renderAll();
}

function renderAll() {
    const pContainer = document.getElementById('photo-container');
    const cContainer = document.getElementById('card-container');
    
    // Acak foto yang belum matched
    const remainingPhotos = data.filter(d => !matchedIds.includes(d.id)).sort(() => Math.random() - 0.5);
    // Acak kartu yang belum matched
    const remainingCards = data.filter(d => !matchedIds.includes(d.id)).sort(() => Math.random() - 0.5);

    pContainer.innerHTML = '';
    cContainer.innerHTML = '';

    // Render Foto
    remainingPhotos.forEach(item => {
        pContainer.innerHTML += `
            <div class="photo-box" data-id="${item.id}" onclick="clickPhoto(this)">
                <img src="${item.img}">
            </div>`;
    });

    // Render Kartu Tertutup
    remainingCards.forEach(item => {
        cContainer.innerHTML += `
            <div class="card" data-id="${item.id}" onclick="clickCard(this)">?</div>`;
    });
}

function clickCard(el) {
    if (activeCard || el.classList.contains('matched')) return;

    const item = data.find(d => d.id == el.dataset.id);
    el.innerText = item.name;
    el.classList.add('open');
    activeCard = el;
    document.getElementById('msg').innerText = "Cari foto pemimpin " + item.name;
}

function clickPhoto(el) {
    if (!activeCard) return;

    const photoId = parseInt(el.dataset.id);
    const cardId = parseInt(activeCard.dataset.id);

    if (photoId === cardId) {
        // JAWABAN BENAR
        score += 10;
        document.getElementById('score').innerText = score;
        matchedIds.push(photoId); // Tambahkan ke daftar yang sudah selesai
        
        activeCard = null;
        document.getElementById('msg').innerText = "Tepat! Lanjutkan.";
        
        if (matchedIds.length === data.length) {
            alert("Selamat! Semua pemimpin daerah berhasil ditemukan.");
        } else {
            renderAll(); // Gambar ulang layar tanpa item yang sudah matched
        }
    } else {
        // JAWABAN SALAH
        el.classList.add('selected');
        document.getElementById('msg').innerText = "Salah! Posisi kartu diacak kembali.";
        
        setTimeout(() => {
            activeCard = null;
            renderAll(); // Tutup dan acak ulang posisi yang belum matched
        }, 1200);
    }
}

initGame();