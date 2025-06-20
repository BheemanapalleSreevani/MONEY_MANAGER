
import { Component } from 'react';
import {v4} from 'uuid';
import MoneyTransaction from './Components/MoneyManager';
import './App.css';

const typeofform = [
  {
    catogery: 'INCOME',
    type: 'Income'
  },
  {
    catogery: 'EXPENSES',
    type: 'Expenses'
  }
]


class App extends Component{
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    typeofmoney: typeofform[0].category,
    historylist: [],
    title: '',
    amount: '',
    isincome: false
  }

  onsubmitbutton = (event) =>{
    event.preventDefault()
    const {title, amount, typeofmoney, isincome} = this.state
    const newlist = {
      id: v4(),
      titlename: title,
      money: amount,
      typeinhistory: typeofmoney
    }
    this.setState(prevstate => ({
      historylist: [...prevstate.historylist, newlist],
      balance: isincome? parseInt(prevstate.balance) + parseInt(amount) : parseInt(prevstate.balance) - parseInt(amount),
      income: isincome? parseInt(prevstate.income) + parseInt(amount) : parseInt(prevstate.income) + 0,
      expenses: isincome? parseInt(prevstate.expenses) + 0 : parseInt(prevstate.expenses) + parseInt(amount) ,
      title: '',
      amount: '',
      typeofmoney: '--selecttype--'
    }))
  }
  ontitlechange = (event) => {
    this.setState({title: event.target.value})
  }
  onamountchange = (event) => {
    this.setState({amount: event.target.value})
  }
  ontypechange = (event) => {
    this.setState({typeofmoney: event.target.value})
    console.log(event.target.value)
    if(event.target.value === 'Income'){
      this.setState({isincome: true})
    }else{
      this.setState({isincome: false})
    }
    
  }
  ondeletebutton = (id, money, type) => {
    const {historylist, balance, income, expenses} = this.state
    const newupdatedlist = historylist.filter(eachitem => (
      id !== eachitem.id
    ))
    let deletetype = false;
    if(type === 'Income'){
      deletetype = true
    }else{
      deletetype = false
    }
    this.setState({
      historylist: newupdatedlist,
      balance: deletetype? parseInt(balance) - parseInt(money) : parseInt(balance) + parseInt(money),
      income: deletetype? parseInt(income) - parseInt(money) : parseInt(income) + 0,
      expenses: deletetype? parseInt(expenses) + 0 : parseInt(expenses) - parseInt(money)
    })
  }

  render () {
    const {title, amount, historylist, balance, income, expenses, typeofmoney} = this.state
    return (
      <div className='top-div'>
        <div className='main-div'>
          <div className='header-div'>
            <p className='hiname'>Hi, Richard</p>
            <p className='para'>Welcome back to your <span className='span'>Money Manager</span></p>
          </div>
          <div className='amounts-div'>
            <div className='balance-div'>
              <img className='image' alt='balance' src='https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png' />
              <div>
                <p className='names'>Your Balance</p>
                <p className='amount'>Rs. {balance} </p>
              </div>
            </div>
            <div className='income-div'>
              <img className='image' alt='income' src='https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png' />
              <div>
                <p className='names'>Your Income</p>
                <p className='amount'>Rs. {income} </p>
              </div>
            </div>
            <div className='expenses-div'>
              <img className='image' alt='expenses' src='https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png' />
              <div>
                <p className='names'>Your Expenses</p>
                <p className='amount'>Rs. {expenses} </p>
              </div>
            </div>
          </div>
          <div className='bottom-div'>
            
              <form className='form' onSubmit={this.onsubmitbutton}>
                <h3 className='transaction-header'>Add Transaction</h3>
                <p className='input-label'>TITLE</p>
                <input type='text' onChange={this.ontitlechange} value={title} placeholder='TITLE' className='inputs-form' />
                <p className='input-label'>AMOUNT</p>
                <input type='number' onChange={this.onamountchange} value={amount} placeholder='AMOUNT' className='inputs-form' />
                <label htmlFor='moneytype' className='input-label'>TYPE</label>
                <select id='moneytype' name='cashtype' className='inputs-form' value={typeofmoney} onChange={this.ontypechange}>
                  <option value=''>--selecttype--</option>
                  {
                    typeofform.map(eachtype => (
                      <option value={eachtype.category} key={eachtype.catogery}>{eachtype.type}</option>
                    ))
                  }
                </select>
                <button type='submit' className='add-btn'>ADD</button>
              </form>
            
            <div className='history-div'>
              <h3 className="transaction-header">History</h3>
              <div className='table-container'>
                <ul className='table-list'>
                  <li className='table-header'>
                    <p className='header'>Title</p>
                    <p className='header'>Amount</p>
                    <p className='header'>Type</p>
                  </li>
                  {historylist.map(eachitem => (
                    <MoneyTransaction details={eachitem} key={eachitem.id} ondeletebutton={this.ondeletebutton}/>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
