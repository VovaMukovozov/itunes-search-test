const Promise = require('bluebird');
const config = require('config');
const redis = require('redis');
const host = config.get('cache.redis.host');
const port = config.get('cache.redis.port');
Promise.promisifyAll(redis);
module.exports = redis.createClient(port, host, {
    db: config.get('cache.redis.db_index') || 0
});
