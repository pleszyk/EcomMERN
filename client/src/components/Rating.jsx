import { FaStar, FaStarHalf } from 'react-icons/fa';
import PropTypes from 'prop-types'

function Rating({ value, text }) {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalf /> : ''}
      </span>
      <span>
        {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalf /> : ''}
      </span>
      <span>
        {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalf /> : ''}
      </span>
      <span>
        {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalf /> : ''}
      </span>
      <span>
        {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalf /> : ''}
      </span>
      <span > {text && text}</span>
    </div>
  );
}

Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string.isRequired
}


export default Rating;
