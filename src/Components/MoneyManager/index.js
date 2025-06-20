
import './index.css'

const MoneyTransaction = (props) => {
    const {details, ondeletebutton} = props
    const {id, titlename, money, typeinhistory} = details
    const onclickdelete = () =>{
        ondeletebutton(id, money, typeinhistory)
    }
    return (
        <li className='list-item'>
            <p className='items'>{titlename}</p>
            <p className='items'>{money}</p>
            <p className='items'>{typeinhistory}</p>
            <div className="delete-container">
                <button
                className="delete-button"
                type="button"
                onClick={onclickdelete}
                data-testid="delete"
                >
                <img
                    className="delete-img"
                    src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                    alt="delete"
                />
                </button>
            </div>
            
        </li>
       
    )
}

export default MoneyTransaction