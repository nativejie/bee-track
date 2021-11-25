(function () {
  TRACK.init({
    reportUrl: 'http://localhost:5500/track/report',
    appKey: 'uuid-uuid',
    debug: true,
    user: { name: 'zhoujie', phone: 18715012580 },
  });

  console.log(window);

  // document
  //   .querySelector('#sendNormalXHR')
  //   .addEventListener('click', function (e) {
  //     console.log(e);
  //     console.log(e.path);
  //     e.composedPath().forEach((node) => {
  //       const { tagName, localName, id } = node;
  //       console.log(tagName, ' - ', localName);
  //       console.log(`${localName}${id ? '#' + id : ''}`);
  //       if (tagName && node.getAttribute('bee-track-click')) {
  //         console.log(node.getAttribute('bee-track-click'));
  //       }
  //     });
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('get', '/user/123');
  //     xhr.send();
  //   });
})();
