// Import stylesheets
import './style.css';

const parseStyleFormat = (str) => Number(str.replace('px', ''));
const styleFormat = (str) => `${str}px`;

const initMarquee = () => {
  const banner = document.querySelector('.banner');

  const bannerWidth = banner.clientWidth;
  const bannerHeight = banner.clientHeight;

  const bannerItem = banner.firstElementChild;
  const itemWidth = bannerItem.offsetWidth + 1;
  const itemHeight = bannerItem.clientHeight;

  console.log(`total size: ${bannerWidth} x ${bannerHeight}`);
  console.log(`item size: ${itemWidth} x ${itemHeight}`);

  bannerItem.style.width = itemWidth;

  const minAmount = Math.ceil(bannerWidth / itemWidth);

  console.log(`going to clone ${minAmount} times`);

  // add the clones
  const nodeElements = [bannerItem];
  for (let i = 0; i < minAmount; i++) {
    const newElement = bannerItem.cloneNode(true);
    banner.appendChild(newElement);
    nodeElements.push(newElement);
  }

  // make them all absolutely positioned
  for (let el of nodeElements) {
    const oldBounds = el.getClientRects()[0];
    requestAnimationFrame(() => {
      el.style.position = 'absolute';
      el.style['min-width'] = styleFormat(itemWidth);
      el.style['max-height'] = styleFormat(itemHeight);
      el.style.left = styleFormat(Math.floor(oldBounds.left));
      el.style.top = styleFormat(Math.floor(oldBounds.top));
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

    const firstLeft = parseStyleFormat(nodeElements[0].style.left);
    if (firstLeft < -itemWidth) {
      const furthestElementLeft = parseStyleFormat(
        nodeElements[nodeElements.length - 1].style.left
      );
      const first = nodeElements.shift();
      first.style.left = styleFormat(furthestElementLeft + itemWidth);
      nodeElements.push(first);
    }

    requestAnimationFrame(callback);
  };

  requestAnimationFrame(callback);
};

initMarquee();
