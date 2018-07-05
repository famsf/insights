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
    var instance;
    if (!scrollComparison.instances[id]) {
      console.log('hihihi', left.classList)
      scrollComparison.instances[id] = { el: el };
      instance = scrollComparison.instances[id];
      if (left.classList.contains('active')) {
        console.log('eijeij3iej32ijei3');
        instance.activeColumn = left;
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
    var instance = scrollComparison.instances[el.id];
    console.log('instance »»» ', el.id, instance)
    if (instance.activeColumn) {
      instance.activeColumn.classList.remove('active');
    }
    col.classList.add('active');
    instance.activeColumn = col;
  };
}(window.fds = window.fds || {}, window));
