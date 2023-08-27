import { helper } from '@ember/component/helper';

const formaters = Object.freeze([3, 2, 1, 0].map(x =>
  new Intl.NumberFormat(undefined, {
    maximumFractionDigits: x,
    minimumFractionDigits: x
  })
));

export function formatNumber(value) {
  if (isNaN(value)) {
    return '';
  }
  for (let f of formaters) {
    const tmp = f.format(value);
    if (tmp.length <= 3 || f === formaters.at(-1)) {
      return tmp;
    }
  }
  throw new Error('UNREACHABLE');
}

export default helper(function _formatNumber([value] /*, named*/) {
  return formatNumber(value)
});
