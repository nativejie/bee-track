(function () {
  TRACK.init({
    reportUrl: 'http://localhost:9999/track/post-data',
    appKey: 'uuid-uuid',
    debug: true,
    user: { name: 'zhoujie', phone: 18715012580 },
  });

  console.log('window: ', window);

  document
    .querySelector('#sendNormalXHR')
    .addEventListener('click', function (e) {
      // history.back();
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/user/123');
      xhr.send();
    });
})();
