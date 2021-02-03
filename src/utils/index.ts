/**
 * 格式化播放数量
 */
export function formatPlayCount(value: number): string {
  const num = value.toString();

  let result = "";

  if (value === 0 || num.length < 5) {
    result = num;
  } else if (num.length > 5 && num.length < 9) {
    result = (value / 1e5).toFixed(2) + "万";
  } else if (num.length > 9) {
    result = (value / 1e9).toFixed(2) + "亿";
  }
  return result;
}

/**
 * 获取随机列表
 */
export function getRandomItem(arr: any[], count: number): any[] {
  let i = arr.length,
    temp;

  const copyArr = arr.slice(0),
    min = i - count;

  while (i-- > min) {
    const index = Math.floor((i + 1) * Math.random());
    temp = copyArr[index];
    copyArr[index] = copyArr[i];
    copyArr[i] = temp;
  }
  return copyArr.slice(min);
}

/**
 * 判断元素是否在可视化区域
 */

export const isElementNotInViewport = (el: HTMLDivElement, containerEl: HTMLDivElement) => {
  const anchorRect = el && el.getBoundingClientRect();
  const containerElTop = containerEl && containerEl.clientHeight + 90;
  return containerElTop >= anchorRect.top || anchorRect.bottom <= 0;
};

/**
 * 格式化分秒
 */
export const formatMinSecond = (data: number): string => {
  let m = Math.floor(data / 60).toString();
  let s = (Math.floor(data) - Number(m) * 60).toString();
  m = Number(m) < 10 ? `0${m}` : m;
  s = Number(s) < 10 ? `0${s}` : s;
  return `${m}:${s}`;
};
