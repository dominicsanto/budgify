import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { getClosingBalance, currentMonth, getTotalsPerType, formatTransactions, getWeeklyTransactions } from "lib/helpers";
import Balance from "./Balance";
import TransactionTable from "./TransactionTable";
import TransactionChart from "./TransactionChart";
import WarningAlert from "../shared/WarningAlert";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = ({ bankAccount, transactions }) => {
  const router = useRouter();

  const [weeklyTransactions, setWeeklyTransactions] = useState(null)
  const [formattedTransactions, setFormattedTransactions] = useState(null)
  const [closingBalance, setClosingBalance] = useState('0.00')
  const [totalExpenses, setTotalExpenses] = useState('0.00')
  const [totalIncome, setTotalIncome] = useState('0.00')

  useEffect(() => {
    if (Object.keys(transactions).length > 0) {
      setClosingBalance(getClosingBalance(transactions));
      setTotalExpenses(getTotalsPerType(transactions, "DEBIT"));
      setTotalIncome(getTotalsPerType(transactions, "CREDIT"));
      setFormattedTransactions(formatTransactions(transactions));
      setWeeklyTransactions(getWeeklyTransactions(transactions));
    }
  }, [transactions]);

  const logout = async () => {
    try {
      await axios.post('/api/logout');

      router.push('/');
    }
    catch(e) {
      console.error(e);
    }
  };

  return (
  <>
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h2 className="text-center text-3xl font-bold tracking-tight text-white">B U D G I F Y</h2>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center text-gray-400 rounded-full text-sm hover:text-white">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <button onClick={logout} className={classNames('block px-4 py-2 text-sm text-gray-700')}>
                            Logout
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      </Disclosure>

      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="flex-1 text-2xl font-bold tracking-tight text-gray-900">Account:
            <span className="font-light text-gray-900"> {bankAccount.accountNumber}</span>
          </h1>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Month:
            <span className="font-light text-gray-900"> {currentMonth()}</span>
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <>
          <Balance
            currentBalance={closingBalance}
            totalExpenses={totalExpenses}
            totalIncome={totalIncome}
          />
          { formattedTransactions
            ?
              <>
                <TransactionTable
                  transactions={formattedTransactions}
                />
                <TransactionChart
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                  weeklyTransactions={weeklyTransactions}
                />
              </>
            :
            <WarningAlert
              message="There are no transactions available for this current period"
            />
          }
        </>
        </div>
      </main>
    </div>
  </>);
}

Dashboard.propTypes = {
  bankAccount: PropTypes.object,
  transactions: PropTypes.object
};

export default Dashboard;
