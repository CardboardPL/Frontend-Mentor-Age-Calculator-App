const DEFAULT_TIMEOUT = 20;
const DEFAULT_BASE = 0;
let currTimeout = DEFAULT_TIMEOUT;

function countUpElement(target, element,  timeout = DEFAULT_TIMEOUT, base = DEFAULT_BASE) {
  if (target < base) {
    console.error(`Invalid target: ${target}. Target must be less than or equal to the base (${base})`);
    return Promise.reject(new Error('Target number must be greater than the base'));
  }

  currTimeout = timeout;
  element.parentElement.classList.add('counted');

  return new Promise((resolve) => {
    const increment = () => {
      if (base <= target) {
        if (isCancelled) {
          resolve();
          return;
        }
        element.textContent = base;
        base++;
        setTimeout(increment, timeout);
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
  isCancelled = false;

  if (isCounting) {
    isCounting = false;
    isCancelled = true;
    setTimeout(() => {
      countUpElements(...elements);
    }, currTimeout);
    return;
  }

  isCounting = true;

  for (const element of elements) {
    if (isCancelled) break;
    await countUpElement(element.val1, element.val2);
  }

  isCounting = false;
}