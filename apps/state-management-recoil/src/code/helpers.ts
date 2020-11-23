import { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const parse = require('parse-link-header');

export const debounce = (func: any, wait = 300) => {
  let timeout: NodeJS.Timer;

  return function executedFunction(...args: []) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getNextUrl = (response: AxiosResponse<any>): string | null => {
  const linkHeader: string = response.headers.link || '';
  const parsed = parse(linkHeader);

  return parsed?.next?.url;
};
