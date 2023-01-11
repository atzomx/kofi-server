/* eslint-disable @typescript-eslint/ban-types */
import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis } from "ioredis";
import { spy } from "simple-mock";

const create = () => {
  let listener: Function;

  const publishSpy = spy(
    (channel: string, message: string) =>
      listener && listener(channel, message),
  );
  const subscribeSpy = spy(
    (channel: string, cb: Function) => cb && cb(null, channel),
  );
  const unsubscribeSpy = spy(
    (channel: string, cb: Function) => cb && cb(channel),
  );
  const psubscribeSpy = spy(
    (channel: string, cb: Function) => cb && cb(null, channel),
  );
  const punsubscribeSpy = spy(
    (channel: string, cb: Function) => cb && cb(channel),
  );

  const quitSpy = spy((cb) => cb);
  const mockRedisClient = {
    publish: publishSpy,
    subscribe: subscribeSpy,
    unsubscribe: unsubscribeSpy,
    psubscribe: psubscribeSpy,
    punsubscribe: punsubscribeSpy,
    on: (event: string, cb: Function) => {
      if (event === "message") {
        listener = cb;
      }
    },
    quit: quitSpy,
  };

  const mockOptions = {
    publisher: mockRedisClient as unknown as Redis,
    subscriber: mockRedisClient as unknown as Redis,
  };
  const pubSub = new RedisPubSub(mockOptions);
  return pubSub;
};

export default { create };
