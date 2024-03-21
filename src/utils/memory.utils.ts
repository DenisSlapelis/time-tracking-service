export const showMemory = () => {
    const memoryUsage = process.memoryUsage();
    const toMB = (1024 * 1024);

    return {
        rss: (memoryUsage.rss / toMB).toFixed(2) + ' MB',
        heapTotal: (memoryUsage.heapTotal / toMB).toFixed(2) + ' MB',
        heapUsed: (memoryUsage.heapUsed / toMB).toFixed(2) + ' MB',
        external: (memoryUsage.external / toMB).toFixed(2) + ' MB',
    };
}
