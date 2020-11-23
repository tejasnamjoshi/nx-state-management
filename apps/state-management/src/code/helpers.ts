export const debounce = (func: any, wait: number = 300) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      console.log(func, args);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
