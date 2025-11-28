const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const seek = document.getElementById('seek');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');
const titleEl = document.getElementById('title');
const coverEl = document.getElementById('cover');

const songs = [
    { name: "Epic Song 1", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://picsum.photos/id/237/200" },
    { name: "Epic Song 2", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://picsum.photos/id/238/200" },
    { name: "Epic Song 3", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://picsum.photos/id/239/200" },
];

let currentSongIndex = 0;

function loadPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.name;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong();
            playAudio();
        });
        playlistEl.appendChild(li);
    });
    highlightActiveSong();
}

function loadSong() {
    audio.src = songs[currentSongIndex].file;
    titleEl.textContent = songs[currentSongIndex].name;
    coverEl.src = songs[currentSongIndex].cover;
    highlightActiveSong();
}

function highlightActiveSong() {
    Array.from(playlistEl.children).forEach((li, index) => {
        li.classList.toggle('active', index === currentSongIndex);
    });
}

function playAudio() {
    audio.play();
    playBtn.textContent = '⏸️';
}

function pauseAudio() {
    audio.pause();
    playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => audio.paused ? playAudio() : pauseAudio());

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    playAudio();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    playAudio();
});

audio.addEventListener('timeupdate', () => {
    seek.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    seek.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
});

seek.addEventListener('input', () => {
    audio.currentTime = seek.value;
});

audio.addEventListener('ended', () => nextBtn.click());

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

loadPlaylist();
loadSong();
