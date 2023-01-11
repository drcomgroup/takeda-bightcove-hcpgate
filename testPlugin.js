function testPlugin(options) {

  if (options.customClass) {
    this.addClass(options.customClass);
  }

  this.on('playing', function() {
    videojs.log('playback began!');
  });
}
