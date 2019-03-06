const { auth } = require('./helpers/auth');
const rq = require('./helpers/request');
const restart = require('./helpers/restart');

module.exports = async () => {
  try {
    await restart(rq, 0);

    await rq({
      url: '/auth/local/register',
      method: 'POST',
      body: auth,
      json: true,
    });
  } catch (error) {
    console.error(error);
  }
};
