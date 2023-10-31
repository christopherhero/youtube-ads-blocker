class AdBlocker {
  constructor() {
    this.vid = null;
    this.ad = null;
    this.pbRate = 1;
  }

  hideOrRemoveElement(element, action = 'hide') {
    if (element) {
      if (action === 'hide') {
        element.style.display = 'none';
      } else if (action === 'remove') {
        element.remove();
      }
    }
  }

  clickElement(element) {
    if (element) {
      element.click();
    }
  }

  removeAds() {
    this.vid = document.getElementsByClassName('video-stream html5-main-video')[0];
    this.ad = document.getElementsByClassName('video-ads ytp-ad-module')[0];

    if (!this.vid) return;

    const closeableAds = document.getElementsByClassName('ytp-ad-overlay-close-button');
    Array.from(closeableAds).forEach(ad => this.clickElement(ad));

    this.hideOrRemoveElement(document.getElementsByClassName('style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement')[0]);
    this.hideOrRemoveElement(document.getElementsByClassName('style-scope ytd-item-section-renderer sparkles-light-cta')[0]);

    this.clickElement(document.getElementsByClassName('ytp-ad-text ytp-ad-skip-button-text')[0]);

    this.hideOrRemoveElement(document.getElementsByClassName('ytp-ad-message-container')[0]);

    this.hideOrRemoveElement(document.getElementsByClassName('style-scope ytd-companion-slot-renderer')[0], 'remove');

    if (this.ad && this.ad.children.length && document.getElementsByClassName('ytp-ad-text ytp-ad-preview-text')[0]) {
      this.vid.playbackRate = 16;
      this.vid.muted = true;
    }

    this.hideOrRemoveElement(document.getElementById('masthead-ad'), 'remove');

    this.hideOrRemoveElement(document.getElementsByTagName('ytd-ad-slot-renderer')[0], 'remove');
    this.hideOrRemoveElement(document.getElementsByTagName('ytd-reel-shelf-renderer')[0], 'remove');
  }

  start() {
    setInterval(() => this.removeAds(), 100);
  }
}

const adBlocker = new AdBlocker();
adBlocker.start();
