export const calculatePriorityScore = (severity, category) => {
  let severity_weight = 0;
  let category_weight = 0;
  let time_factor = 10; // Base time factor for new alerts

  // Severity Weight
  switch (severity?.toUpperCase()) {
    case 'CRITICAL':
      severity_weight = 50;
      break;
    case 'WARNING':
      severity_weight = 30;
      break;
    case 'SAFE':
      severity_weight = 10;
      break;
    default:
      severity_weight = 20;
  }

  // Category Weight
  switch (category?.toUpperCase()) {
    case 'FIRE':
      category_weight = 40;
      break;
    case 'MEDICAL':
      category_weight = 35;
      break;
    case 'SECURITY':
      category_weight = 30;
      break;
    default:
      category_weight = 10;
  }

  const priority_score = severity_weight + time_factor + category_weight;
  return priority_score;
};
