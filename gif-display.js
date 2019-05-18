class GifDisplay {
    constructor(container, gifTheme) {
        this.container = container;
        this.gifTheme = gifTheme;
        this.gifs = [];
        this.api_Key = 'W82VydgBr9jA5n03sh9THGIAxosSN7CX';
        this.apiURL = 'http://api.giphy.com/v1/gifs/search?api_key=' + this.api_Key + '&q=' + encodeURIComponent(this.gifTheme);
        console.log(this.apiURL)
        this.currentIndex = 0;
        this.currentGif = null;

        this._populateGifs();
    }

    _populateGifs() {
        function onResponse(res) {
            return res.json();
        }

        function onStreamProcessed(json) {
            for (const gif in json['data']) {
                this.gifs[gif] = json['data'][gif];
            }
            this.changeGif();
        }

        fetch(this.apiURL)
            .then(onResponse.bind(this))
            .then(onStreamProcessed.bind(this), (err) => { return err; });
    }

    _nextGif() {
        if (this.currentIndex < this.gifs.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.currentGif = this.gifs[this.currentIndex];
    }

    _getNewGifUrl() {
        this._nextGif();
        return this.currentGif.images.downsized.url;
    }

    changeGif() {
        this.currentGif = this.gifs[this.currentIndex];
        this.container.style['background-image'] = 'url("' + this._getNewGifUrl() + '")';
    }
}