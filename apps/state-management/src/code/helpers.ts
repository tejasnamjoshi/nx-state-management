export const debounce = (func: any, wait = 300) => {
  let timeout: NodeJS.Timer;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
