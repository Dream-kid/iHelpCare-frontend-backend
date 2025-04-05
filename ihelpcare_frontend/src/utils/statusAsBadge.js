export const surveyStatusAsBadge = (status) => {
  if (status === 'Draft') {
    return 'warning';
  }
  if (status === 'Active') {
    return 'processing';
  }
  if (status === 'Disabled') {
    return 'error';
  }
  if (status === 'Completed') {
    return 'success';
  }
  return 'default';
};
