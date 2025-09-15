document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIKA MUSIK ---
     window.addEventListener('DOMContentLoaded', () => {
        const music = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');
        const icon = musicToggle.querySelector('i');

        // 1. Coba putar musik secara otomatis
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay berhasil! Ganti ikon tombol ke 'pause'
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }).catch(error => {
                // Autoplay diblokir oleh browser.
                console.log("Autoplay dicegah oleh browser.");
                
                // 2. Buat fungsi untuk memulai musik setelah interaksi pertama
                const startMusicOnClick = () => {
                    music.play();
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    // Hapus event listener ini agar tidak berjalan berulang kali
                    document.body.removeEventListener('click', startMusicOnClick);
                    document.body.removeEventListener('touchstart', startMusicOnClick);
                };
                
                // Tambahkan listener untuk klik atau sentuhan pertama
                document.body.addEventListener('click', startMusicOnClick);
                document.body.addEventListener('touchstart', startMusicOnClick); // Untuk mobile
            });
        }

        // 3. Fungsikan tombol play/pause seperti biasa
        musicToggle.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                music.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });


    // --- LOGIKA MODAL GALERI ---
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const images = document.querySelectorAll('.gallery img');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex;

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            currentIndex = parseInt(this.getAttribute('data-index'));
        });
    });

    closeModal.addEventListener('click', () => modal.style.display = "none");
    
    function showImage(index) {
        if (index >= images.length) { currentIndex = 0; }
        else if (index < 0) { currentIndex = images.length - 1; }
        else { currentIndex = index; }
        modalImg.src = images[currentIndex].src;
    }

    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    
    // Tutup modal jika klik di luar gambar
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });


    // --- LOGIKA ANIMASI SAAT SCROLL ---
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150; // Jarak dari bawah layar
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            } else {
                revealElements[i].classList.remove('active'); // Agar animasi berulang jika scroll ke atas
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Panggil sekali saat load


    // --- LOGIKA ANIMASI HATI MENGAMBANG ---
    const heartsContainer = document.querySelector('.hearts-container');
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // durasi 5-10 detik
        heart.style.opacity = Math.random();
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000); // Hapus hati setelah 10 detik
    }
    
    setInterval(createHeart, 500); // Buat hati baru setiap 500ms
});