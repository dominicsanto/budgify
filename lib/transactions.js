import axios from 'axios';
import { getHeader } from 'lib/api_helper';
import { formatDateShort } from './helpers';

export const getTransactions = async (token, accountId) => {
  let date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDay = formatDateShort(new Date(y, m, 1)).replaceAll('/', '-');
  const lastDay = formatDateShort(new Date(y, m + 1, 1)).replaceAll('/', '-');

  const response = await axios.get(
    `${process.env.API_HOST}/za/pb/v1/accounts/${accountId}/transactions?fromDate=${firstDay}&toDate=${lastDay}`,
    getHeader(token)
  );

  return response.data.data['transactions'];
};
