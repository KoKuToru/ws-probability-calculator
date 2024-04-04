import { helper } from '@ember/component/helper';

const formaters = [];

export function formatNumber(value, places) {
  places ??= 4;
  while (formaters.length < places + 2) {
    formaters.unshift(new Intl.NumberFormat('en-US', {
      maximumFractionDigits: formaters.length,
      minimumFractionDigits: formaters.length
    }));
  }
  if (isNaN(value)) {
    return '';
  }
  for (let f of formaters) {
    const tmp = f.format(value);
    if (tmp.length <= places || f === formaters.at(-1)) {
      return tmp;
    }
  }
  throw new Error('UNREACHABLE');
}

export default helper(function _formatNumber(values /*, named*/) {
  return formatNumber(...values)
});
