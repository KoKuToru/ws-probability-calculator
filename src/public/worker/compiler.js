/*
 convert the recursive code into a float non recursive version

 format:
  code: [action, ...params, code]
*/
export default function compile(code) {
  const res = [];
  for (const tmp of code) {
    const cmd = tmp.at(0);
    const params = tmp.slice(1, -1);
    const children = tmp.at(-1);
    if (cmd === 'repeat') {
      // just the simple case for now
      for (let i = 0; i < params[0]; ++i) {
        res.push(...compile(children));
      }
    } else {
      res.push([cmd, ...params])
    }
  }
  return res;
}
