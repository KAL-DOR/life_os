'use client';

import { useState } from 'react';
import {
  Tabs,
  Tab,
  TabBody,
  Window,
  WindowHeader,
  WindowContent,
  Button,
  TextInput,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
  GroupBox,
} from 'react95';
import styles from './Finance.module.css';

// Types
interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'expense' | 'earning';
  bank_id: string;
  created_at: string;
}

interface BankAccount {
  id: string;
  institution: string;
  name: string;
  balance: number;
}

interface Investment {
  id: string;
  institution: string;
  name: string;
  type: 'fixed' | 'variable' | 'crypto' | 'stocks';
  yield_rate: number;
  balance: number;
}

// Modal types
type ModalType = 'transaction' | 'bank' | 'investment' | null;

export default function Finance() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Placeholder data - will be replaced with API calls
  const [transactions] = useState<Transaction[]>([
    { id: '1', title: 'Groceries', amount: 150, type: 'expense', bank_id: '1', created_at: '2025-01-14' },
    { id: '2', title: 'Salary', amount: 5000, type: 'earning', bank_id: '1', created_at: '2025-01-10' },
  ]);

  const [bankAccounts] = useState<BankAccount[]>([
    { id: '1', institution: 'Chase', name: 'Checking', balance: 4850 },
    { id: '2', institution: 'Ally', name: 'Savings', balance: 10000 },
  ]);

  const [investments] = useState<Investment[]>([
    { id: '1', institution: 'Fidelity', name: '401k', type: 'stocks', yield_rate: 7, balance: 25000 },
    { id: '2', institution: 'OKX', name: 'Crypto', type: 'crypto', yield_rate: 0, balance: 5000 },
  ]);

  // Form states
  const [transactionForm, setTransactionForm] = useState({
    title: '',
    amount: '',
    type: 'expense',
    bank_id: '',
  });

  const [bankForm, setBankForm] = useState({
    institution: '',
    name: '',
    initial_balance: '',
  });

  const [investmentForm, setInvestmentForm] = useState({
    institution: '',
    name: '',
    type: 'stocks',
    yield_rate: '',
    initial_balance: '',
  });

  // Calculate totals
  const totalBankBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.balance, 0);
  const totalBalance = totalBankBalance + totalInvestments;

  // Handle form submissions - TODO: Wire to API
  const handleAddTransaction = () => {
    console.log('Adding transaction:', transactionForm);
    // TODO: API call to add transaction
    setActiveModal(null);
    setTransactionForm({ title: '', amount: '', type: 'expense', bank_id: '' });
  };

  const handleAddBank = () => {
    console.log('Adding bank:', bankForm);
    // TODO: API call to add bank account
    setActiveModal(null);
    setBankForm({ institution: '', name: '', initial_balance: '' });
  };

  const handleAddInvestment = () => {
    console.log('Adding investment:', investmentForm);
    // TODO: API call to add investment
    setActiveModal(null);
    setInvestmentForm({ institution: '', name: '', type: 'stocks', yield_rate: '', initial_balance: '' });
  };

  return (
    <div className={styles.scrollContainer} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <Tab value={0}>Transactions</Tab>
        <Tab value={1}>Accounts</Tab>
        <Tab value={2}>Balance</Tab>
      </Tabs>

      <TabBody style={{ flex: 1 }} className={styles.scrollArea}>
        {/* Transactions Tab */}
        {activeTab === 0 && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Button onClick={() => setActiveModal('transaction')}>
                + Add Transaction
              </Button>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Date</TableHeadCell>
                  <TableHeadCell>Title</TableHeadCell>
                  <TableHeadCell>Type</TableHeadCell>
                  <TableHeadCell>Amount</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableDataCell>{tx.created_at}</TableDataCell>
                    <TableDataCell>{tx.title}</TableDataCell>
                    <TableDataCell>{tx.type}</TableDataCell>
                    <TableDataCell style={{ color: tx.type === 'expense' ? 'red' : 'green' }}>
                      {tx.type === 'expense' ? '-' : '+'}${tx.amount}
                    </TableDataCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Accounts Tab */}
        {activeTab === 1 && (
          <div>
            <GroupBox label="Bank Accounts" style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <Button onClick={() => setActiveModal('bank')}>
                  + Add Bank Account
                </Button>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Institution</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Balance</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankAccounts.map((acc) => (
                    <TableRow key={acc.id}>
                      <TableDataCell>{acc.institution}</TableDataCell>
                      <TableDataCell>{acc.name}</TableDataCell>
                      <TableDataCell>${acc.balance.toLocaleString()}</TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{ marginTop: 8, fontWeight: 'bold' }}>
                Total: ${totalBankBalance.toLocaleString()}
              </div>
            </GroupBox>

            <GroupBox label="Investments">
              <div style={{ marginBottom: 8 }}>
                <Button onClick={() => setActiveModal('investment')}>
                  + Add Investment
                </Button>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Institution</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Type</TableHeadCell>
                    <TableHeadCell>Yield</TableHeadCell>
                    <TableHeadCell>Balance</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {investments.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableDataCell>{inv.institution}</TableDataCell>
                      <TableDataCell>{inv.name}</TableDataCell>
                      <TableDataCell>{inv.type}</TableDataCell>
                      <TableDataCell>{inv.yield_rate}%</TableDataCell>
                      <TableDataCell>${inv.balance.toLocaleString()}</TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{ marginTop: 8, fontWeight: 'bold' }}>
                Total: ${totalInvestments.toLocaleString()}
              </div>
            </GroupBox>
          </div>
        )}

        {/* Balance Tab */}
        {activeTab === 2 && (
          <div style={{ padding: 16 }}>
            <GroupBox label="Financial Summary">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
                  <span>Bank Accounts:</span>
                  <span>${totalBankBalance.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
                  <span>Investments:</span>
                  <span>${totalInvestments.toLocaleString()}</span>
                </div>
                <hr style={{ border: '1px solid #888' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, fontWeight: 'bold' }}>
                  <span>Total Net Worth:</span>
                  <span style={{ color: totalBalance >= 0 ? 'green' : 'red' }}>
                    ${totalBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </GroupBox>
          </div>
        )}
      </TabBody>

      {/* Add Transaction Modal */}
      {activeModal === 'transaction' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        }}>
          <Window style={{ width: 350 }}>
            <WindowHeader>
              <Button size="sm" style={{ marginRight: 8 }} onClick={() => setActiveModal(null)}>
                ✕
              </Button>
              <span>Add Transaction</span>
            </WindowHeader>
            <WindowContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Title:</label>
                  <TextInput
                    value={transactionForm.title}
                    onChange={(e) => setTransactionForm({ ...transactionForm, title: e.target.value })}
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Amount:</label>
                  <TextInput
                    type="number"
                    value={transactionForm.amount}
                    onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Type:</label>
                  <Select
                    value={transactionForm.type}
                    onChange={(e) => setTransactionForm({ ...transactionForm, type: e.target.value })}
                    options={[
                      { value: 'expense', label: 'Expense' },
                      { value: 'earning', label: 'Earning' },
                    ]}
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Bank Account:</label>
                  <Select
                    value={transactionForm.bank_id}
                    onChange={(e) => setTransactionForm({ ...transactionForm, bank_id: e.target.value })}
                    options={bankAccounts.map(acc => ({ value: acc.id, label: `${acc.institution} - ${acc.name}` }))}
                    fullWidth
                  />
                </div>
                <Button onClick={handleAddTransaction} fullWidth>
                  Add Transaction
                </Button>
              </div>
            </WindowContent>
          </Window>
        </div>
      )}

      {/* Add Bank Account Modal */}
      {activeModal === 'bank' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        }}>
          <Window style={{ width: 350 }}>
            <WindowHeader>
              <Button size="sm" style={{ marginRight: 8 }} onClick={() => setActiveModal(null)}>
                ✕
              </Button>
              <span>Add Bank Account</span>
            </WindowHeader>
            <WindowContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Institution:</label>
                  <TextInput
                    value={bankForm.institution}
                    onChange={(e) => setBankForm({ ...bankForm, institution: e.target.value })}
                    placeholder="e.g. Chase, Ally, etc."
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Account Name:</label>
                  <TextInput
                    value={bankForm.name}
                    onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
                    placeholder="e.g. Checking, Savings"
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Initial Balance:</label>
                  <TextInput
                    type="number"
                    value={bankForm.initial_balance}
                    onChange={(e) => setBankForm({ ...bankForm, initial_balance: e.target.value })}
                    fullWidth
                  />
                </div>
                <Button onClick={handleAddBank} fullWidth>
                  Add Account
                </Button>
              </div>
            </WindowContent>
          </Window>
        </div>
      )}

      {/* Add Investment Modal */}
      {activeModal === 'investment' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        }}>
          <Window style={{ width: 350 }}>
            <WindowHeader>
              <Button size="sm" style={{ marginRight: 8 }} onClick={() => setActiveModal(null)}>
                ✕
              </Button>
              <span>Add Investment</span>
            </WindowHeader>
            <WindowContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Institution:</label>
                  <TextInput
                    value={investmentForm.institution}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, institution: e.target.value })}
                    placeholder="e.g. Fidelity, OKX"
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Name:</label>
                  <TextInput
                    value={investmentForm.name}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, name: e.target.value })}
                    placeholder="e.g. 401k, Crypto Portfolio"
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Type:</label>
                  <Select
                    value={investmentForm.type}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, type: e.target.value })}
                    options={[
                      { value: 'fixed', label: 'Fixed Yield' },
                      { value: 'variable', label: 'Variable Yield' },
                      { value: 'crypto', label: 'Crypto' },
                      { value: 'stocks', label: 'Stocks' },
                    ]}
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Yield Rate (%):</label>
                  <TextInput
                    type="number"
                    value={investmentForm.yield_rate}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, yield_rate: e.target.value })}
                    fullWidth
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 4 }}>Initial Balance:</label>
                  <TextInput
                    type="number"
                    value={investmentForm.initial_balance}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, initial_balance: e.target.value })}
                    fullWidth
                  />
                </div>
                <Button onClick={handleAddInvestment} fullWidth>
                  Add Investment
                </Button>
              </div>
            </WindowContent>
          </Window>
        </div>
      )}
    </div>
  );
}
