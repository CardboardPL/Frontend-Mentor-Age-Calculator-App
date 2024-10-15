function countUpElement(target, element,  timeout = 10, base = 0) {
  if (target < base) {
    console.error('Target number must be greater than the base');
    return;
  }

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (base <= target) {
        element.textContent = base;
        base++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, timeout);
  });
}

export async function countUpElements(...elements) {
  for (const element of elements) {
    await countUpElement(element.val1, element.val2);
  }
}