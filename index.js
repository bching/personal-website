document.addEventListener("DOMContentLoaded", function() {

      let options = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.2]
      }

      let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio >= 0.2) {
              entry.target.classList.add('is-visible');

              const poppers = entry.target.getElementsByClassName('popper');
              if (poppers.length) {
                window.setTimeout(() => {
                    for (let pop of poppers) {
                        pop.classList.add('pop-out');
                        pop.addEventListener('mouseenter', (e) => {
                            if (!e.target.classList.contains('pop-out')) {
                                e.target.classList.remove('pop-in');
                                e.target.classList.add('pop-out');
                            }
                        })
                        pop.addEventListener('mouseleave', (e) => {
                            if (!e.target.classList.contains('pop-in')) {
                                e.target.classList.remove('pop-out');
                                e.target.classList.add('pop-in');
                            }
                        })
                        window.setTimeout(() => {
                            pop.classList.remove('pop-out');
                            pop.classList.add('pop-in');
                        }, 700)
                    }
                }, 1300);
              }

              observer.unobserve(entry.target);
            }
          }
        });
      }, options);

      const contentItems = document.getElementsByClassName('fade-in-section');
      for(let item of contentItems) {
        observer.observe(item);
      }


})
//https://stackoverflow.com/a/11381730
window.mobileCheck = function () {
  let check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

/**
  shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
  @version v2.5.7
  @link https://github.com/dollarshaveclub/shave#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (jeffry.in)
  @license MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.shave = factory());
}(this, (function () { 'use strict';

  function shave(target, maxHeight) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (typeof maxHeight === 'undefined' || isNaN(maxHeight)) throw Error('maxHeight is required');
    var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
    if (!els) return;
    var character = opts.character || '…';
    var classname = opts.classname || 'js-shave';
    var spaces = typeof opts.spaces === 'boolean' ? opts.spaces : true;
    var charHtml = "<span class=\"js-shave-char\">".concat(character, "</span>");
    if (!('length' in els)) els = [els];

    for (var i = 0; i < els.length; i += 1) {
      var el = els[i];
      var styles = el.style;
      var span = el.querySelector(".".concat(classname));
      var textProp = el.textContent === undefined ? 'innerText' : 'textContent'; // If element text has already been shaved

      if (span) {
        // Remove the ellipsis to recapture the original text
        el.removeChild(el.querySelector('.js-shave-char'));
        el[textProp] = el[textProp]; // eslint-disable-line
        // nuke span, recombine text
      }

      var fullText = el[textProp];
      var words = spaces ? fullText.split(' ') : fullText; // If 0 or 1 words, we're done

      if (words.length < 2) continue; // Temporarily remove any CSS height for text height calculation

      var heightStyle = styles.height;
      styles.height = 'auto';
      var maxHeightStyle = styles.maxHeight;
      styles.maxHeight = 'none'; // If already short enough, we're done

      if (el.offsetHeight <= maxHeight) {
        styles.height = heightStyle;
        styles.maxHeight = maxHeightStyle;
        continue;
      } // Binary search for number of words which can fit in allotted height


      var max = words.length - 1;
      var min = 0;
      var pivot = void 0;

      while (min < max) {
        pivot = min + max + 1 >> 1; // eslint-disable-line no-bitwise

        el[textProp] = spaces ? words.slice(0, pivot).join(' ') : words.slice(0, pivot);
        el.insertAdjacentHTML('beforeend', charHtml);
        if (el.offsetHeight > maxHeight) max = pivot - 1;else min = pivot;
      }

      el[textProp] = spaces ? words.slice(0, max).join(' ') : words.slice(0, max);
      el.insertAdjacentHTML('beforeend', charHtml);
      var diff = spaces ? " ".concat(words.slice(max).join(' ')) : words.slice(max);
      var shavedText = document.createTextNode(diff);
      var elWithShavedText = document.createElement('span');
      elWithShavedText.classList.add(classname);
      elWithShavedText.style.display = 'none';
      elWithShavedText.appendChild(shavedText);
      el.insertAdjacentElement('beforeend', elWithShavedText);
      styles.height = heightStyle;
      styles.maxHeight = maxHeightStyle;
    }
  }

  return shave;

})));