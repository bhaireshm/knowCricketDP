function calculateDLS(payload) {
  const { target, overs, resources, parScore, parOvers } = payload;

  // Calculate the resource percentage
  var resourcePercentage = resources / 100;

  // Calculate the revised target score
  var revisedTarget = target * resourcePercentage + 0.5;

  // Calculate the overs remaining in the match
  var remainingOvers = parOvers - overs;

  // Calculate the reduction in target due to the reduction in overs
  var reductionInTarget =
    (parScore - revisedTarget) * (remainingOvers / parOvers);

  // Adjust the revised target score
  var adjustedTarget = revisedTarget + reductionInTarget;

  return Math.round(adjustedTarget);
}

module.exports = {
  calculateDLS,
};
