module.exports = function(rq, initTime = 20000) {
  return new Promise(async resolve => {
    const ping = async () => {
      try {
        await rq({
          url: '/_health',
          method: 'HEAD',
          mode: 'no-cors',
          json: true,
          headers: {
            'Content-Type': 'application/json',
            'Keep-Alive': false,
          },
        });

        return resolve();
      } catch (err) {
        console.log(err);
        if (err.statusCode) {
          return resolve();
        } else {
          return setTimeout(() => {
            ping();
          }, 1000);
        }
      }
    };

    setTimeout(() => {
      ping();
    }, initTime);
  });
};
