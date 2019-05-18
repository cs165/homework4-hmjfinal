// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(container, onClick) {
    this.container = container;
    this.onClick = onClick;

    this.container.addEventListener('click', this.onClick);
  }
  // TODO(you): Add methods as necessary.
}
