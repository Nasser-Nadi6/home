const Redis = require('ioredis')

function connectToRedis(port, host, db) {
    return new Promise((resolve, reject) => {
        const redis = new Redis({
            port: port,
            host: host,
            db: db
        })
        redis.on('ready', () => {
            resolve(redis)
        })
        redis.on('error', (err) => {
            reject(err)
        })
    })
}

module.exports={
    connectToRedis
}