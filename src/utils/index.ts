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
