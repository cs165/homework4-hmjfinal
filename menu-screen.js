class MenuScreen {
    constructor(container, songs, onSubmit) {
        this.container = container;

        const buttonContainer = this.container.querySelector('input[type=submit]');
        this.container.addEventListener('submit', onSubmit);

        this.songSelector = this.container.querySelector('#song-selector');
        for (song of songs) {
            console.log('song: ' + song);
            this._addSong(song);
        }


        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    _addSong(song) {
        const songOption = document.createElement('option');
        songOption.textContent = song.title;
        this.songSelector.append(songOption);
    }


    show() {
        this.container.classList.remove('inactive');
    }

    hide() {
        this.container.classList.add('inactive');
    }
}