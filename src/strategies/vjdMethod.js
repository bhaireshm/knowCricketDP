function calculateVJD(payload) {
  const { target, overs, resources, parScore, parOvers, minOvers } = payload;

  // Calculate the resource percentage
  var resourcePercentage = resources / 100;

  // Calculate the reduction in overs
  var reductionInOvers = parOvers - overs;

  // Calculate the revised target score
  var revisedTarget =
    target + (parScore - target) * (reductionInOvers / minOvers);

  // Adjust the revised target score based on resource percentage
  var adjustedTarget = revisedTarget * resourcePercentage;

  return Math.round(adjustedTarget);
}

module.exports = {
  calculateVJD,
};
