SONGS_URL = ' https://fullstackccu.github.io/homeworks/hw4/songs.json';
RANDOM_THEMES = ['candy', 'charlie brown', 'computers', 'dance',
    'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'
];

class App {
    constructor() {
        this.songs = [];
        this._populateSongs(SONGS_URL);

        const menuContainer = document.querySelector('#menu');
        this.menuScreen = new MenuScreen(menuContainer, this.songs, this.menuOnSubmit.bind(this));

        //const musicScreenContainer = document.querySelector('#music-screen');
        this.musicScreen = null; //new MusicScreen(musicScreenContainer, null, null);

        const queryInputContainer = document.querySelector('#query-input');
        queryInputContainer.value = RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];
    }

    _populateSongs(jsonLink) {
        function onResponse(res) {
            return res.json();
        }

        function onStreamProcessed(json) {
            for (const song in json) {
                /* Save to this.songs */
                this.songs[song] = json[song];
                /* Add song to the Menu*/
                this.menuScreen._addSong(json[song]);
            }
        }

        fetch(jsonLink)
            .then(onResponse.bind(this))
            .then(onStreamProcessed.bind(this), err => { return err; });
    }

    menuOnSubmit(event) {
        event.preventDefault();

        const songName = this.menuScreen.container.querySelector('#song-selector').value;
        const gifTheme = this.menuScreen.container.querySelector('#query-input').value;

        let song = null;
        for (const songIndex in this.songs) {
            if (this.songs[songIndex].title == songName) {
                song = this.songs[songIndex];
            }
        }
        console.log('Song chosen: ')
        console.log(song);
        console.log('Gif theme: ' + gifTheme);

        const musicScreenContainer = document.querySelector('#music-screen');
        this.musicScreen = new MusicScreen(musicScreenContainer, gifTheme, song);
        this.menuScreen.hide();
        this.musicScreen.show();
    }
}