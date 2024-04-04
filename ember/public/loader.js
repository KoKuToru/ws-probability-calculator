async function load() {
  // load app.html
  const res = await fetch('app.html');
  const source = await res.text();
  // inject code into current page
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(source, 'text/html');
  for (var meta of htmlDoc.querySelectorAll('meta[name$="/environment"]')) {
    document.head.append(meta);
  }
  meta = JSON.parse(decodeURIComponent(meta.getAttribute('content')));
  for (const style of htmlDoc.querySelectorAll('link[rel="stylesheet"]')) {
    document.head.append(style);
  }
  for (const script of htmlDoc.querySelectorAll('script')) {
    const prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    let value = script.getAttribute('src');
    if (value.startsWith('/')) {
      continue;
    }
    prefetch.href = value;
    document.head.append(prefetch);
  }
  for (const script of htmlDoc.querySelectorAll('script')) {
    await new Promise((r, e) => {
      const script_nw = document.createElement('script');
      script_nw.addEventListener('load', r);
      script_nw.addEventListener('error', e);
      for (let { name, value } of script.attributes) {
        script_nw.setAttribute(name, value);
      }
      document.body.append(script_nw);
    });
  }
}
