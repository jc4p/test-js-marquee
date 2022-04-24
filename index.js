const parseStyleFormat = (str) => Number(str.replace('px', ''));
const styleFormat = (str) => `${str}px`;

const initMarquee = (selector, opts = {}) => {
  const banner = document.querySelector(selector);

  const bannerWidth = banner.clientWidth;

  const bannerItem = banner.firstElementChild;
  let itemWidth = bannerItem.offsetWidth + 1;
  const itemHeight = bannerItem.clientHeight;

  bannerItem.style.width = itemWidth;

  const minAmount = Math.ceil(bannerWidth / itemWidth);

  const spacing = opts.spacing || 20;

  // add the clones
  const nodeElements = [bannerItem];
  for (let i = 0; i < minAmount; i++) {
    const newElement = bannerItem.cloneNode(true);
    banner.appendChild(newElement);
    nodeElements.push(newElement);
  }

  const containerTop = banner.getBoundingClientRect().top;
  const nodeTop = nodeElements[0].getBoundingClientRect().top

  // make them all absolutely positioned
  for (let i = 0; i < nodeElements.length; i++) {
    const el = nodeElements[i]
    requestAnimationFrame(() => {
      const thisLeft = i == 0 ? 0 : (itemWidth + spacing) * i;

      el.style.position = 'absolute';
      el.style['min-width'] = styleFormat(itemWidth);
      el.style['max-height'] = styleFormat(itemHeight);
      el.style.left = styleFormat(thisLeft);
      el.style.top = styleFormat(nodeTop - containerTop);
    });
  }

  const MOVE_AMOUNT = itemWidth * 0.01;

  const callback = () => {
    // move everything over
    nodeElements.forEach((node, i) => {
      const curLeft = parseStyleFormat(node.style.left);
      const newLeft = curLeft - MOVE_AMOUNT;
      node.style.left = styleFormat(newLeft);
    });

    const firstRight = nodeElements[0].getBoundingClientRect().right;
    if (firstRight < 0) {
      const furthestBoundingBox = nodeElements[nodeElements.length - 1].getBoundingClientRect()
      const first = nodeElements.shift();
      first.style.left = styleFormat(furthestBoundingBox.right + spacing);
      nodeElements.push(first);
    }

    requestAnimationFrame(callback);
  };

  requestAnimationFrame(callback);
};

window.setTimeout(() => {
  initMarquee('.banner');
  initMarquee('.banner-1');
  initMarquee('.banner-2');
  initMarquee('.banner-3');
}, 75)