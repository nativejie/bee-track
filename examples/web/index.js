(function () {
  TRACK.init({
    reportUrl: 'http://localhost:5500/track/report',
    appKey: 'uuid-uuid',
    debug: true,
    user: { name: 'zhoujie', phone: 18715012580 },
  });

  console.log(window);

  document
    .querySelector('#sendNormalXHR')
    .addEventListener('click', function (e) {
      history.back();
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/user/123');
      xhr.send();
    });
})();
