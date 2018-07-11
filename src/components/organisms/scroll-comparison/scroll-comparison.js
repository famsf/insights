(function (fds, win) {
  var scrollComparison;
  fds.scrollComparison = {
    instances: {}
  };
  scrollComparison = fds.scrollComparison;
  scrollComparison.initialize = function (el) {
    var id = el.id;
    var left = el.querySelector('.cell');
    var right = el.querySelector('.cell:nth-child(2)');
    var leftTextAreaBoundingRect = left.querySelector('.textarea').getBoundingClientRect();
    var rightTextAreaBoundingRect = right.querySelector('.textarea').getBoundingClientRect();
    var instance;
    if (leftTextAreaBoundingRect.height > rightTextAreaBoundingRect) {
      el.style.height = leftTextAreaBoundingRect.top + leftTextAreaBoundingRect.height + 'px';
    }
    else {
      el.style.height = rightTextAreaBoundingRect.top + rightTextAreaBoundingRect.height + 'px';
    }
    if (!scrollComparison.instances[id]) {
      scrollComparison.instances[id] = { el: el };
      if (left.classList.contains('active_col')) {
        scrollComparison.instances[id].activeColumn = left;
      }
      left.addEventListener('click', function (e) {
        scrollComparison.setActiveColumn(el, left);
      });
      right.addEventListener('click', function (e) {
        scrollComparison.setActiveColumn(el, right);
      });
    }
  };

  scrollComparison.setActiveColumn = function (el, col) {
    console.log('setActiveColumn', el, col);
    if (scrollComparison.instances[el.id].activeColumn) {
      console.log('setActiveColumn B', scrollComparison.instances[el.id].activeColumn);
      scrollComparison.instances[el.id].activeColumn.classList.add('inactive_col');
      scrollComparison.instances[el.id].activeColumn.classList.remove('active_col');
    }
    col.classList.add('active_col');
    col.classList.remove('inactive_col');
    scrollComparison.instances[el.id].activeColumn = col;
  };
}(window.fds = window.fds || {}, window));
