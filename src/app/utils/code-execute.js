const PARALLE_SIZE = Math.max(1, (navigator.hardwareConcurrency ?? 2) - 1);

export default async function *execute(queue, signal) {
  // boot workers
  const workers = Array(PARALLE_SIZE).fill(null).map(() => {
    const worker = new Worker('./worker/worker.js', {type: 'module'})
    worker.promise = new Promise(r => r());
    return worker;
  });
  try {
    // for each item
    for (const item of queue) {
      // search free worker
      let worker = null;
      while (!worker) {
        const free = (await Promise.race(workers.map(x => x.promise.then(() => [x.promise]))))[0];
        signal.throwIfAborted();
        worker = workers.find(x => x.promise === free);
      }

      signal.throwIfAborted();
      const res = await worker.promise;
      signal.throwIfAborted();
      if (res) {
        yield res;
      }
      signal.throwIfAborted();

      // send request
      const channel = new MessageChannel();
      worker.promise = new Promise(r => channel.port1.onmessage = ({data}) => r(data));
      worker.postMessage(item, [ channel.port2 ]);
    }

    // return last results
    for (const worker of workers) {
      signal.throwIfAborted();
      const res = await worker.promise;
      signal.throwIfAborted();
      if (res) {
        yield res;
      }
      signal.throwIfAborted();
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') {
      return;
    }
    throw e;
  } finally {
    // kill all workers
    workers.forEach(x => x.terminate());
  }
}
