import { categories } from "./categories";

export const formatCurrency = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
});

export const formatDateShort = (dateStr) => {
  const date = new Date(dateStr);
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };

  return date.toLocaleString('en-ZA', dateOptions);
};

export const currentMonth = () => {
  const date = new Date()
  return date.toLocaleString('default', { month: 'long' })
};

export const getOpeningBalance = (transactions) => {;
  return transactions.pop()['runningBalance'];
}

export const getClosingBalance = (transactions) => {
  return transactions[0]['runningBalance'];
}

export const getTotalsPerType = (transactions, type) => {
  let totals = transactions.reduce((results, transaction) => {
    if (transaction['type'] === type) results.push(transaction['amount'])
    return results
  }, [])

  return totals.reduce((a, b) => a + b, 0)
}

export const getTotalsPerDate = (transactions, date, type) => {
  let totals = transactions.reduce((results, transaction) => {
    if (transaction['transactionDate'] === date && transaction['type'] === type) results.push(transaction['amount'])
    return results
  }, [])

  return totals.reduce((a, b) => a + b, 0)
}

export const formatTransactions = (transactions) => {
  let formattedTransactions = transactions.reduce((results, transaction) => {
    results.push({
      "description": transaction['description'],
      "type": transaction['type'],
      "date": transaction['transactionDate'],
      "amount": transaction['amount'],
      "category": getCetagory(transaction['description'])
    })
    return results
  }, [])

  return formattedTransactions;
}

export const getCetagory = (transactionDescripton) => {
  for (let category in categories) {
    const match = (element) => (new RegExp(element)).test(transactionDescripton);

    if (categories[category].some(match)) {
      return formatCategory(category)
    }
  }
}

export const formatCategory = (category) => {
  let formattedCategory = category.replaceAll('_', ' ')
  return formattedCategory[0].toUpperCase() + formattedCategory.slice(1).toLowerCase();
}

export const getWeeklyTransactions = (transactions) => {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let weeks = getWeeksInMonth(y, m);

    for (let w of weeks) {
      let weeklyTransactions = w.dates.reduce((weeklyTransactions, d, index) => {
        let date = formatDateShort(new Date(y, m, d)).replaceAll('/', '-')
        let weekIncome = getTotalsPerDate(transactions, date, "CREDIT")
        let weekExpenses = getTotalsPerDate(transactions, date, "DEBIT")

        weeklyTransactions.push(
          { date: `Week ${index + 1}`,
            income: weekIncome,
            expense: weekExpenses
          })

        return weeklyTransactions
      }, [])

      return weeklyTransactions;
    }
}

export const getWeeksInMonth = (year, month) => {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    if (dayOfWeekCounter === 0 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  return weeks
    .filter((w) => !!w.length)
    .map((w) => ({
      dates: w,
    }));
}
