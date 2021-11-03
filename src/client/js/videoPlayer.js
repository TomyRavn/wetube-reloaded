const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
    // playBtn.innerText = "Pause";
  } else {
    video.pause();
    // playBtn.innerText = "Play";
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

// const handlePause = () => (playBtn.innerText = "Play");
// const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) => {
  if (video.muted) video.muted = false;
  else video.muted = true;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  // console.log(event.target.value);
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

playBtn.addEventListener("click", handlePlayClick);
// video.addEventListener("pause", handlePause);
// video.addEventListener("play", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
