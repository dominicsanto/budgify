import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { formatCurrency } from 'lib/helpers';

const Balance = ({ currentBalance, totalExpenses, totalIncome }) => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Balance</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex text-2xl font-semibold text-indigo-600">
              {formatCurrency.format(currentBalance)}
            </div>
          </dd>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Income</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              <div className="flex items-baseline text-2xl font-semibold text-green-600">
                {formatCurrency.format(totalIncome)}
              </div>
              <ArrowUpIcon
                className="mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                aria-hidden="true"
              />
            </div>
          </dd>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Expenses</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              <div className="flex items-baseline text-2xl font-semibold text-red-600">
                {formatCurrency.format(totalExpenses)}
              </div>
              <ArrowDownIcon
                className="mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                aria-hidden="true"
              />
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default Balance;
