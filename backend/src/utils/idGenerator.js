// Simple incremental id generator scoped per collection.
function createIdGenerator(startingId = 1) {
    let currentId = startingId;
    return () => currentId++;
}

module.exports = createIdGenerator;
