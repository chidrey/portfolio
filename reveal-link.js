/* reveal-link: anti-scrape click-to-reveal contact link.
   The real href/label live base64-encoded in `payload`, never as plaintext/mailto in the DOM
   until a human clicks. */
(function () {
  class RevealLink extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      const prompt = this.getAttribute('prompt') || 'Click to reveal';
      const a = document.createElement('a');
      a.textContent = prompt;
      a.href = '#';
      a.setAttribute('rel', 'nofollow');
      a.style.cssText = 'cursor:pointer;color:inherit;font:inherit;text-decoration:none;border-bottom:1px dashed currentColor;padding-bottom:2px;transition:color .2s,border-color .2s';
      a.addEventListener('mouseenter', () => { a.style.color = '#8FBF8B'; });
      a.addEventListener('mouseleave', () => { a.style.color = ''; });
      a.addEventListener('click', (e) => {
        if (this._revealed) return; // second click follows the real link
        e.preventDefault();
        try {
          const { href, label } = JSON.parse(atob(this.getAttribute('payload') || ''));
          a.href = href;
          a.textContent = label;
          if (href.indexOf('http') === 0) a.target = '_blank';
          a.style.borderBottomStyle = 'solid';
          this._revealed = true;
        } catch (err) { /* noop */ }
      });
      this.appendChild(a);
    }
  }
  if (!customElements.get('reveal-link')) customElements.define('reveal-link', RevealLink);
})();
