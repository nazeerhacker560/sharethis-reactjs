/**
 * Sticky Share Buttons
 *
 */

// constants
const ShareThis = require("../ShareThis.js");
const ICONS = require("../static/ICONS.js");
const COLORS = require("../static/COLORS.js");
const i18n = require("../static/i18n.js");

function loader(config = {}) {
  let st = new ShareThis();

  let {
    onLoad,
    alignment, container, font_size, hide_desktop, padding, radius,
    size, spacing, id, labels, language, min_count, networks,
    show_toggle, show_total, mobile_breakpoint, show_mobile,
    slide_in, top, use_native_counts, show_mobile_buttons,
    url, title, image, description, username
  } = config;

  // default configs
  alignment = alignment || 'left';
  font_size = font_size || 16;
  labels = labels || 'counts';
  language = language || 'en';
  min_count = min_count || 0;
  mobile_breakpoint = mobile_breakpoint ||  0;
  networks = networks || ['facebook', 'twitter', 'pinterest', 'email', 'sharethis', 'sms'];
  padding = padding || 12;
  radius = radius || 0;
  size = size || 48;
  top = top || 100;
  show_mobile_buttons = show_mobile_buttons || st.mobile;

  if (slide_in === null) {
    slide_in = true;
  }
  if (use_native_counts === null) {
    use_native_counts = true;
  }
  if (show_toggle === null) {
    show_toggle = true;
  }
  const alignment_opposite = alignment === 'left' ? 'right' : 'left';
  const $el = document.getElementById(id);

  // adjust position for scrollbar on windows devices
  let scrollbar_width = alignment === 'right' ? st.getScrollbarWidth() : 0;
  scrollbar_width = 0; // temp

  // update class names
  st.addClass($el, [
    'st-sticky-share-buttons',
    `st-${alignment}`,
    show_toggle ? 'st-toggleable' : void 0,
    ['counts', 'cta'].indexOf(labels) >= 0 ? 'st-has-labels' : void 0,
    show_total ? 'st-show-total' : void 0,
    slide_in ? 'st-hidden' : void 0,
    language !== 'en' ? `st-lang-${language}` : void 0,
  ]);

  let common_css = `
    #${id} {
      ${st.font_family};
      ${st.transition()};
      backface-visibility: hidden;
      display: ${!hide_desktop ? 'block' : 'none'};
      position: fixed;
      opacity: 1;
      text-align: left;
      top: ${st.px(top)};
      z-index: 94034;
    }
    #${id}.st-${alignment} {
      ${alignment}: ${st.px(scrollbar_width)};
    }
    #${id}.st-hidden.st-${alignment} {
      ${alignment}: -${st.px(size)};
    }
    #${id}.st-hidden {
      width: ${st.px(2 * size)};
    }
    #${id} > div {
      clear: ${alignment};
      float: ${alignment};
    }
    #${id} .st-btn {
      ${st.border_box}
      ${st.transition()}
      cursor: pointer;
      display: inline-block;
      font-size: ${st.px(font_size)};
      height: ${st.px(size)};
      line-height: ${st.px(size / 2)};
      margin-bottom: ${spacing ? st.px(spacing) : 0};
      opacity: 1;
      overflow: hidden;
      padding: ${st.px(padding)};
      position: relative;
      text-align: left;
      top: 0;
      vertical-align: top;
      white-space: nowrap;
      width: ${st.px(size)};

    }
    #${id} .st-btn.st-first {
      border-top-${alignment_opposite}-radius: ${st.px(radius)};
    }
    #${id} .st-btn.st-last {
      border-bottom-${alignment_opposite}-radius: ${st.px(radius)};
    }
    #${id} .st-btn > svg {
      ${st.transition()}
      height: ${st.px(size / 2)};
      margin-left: 0;
      vertical-align: top;
      width: ${st.px(size / 2)};
    }
    #${id} .st-btn > img {
      ${st.transition()}
      height: ${st.px(size / 2)};
      margin-left: 0;
      vertical-align: top;
      width: ${st.px(size / 2)};
    }
    #${id} .st-btn > span {
      ${st.transition()}
      color: #fff;
      display: inline-block;
      font-weight: 500;
      left: -35px;
      letter-spacing: 0.5px;
      opacity: 0;
      padding: 0 6px;
      position: relative;
      vertical-align: top;
      filter: alpha(opacity=0);
    }
    #${id} .st-btn.st-hide-label > span {
      display: none !important;
    }
    #${id} .st-total {
      ${st.transition()}
      background: #fff;
      color: #555;
      display: inline-block;
      font-weight: 500;
      line-height: ${st.px(.375 * size)};
      margin-right: 0;
      min-height: 34px;
      max-width: 80px;
      opacity: 1;
      padding: 4px 0;
      text-align: center;
      width: ${st.px(size)};
    }
    #${id} .st-total.st-hidden {
      display: none;
    }
    #${id} .st-total > span {
      display: block;
      font-size: ${st.px(.38 * size)};
      line-height: ${st.px(.45 * size)};
      padding: 0;
    }
    #${id} .st-total > span.st-shares {
      font-size: ${st.px(.23 * size)};
      line-height: ${st.px(.23 * size)};
    }
    #${id} .st-toggle {
      ${alignment}: -${st.px(size + scrollbar_width)};
      ${st.transition()}
      background: #ccc;
      border-bottom-${alignment_opposite}-radius: ${st.px(radius)};
      color: white;
      cursor: pointer;
      font-size: ${st.px(.5 * size)};
      line-height: ${st.px(.5 * size)};
      position: relative;
      text-align: center;
      width: ${st.px(size)};
    }
    #${id}.st-hidden .st-toggle {
      border-top-${alignment_opposite}-radius: ${st.px(radius)};
    }
    #${id}.st-${alignment} .st-toggle .st-${alignment} {
      display: inline-block;
    }
    #${id}.st-${alignment}.st-hidden .st-toggle .st-${alignment} {
      display: none;
    }
    #${id}.st-${alignment} .st-toggle .st-${alignment_opposite} {
      display: none;
    }
    #${id}.st-${alignment}.st-hidden .st-toggle .st-${alignment_opposite} {
      display: inline-block;
    }
  `;

  let hover_css = `
    #${id}:hover .st-toggle {
      ${alignment}: 0;
    }
    #${id}.st-hidden:hover .st-toggle {
      ${alignment}: ${st.px(size)};
    }
    #${id}.st-toggleable:hover .st-btn.st-last {
      border-bottom-${alignment_opposite}-radius: 0;
    }
    #${id}.st-toggleable:hover .st-btn.st-last:hover {
      border-bottom-${alignment_opposite}-radius: ${st.px(radius)};
    }
    #${id} .st-btn:hover {
      border-bottom-${alignment_opposite}-radius: ${st.px(radius)};
      border-top-${alignment_opposite}-radius: ${st.px(radius)};
    }
    #${id}.st-has-labels .st-btn:hover {
      width: ${st.px(i18n['sticky-width'][language])};
    }
    #${id}:not(.st-has-labels) .st-btn:hover {
      width: ${st.px(1.3 * size)};
    }
    #${id} .st-btn.st-hide-label:hover {
      width: ${st.px(1.3 * size)};
    }
    #${id} .st-btn:hover > svg {
      margin-left: 5px;
    }
    #${id} .st-btn:hover > img {
      margin-left: 5px;
    }
    #${id} .st-btn:hover > span {
      opacity: 1;
      display: inline-block;
      left: 0;
      filter: alpha(opacity=100);
    }
    @media (max-width: ${st.px(mobile_breakpoint)}) {
      #${id} .st-btn:hover > svg {
        margin-left: 0;
      }
      #${id} .st-btn:hover > span {
        display: none;
      }
    }
  `;

  let mobile_css = `
    #${id} {
      bottom: 0;
      display: ${show_mobile ? 'flex' : 'none'};
      left: 0;
      right: 0;
      top: auto;
      width: 100%;
    }
    #${id}.st-hidden {
      bottom: -${st.px(size)};
      width: 100%;
    }
    #${id}.st-hidden.st-left {
      left: 0;
    }
    #${id}.st-hidden.st-right {
      right: 0;
    }
    #${id} > div {
      -moz-flex: 1;
      -ms-flex: 1;
      -webkit-flex: 1;
      clear: none;
      flex: 1;
      float: none;
    }
    #${id} .st-total {
      background: #fff;
      padding: 6px 8px;
    }
    #${id} .st-btn {
      -moz-border-radius: ${st.px(radius)};
      -webkit-border-radius: ${st.px(radius)};
      border-radius: ${st.px(radius)};
      text-align: center;
      width: auto;
    }
    #${id} .st-btn > span {
      display: none;
    }
    #${id} .st-toggle {
      display: none;
    }
  `;

  if (show_mobile && !document.body.style.paddingBottom) {
    mobile_css += "body { padding-bottom: 48px; }";
  }

  let network_css = ((function() {
    let results;
    results = [];
    for (let i = 0; i < networks.length; i++) {
      let network = networks[i];
      results.push(`
        #${id} .st-btn[data-network='${network}'] {
        background-color: ${COLORS[network]};
      }`);
    }
    return results;
  })()).join('\n');

  // build final css
  let css = common_css;
  if (!st.mobile) {
    css += hover_css;
  }
  // css += responsive_css if not st.mobile
  if (st.mobile) {
    css += mobile_css;
  }
  css += network_css;
  st.css(css);

  // generate button html
  let html = '';
  
  // generate html for total count
  if (show_total) {
    html += `
      <div class='st-total st-hidden'>
        <span class='st-label'></span>
        <span class='st-shares'>
          ${st.capitalize(i18n['shares'][language])}
        </span>
      </div>
    `;
  }

  // generate html for networks
  for (let i = 0; i < networks.length; ++i) {
    let network = networks[i];
    let class_names = ['st-btn'];
    if (i === 0) {
      class_names.push('st-first');
    }
    if (i === networks.length - 1) {
      class_names.push('st-last');
    }
    let label = st.getShareLabel(network, language);
    if (labels !== 'cta') {
      label = '';
    }
    let label_span = `<span class='st-label'>${label}</span>`;
    html += `
      <div class='${class_names.join(' ')}' data-network='${network}'>
        ${ICONS[network]}
        ${['counts', 'cta'].includes(labels) ? label_span : ''}
      </div>
    `;
  }

  // html for toggle button
  if (show_toggle) {
    html += `
      <div class="st-toggle">
        <div class="st-left">
          ${ICONS['arrow_left']}
        </div>
        <div class="st-right">
          ${ICONS['arrow_right']}
        </div>
      </div>
    `;
  }

  // render buttons
  $el.innerHTML = html;

  // get elements
  let $buttons = $el.querySelectorAll('.st-btn');
  let $toggle = $el.querySelector('.st-toggle');
  let $total = $el.querySelector('.st-total');
  let $total_label = $el.querySelector('.st-total .st-label');

  // add toggle listener
  st.addEventListener($toggle, 'click', () => {
    st.toggleClass($el, 'st-hidden');
  });

  // share listners
  for (let i = 0; i < $buttons.length; i++) {
    st.addEventListener($buttons[i], 'click', () => {
      return st.share({
        description: description || $el.getAttribute('data-description'),
        email_subject: $el.getAttribute('data-email-subject'),
        image: image || $el.getAttribute('data-image'),
        message: $el.getAttribute('data-message'),
        network: $buttons[i].getAttribute('data-network'),
        share_url: $el.getAttribute('data-short-url'),
        title: title || (typeof $el !== "undefined" && $el !== null ? $el.getAttribute('data-title') : void 0),
        url: url || $el.getAttribute('data-url'),
        username: $el.getAttribute('data-username')
      });
    });
  }

  // fade in buttons
  setTimeout((() => {
    return st.removeClass($el, 'st-hidden');
  }), 10);
}

module.exports = loader;
