const { Worker, threadId } = require('worker_threads');

async function main() {
    const foundAddress = false;
    const workers = [];

    const numWorkers = require('os').cpus().length; // Use available CPU cores

    for (let i = 0; i < numWorkers; i++) {
        workers.push(new Worker('./scripts/worker.js', { workerData: { foundAddress } }));
    }

    for (const worker of workers) {
        const result = await new Promise((resolve, reject) => {
            worker.on('message', (message) => {
                if (message === 'found') {
                    worker.terminate();
                    resolve('Found address, stopping workers!');
                } else {
                    reject(new Error('Worker error'));
                }
            });
            worker.on('error', reject);
        });
        console.log(`Worker ${threadId} finished: ${result}`);
    }

    workers.forEach((worker) => worker.terminate());
}

(async () => {
    try {
        const message = await main();
        console.log(message);
    } catch (error) {
        console.error(error);
    }
})();
