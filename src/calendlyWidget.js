/* eslint-disable */
/*
code is extracted from Calendly's embed script : https://assets.calendly.com/assets/external/widget.js
only the createInlineWidgets() function is taken and modified to work on a passed in DOM node, rather than looking for
a CSS class in the DOM
*/
class Calendly {
  constructor(el) {
    this.el = el;
    this.embedType = 'Inline';


    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  build() {
    this.node = document.createElement('iframe');
    this.node.src = this.getSource();
    this.node.width = '100%';
    this.node.height = '100%';
    this.node.frameBorder = '0';

    return this.node;
  }

  inject() {
    this.el.appendChild(this.buildSpinner());

    this.el.appendChild(this.node);

    return this.format();
  }

  getSource() {
    let t;

    return t = '' + this.getUrl() + this.getDivider() + this.getParams(), this.filterConsentParam(t);
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

  getUrlParams(t) {
    var e, n, o, i, r, l, a, d, s, u;
    for (a = document.createElement("a"), a.href = t, r = a.search.substr(1), l = {}, d = r.split("&"), e = 0, o = d.length; o > e; e++) i = d[e], s = i.split("="), n = s[0], u = s[1], void 0 !== u && (l[n.toLowerCase()] = u);
    return l
  }

  getUtmUrlParams(e) {
    var n, o, i, r, l;
    r = ["utm_campaign", "utm_source", "utm_medium", "utm_content", "utm_term"], o = {}, i = this.getUrlParams(e);
    for (n in i) l = i[n], t.call(r, n) >= 0 && (o[n] = l);
    return o;
  }

  getHostUtmParams() {
    return this.getUtmUrlParams(window.location.href);
  }

  getBookingUtmParams() {
    return this.getUtmUrlParams(this.getUrl());
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
  widget(el) {
    const calendly = new Calendly(el);

    calendly.build();

    calendly.inject();

    return calendly;
  }
}
