getQueryStringParams = query => {
    return query ?
        (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
            let [key, value] = param.split('=');
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
        }, {}) :
        {}
};

let {text,from,to} = getQueryStringParams(location.search);
let tvText = document.getElementById('tvText');
let currentTime = 0;
tvText.innerText = text;

talkify.config.remoteService.host = 'https://talkify.net';
talkify.config.remoteService.apiKey = '384b007a-d62c-4fd9-acae-c2cdc755c520';
var player = new talkify.TtsPlayer()
player.forceVoice({ name: "David" });
let videoEl = document.getElementsByTagName('video')[0];
let videoContainer = document.getElementById('videoContainer');
videoEl.onplay = () => {
    tvText.style.display = "";
}
tvText.onclick = () => videoEl.play();
let vidVolume = "test";
let ttsPlayed = false;
videoContainer.width = videoEl.width
videoContainer.height = videoEl.height;

videoEl.addEventListener("timeupdate", function () {
    if (this.currentTime >= 7.18940499) {
        tvText.style.display = "none";
    } else if (this.currentTime >= 1.69505 && this.currentTime < 2 && ttsPlayed === false) {
        if (vidVolume === "test") {
            vidVolume = videoEl.volume;
        }
        videoEl.volume = 0;
        videoEl.pause();
        player.playText(text);
        ttsPlayed = true;
    } else {
        tvText.style.display = "";
    }

    if (this.currentTime < currentTime) {
        ttsPlayed = false;
    }

    currentTime = this.currentTime;
});

document.getElementById("talkify-audio").addEventListener("ended", function () {
    videoEl.currentTime = 2.25;
    videoEl.volume = vidVolume;
    videoEl.play();
}, false)