function countUpElement(target, element,  timeout = 20, base = 0) {
  if (target < base) {
    return Promise.reject('Target number must be greater than the base');
  }

  return new Promise((resolve) => {
    const increment = () => {
      if (base <= target) {
        if (isCancelled) {
          resolve();
          return;
        }
        element.textContent = base;
        base++;
        setTimeout(increment, timeout)
      } else {
        resolve();
      }
    }
    
    increment();
  });
}

let isCounting = false;
let isCancelled = false;

export async function countUpElements(...elements) {
  isCancelled = false

  if (isCounting) {
    isCounting = false;
    isCancelled = true;
    countUpElements(...elements);
    return;
  }

  isCounting = true;

  for (const element of elements) {
    if (isCancelled) break;
    await countUpElement(element.val1, element.val2);
  }

  isCounting = false;
}