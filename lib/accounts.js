import axios from 'axios';
import { getHeader } from 'lib/api_helper';

export const getAccount = async (token) => {
  const response = await axios.get(
    `${process.env.API_HOST}/za/pb/v1/accounts`,
    getHeader(token),
  );

  let accounts = response.data.data['accounts'];

  const account = accounts.find((account) => {
    return account['productName'] === 'Private Bank Account';
  })

  return account;
};
