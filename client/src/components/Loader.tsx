import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loader = () => {
  return (
    <div className='center'>
        <FontAwesomeIcon 
            className="fa-solid fa-spin" 
            icon={faSpinner}
            style={{ height: 80}} />
    </div>
  )
}

export default Loader