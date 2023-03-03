import PropTypes from 'prop-types';
import Dashboard from "@/components/dashboard/Dashboard";
import cookie from 'cookie';
import { getAccount } from "lib/accounts";
import { useEffect } from "react";
import { useBankAccount } from "context/bankAccount";
import { getTransactions } from 'lib/transactions';

function DashboardPage({ bankAccount, transactions }) {
  const { setBankAccount } = useBankAccount();

  useEffect(() => {
    setBankAccount(bankAccount);
  }, [bankAccount, setBankAccount]);

  return ( <>
    <Dashboard
      bankAccount={bankAccount}
      transactions={transactions}
    />
  </> );
}

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers?.cookie || '');
  let bankAccount;
  let transactions;

  try {
    bankAccount = await getAccount(token);
    transactions = await getTransactions(token, bankAccount.accountId);
  }
  catch(e) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      }
    }
  }

  return {
    props: {
      bankAccount,
      transactions
    },
  };
}

DashboardPage.propTypes = {
  bankAccount: PropTypes.object
};

export default DashboardPage;
