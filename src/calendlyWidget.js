/* eslint-disable */
/*
code is extracted from Calendly's embed script : https://assets.calendly.com/assets/external/widget.js
only the createInlineWidgets() function is taken and modified to work on a passed in DOM node, rather than looking for
a CSS class in the DOM
*/
class Calendly {
  constructor(el, options = {}) {
    this.el = el;
    this.embedType = 'Inline';

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    this.onIframeLoaded = options.onLoad || (() => {});
  }

  build() {
    this.node = document.createElement('iframe');
    this.node.src = this.getSource();
    this.node.width = '100%';
    this.node.height = '100%';
    this.node.frameBorder = '0';

    this.node.onload = (e) => {
      this.onIframeLoaded(e);
    };

    return this.node;
  }

  inject() {
    this.el.appendChild(this.buildSpinner());

    this.el.appendChild(this.node);

    return this.format();
  }

  getSource() {
    let source;

    let params = this.getParams();

    let url = '' + this.getUrl() + this.getDivider() + params;

    let src = this.filterConsentParam(url);

    return src;
  }

  getUrl() {
    return null != this.url ? this.url : this.url = this.el.getAttribute("data-url").split("#")[0];
  }

  getDivider() {
    return -1 === this.getUrl().indexOf('?') ? '?' : '&';
  }

  getParams() {
    var t, e, n, o;
    e = "embed_domain=" + this.getDomain() + "&embed_type=" + this.embedType, n = this.getHostUtmParams();
    for (t in n) o = n[t], t in this.getBookingUtmParams() || (e += "&" + t + "=" + o);
    return e;
  }

  getUrlParams(search = '') {
    search = search.split('?')[1];

    if (!search) return {};

    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }

  getUtmUrlParams(url) {
    let utmParams = ["utm_campaign", "utm_source", "utm_medium", "utm_content", "utm_term"];
    let params = this.getUrlParams(url);

    return params;
  }

  getHostUtmParams() {
    return this.getUtmUrlParams(window.location.href);
  }

  getBookingUtmParams() {
    let url = this.getUrl();

    return this.getUtmUrlParams(url);
  }

  getDomain() {
    return encodeURIComponent(document.location.host);
  }

  filterConsentParam(t) {
    return t.replace(/consent_accept=1&?/g, "");
  }

  format() {
    return this.isMobile ? this.formatMobile() : this.formatDesktop();
  }

  formatDesktop() {
    return this.inlineStyles ? this.el.setAttribute("style", "position: relative;" + this.el.getAttribute("style")) : void 0;
  }

  formatMobile() {
    return this.inlineStyles ? this.el.setAttribute("style", "position: relative;overflow-y:auto;-webkit-overflow-scrolling:touch;" + this.el.getAttribute("style")) : this.el.className += " mobile";
  }

  buildSpinner() {
    var t;
    return t = document.createElement("div"), t.className = "spinner", t.appendChild(this.buildBounce(1)), t.appendChild(this.buildBounce(2)), t.appendChild(this.buildBounce(3)), t;
  }

  buildBounce(t) {
    var e;
    return e = document.createElement("div"), e.className = "bounce" + t, e;
  }
}

export default {
  widget(el, options = {}) {
    const calendly = new Calendly(el, options);

    calendly.build();

    calendly.inject();

    return calendly;
  }
}
