export default async function *execute(queue, signal) {
  // boot workers
  const parallel_size = Math.max(1, (navigator.hardwareConcurrency ?? 2) - 1);
  const workers = Array(parallel_size).fill(null).map(() => {
    const worker = new Worker('./worker/worker.js', {type: 'module'})
    worker.promise = null;
    return worker;
  });
  try {
    const mqueue = queue.toReversed();
    let mwait = 0;
    // for each item
    while (mwait || mqueue.length) {
      signal.throwIfAborted();

      let worker;
      if (mqueue.length) {
        // search free worker
        worker = workers.find(x => !x.promise);
        if (!worker) {
          const promises = workers.map((x,i) => x.promise.then(() => i));
          const free = await Promise.race(promises);
          worker = workers[free];
        }
      } else {
        // search busy worker
        worker = workers.find(x => x.promise);
        if (!worker) {
          worker = workers[0];
        }
      }

      const res = await worker.promise;
      if (res) {
        mwait -= 1;
        if ('outofmemory' in res) {
          mqueue.push(res.data);
          if (workers.length > 1) {
            worker.terminate();
            workers.splice(workers.indexOf(worker), 1);
            continue;
          }
        }
        yield res;
      }

      if (mqueue.length) {
        // send request
        const channel = new MessageChannel();
        worker.promise = new Promise(r => channel.port1.onmessage = ({data}) => r(data));
        worker.postMessage(mqueue.pop(), [ channel.port2 ]);
        mwait += 1;
      } else {
        worker.promise = null;
      }
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
