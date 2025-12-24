const data = [
    { id: 1, n: "KUNIR", f: "Mengobati luka ringan", i: "img/kunir.jpg" },
    { id: 2, n: "JAHE", f: "Melancarkan peredaran darah", i: "img/jahe.jpg" },
    { id: 3, n: "SERAI", f: "Melancarkan pencernaan", i: "img/serai.jpg" },
    { id: 4, n: "TEMU LAWAK", f: "Meningkatkan nafsu makan", i: "img/temulawak.jpg" },
    { id: 5, n: "CENGKEH", f: "Meredakan sakit gigi dan gusi bengkak", i: "img/cengkeh.jpg" },
    { id: 6, n: "KAPULAGA", f: "Membantu mengatasi perut kembung", i: "img/kapulaga.jpg" },
    { id: 7, n: "KENCUR", f: "Meredakan pegel linu dan capek badan", i: "img/kencur.jpg" },
    { id: 8, n: "KECOMBRANG", f: "Meningkatkan daya tahan tubuh", i: "img/kecombrang.jpg" }
];

let score = 0;
let choice = { img: null, name: null, func: null };

function init() {
    const rImg = document.getElementById('row-images');
    const rName = document.getElementById('row-names');
    const rFunc = document.getElementById('row-funcs');

    const sImg = [...data].sort(() => Math.random() - 0.5);
    const sName = [...data].sort(() => Math.random() - 0.5);
    const sFunc = [...data].sort(() => Math.random() - 0.5);

    data.forEach((_, x) => {
        rImg.innerHTML += `<div class="item" data-id="${sImg[x].id}" onclick="pick(this, 'img')"><img src="${sImg[x].i}"></div>`;
        rName.innerHTML += `<div class="item" data-id="${sName[x].id}" onclick="pick(this, 'name')"><b>${sName[x].n}</b></div>`;
        rFunc.innerHTML += `<div class="item" data-id="${sFunc[x].id}" onclick="pick(this, 'func')">${sFunc[x].f}</div>`;
    });
}

function pick(el, type) {
    el.parentNode.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    choice[type] = el;
}

function processConnection() {
    if (!choice.img || !choice.name || !choice.func) {
        alert("Pilih satu dari setiap baris (Gambar, Nama, dan Fungsi)!");
        return;
    }

    const idI = choice.img.dataset.id;
    const idN = choice.name.dataset.id;
    const idF = choice.func.dataset.id;

    if (idI === idN && idN === idF) {
        score += 10;
        document.getElementById('score').innerText = score;
        
        [choice.img, choice.name, choice.func].forEach(el => {
            el.classList.remove('selected');
            el.classList.add('matched');
        });
        
        choice = { img: null, name: null, func: null };
        if(score === 80) alert("Selamat! Semua sudah terhubung dengan benar!");
    } else {
        alert("Kombinasi salah! Coba lagi.");
        [choice.img, choice.name, choice.func].forEach(el => el.classList.remove('selected'));
        choice = { img: null, name: null, func: null };
    }
}

init();