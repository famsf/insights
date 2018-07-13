(function (fds, win) {
  var scrollComparison;
  var marginUnit = 16;
  fds.scrollComparison = {
    instances: {}
  };
  scrollComparison = fds.scrollComparison;
  scrollComparison.initialize = function (el) {
    var id = el.id;
    var leftCol = el.querySelector('.cell');
    var rightCol = el.querySelector('.cell:nth-child(2)');
    var instance;
    if (!scrollComparison.instances[id]) {
      instance = {
        el: el,
        id: id,
        left: {
          el: leftCol,
          h3: leftCol.querySelector('h3'),
          picture: leftCol.querySelector('.picture-with-caption .picture'),
          text: leftCol.querySelector('.textarea'),
          caption: leftCol.querySelector('.caption')
        },
        right: {
          el: rightCol,
          h3: rightCol.querySelector('h3'),
          picture: rightCol.querySelector('.picture-with-caption .picture'),
          text: rightCol.querySelector('.textarea'),
          caption: rightCol.querySelector('.caption')
        }
      };
      scrollComparison.instances[id] = instance;
    }
    leftCol.addEventListener('click', function (e) {
      scrollComparison.setActiveColumn(instance, instance.left);
    });
    rightCol.addEventListener('click', function (e) {
      scrollComparison.setActiveColumn(instance, instance.right);
    });
    scrollComparison.setActiveColumn(instance, instance.left);
    instance.activeColumn.el.addEventListener('transitionend', function (e) {
      instance.activeColumn.el.classList.add('show-text');
      if (e.target !== instance.activeColumn.el) {
        instance.activeColumn.el.classList.add('show-text');
      }
      else {
        instance.activeColumn.el.classList.remove('show-text');
      }
      scrollComparison.onResize();
    }, false);
    scrollComparison.onResize();
  };

  scrollComparison.setActiveColumn = function (instance, col) {
    if (instance.activeColumn) {
      instance.activeColumn.el.classList.add('inactive_col');
      instance.activeColumn.el.classList.remove('active_col');
    }
    if (col.el === instance.left.el) {
      instance.active = 'left';
    }
    else {
      instance.active = 'right';
    }
    col.el.classList.add('active_col');
    col.el.classList.remove('inactive_col');
    instance.left.el.classList.remove('show-text');
    instance.right.el.classList.remove('show-text');
    instance.activeColumn = col;
  };

  scrollComparison.onResize = function () {
    var i = 0;
    var activeColumn;
    var activeBr;
    var activePicture;
    var activePictureBr;
    var activeCaption;
    var activeText;
    var activeH3;
    var activeColWidth;
    var inactiveColWidth;
    var left;
    var right;
    var inst;
    Object.keys(scrollComparison.instances).forEach(function (instance) {
      inst = scrollComparison.instances[instance];
      activeColumn = inst.activeColumn;
      activeColWidth = inst.activeColumn.el.getBoundingClientRect().width;
      activePicture = activeColumn.picture;
      activeH3 = activeColumn.h3;
      activePictureBr = activePicture.getBoundingClientRect();
      activeCaption = activeColumn.caption;
      left = inst.left;
      right = inst.right;
      if (inst.active === 'left') {
        inactiveColWidth = right.el.clientWidth;
        activeColWidth = left.el.clientWidth;
        activeText = right.text;
        left.caption.style.top = left.picture.offsetTop + activeColWidth + (marginUnit * 0.25) + 'px';
        left.h3.style.top = activeColWidth + left.caption.clientHeight + marginUnit + 'px';
        left.text.style.top = left.h3.offsetTop + left.h3.clientHeight + (0.5 * marginUnit) + 'px';
        left.text.style.width = activeColWidth + 'px';
        right.h3.style.top = right.picture.offsetTop + inactiveColWidth + (0.5 * marginUnit) + 'px';
      }
      else {
        inactiveColWidth = left.el.clientWidth;
        activeColWidth = right.el.clientWidth;
        activeText = left.text;
        right.caption.style.top = left.caption.offsetTop + 'px';
        right.h3.style.top = activeColWidth + right.caption.clientHeight + (2 * marginUnit) + 'px';
        right.text.style.top = left.text.offsetTop + (0.5 * marginUnit) + 'px';
        right.text.style.width = left.text.style.width + 'px';
        left.h3.style.top = left.picture.offsetTop + inactiveColWidth + (0.5 * marginUnit) + 'px';
      }
      activeBr = inst.activeColumn.text.getBoundingClientRect();
      left.el.style.height = activeText.offsetTop + activeText.clientHeight + 'px';
      right.el.style.height = activeText.offsetTop + activeText.clientHeight + 'px';
    });
  };

  win.document.addEventListener('DOMContentLoaded', function () {
    win.document.addEventListener('resize', function () {
      scrollComparison.onResize(true);
    });
    scrollComparison.onResize();
  });
}(window.fds = window.fds || {}, window));
