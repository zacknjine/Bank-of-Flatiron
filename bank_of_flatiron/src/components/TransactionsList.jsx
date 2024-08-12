import React, { useState, useEffect } from 'react';
import Transaction from './Transaction';
import Search from './Search';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:3000/transactions');
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const results = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(results);
  }, [searchTerm, transactions]);

  return (
    <>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TransactionList;