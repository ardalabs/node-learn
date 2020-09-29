
import redis, { RedisClient } from 'redis';
interface ICacheManager {
  setCache(key: string, data: any, deltaTime?: number): void;
  deleteCache(key: string): void;
}
const redisClient = redis.createClient(6379, '127.0.0.1', { password: '' });
export class CacheManager implements ICacheManager {
  
  setCache(key: string, data: any, deltaTime?: number): void {
    redisClient.setex(key, 3600, JSON.stringify(data));
  }

  getCache(key: string, callBack: (err?: Error, result?: any) => void) {
    redisClient.get(key, (err, result) => {
      if (!err) {
        return callBack(undefined, result)
      }
    })
  }
  
  deleteCache(key: string): void {
    const evalRedis = // little fancy atomic lua script based on
      // http://stackoverflow.com/a/16974060/3202588
      'local keysToDelete = redis.call(\'keys\', ARGV[1]) ' + // find keys with wildcard
      'if unpack(keysToDelete) ~= nil then ' + // if there are any keys
      'return redis.call(\'del\', unpack(keysToDelete)) ' + // delete all
      'else ' +
      'return 0 ' + // if no keys to delete
      'end ';
    redisClient.eval(evalRedis, 0, key, (err: any, response: any) => {
      if (err) {
        return;
      }
      console.log(err);
    })
  }

}