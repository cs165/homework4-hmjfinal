class MusicScreen {
    constructor(container, gifTheme, song) {
        this.container = container;
        this.gifTheme = gifTheme;
        this.song = song;

        const gifDisplayContainter = document.querySelector('#gif-display');
        this.gifDisplay = new GifDisplay(gifDisplayContainter, this.gifTheme);

        const playButtonContainer = document.querySelector('#play-button');
        this.playButton = new PlayButton(playButtonContainer, this.onPlayClick.bind(this));

        this.audioPlayer = new AudioPlayer();
        this.audioPlayer.setSong(song.songUrl);
        this.audioPlayer.setKickCallback(this.onKick.bind(this));


        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        // const gifDisplayContainter = this.container.querySelector('gif-display');
        // this.gifDisplay = new GifDisplay(gifDisplayContainter);
        //
        // const buttonContainer = this.container.querySelector();
        // this.playButton = new PlayButton(buttonContainer, this.onSubmit);
    }

    onKick() {
        if (this.gifDisplay.currentGif != null) {
            this.gifDisplay.changeGif();
        }
    }

    onPlayClick(event) {
        event.preventDefault();
        console.log(this.playButton.container.src);
        if (!this.audioPlayer.playing) {
            this.audioPlayer.play();
            this.playButton.container.src = 'images/pause.png';
        } else {
            this.audioPlayer.pause();
            this.playButton.container.src = 'images/play.png';
        }
    }

    show() {
        this.container.classList.remove('inactive');
        console.log('Music screen on show');
    }

    hide() {
        this.container.classList.add('inactive');
    }
}