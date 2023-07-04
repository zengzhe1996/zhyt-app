import { get, post } from '@/utils/request';

export const demo = (params) => {
  return get('/web/platAccount/getBankCardList', params);
};
