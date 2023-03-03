const { createContext, useState, useContext } = require("react");

const Context = createContext();

const Provider = ({ children, value }) => {
  const [bankAccount, setBankAccount] = useState(null);

  const exposed = {
    bankAccount: {
      ...bankAccount,
      ...value,
    },
    setBankAccount,
  };

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  );
};

export const useBankAccount = () => useContext(Context);

export default Provider;
