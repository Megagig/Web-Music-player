const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Update song details
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};
// Initially load song details into DOM
loadSong(songs[songIndex]);

// Play song
const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// Pause song
const pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
};

// Previous song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Update progress bar
const updateProgressBar = () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

// Set progress bar
audio.addEventListener('timeupdate', updateProgressBar);

// Set progress bar
const setProgressBar = (e) => {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audio;
  audio.currentTime = (clickX / width) * duration;
};

// Click on progress bar
progressContainer.addEventListener('click', setProgressBar);
