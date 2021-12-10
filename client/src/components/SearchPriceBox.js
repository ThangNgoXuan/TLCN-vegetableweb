import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchPriceBox = ({ getFilterUrl }) => {
  const styles = {
    height: '34px',
    width: '60%',
    backgroundColor: '#fcfcfc',
    border: 'solid 1px #ccc',
    marginTop: '5px'
  }
  const apply = {
    padding: '20px',
    height: '30px',
    width: '100%',
    backgroundColor: '#024137',
    color: '#fff'
  }

  const [min, setMin] = useState(0)
  const [max, setmax] = useState(0)

  return (
    <div>
      <div className="catalog__filter__widget">
        <div className="catalog__filter__widget__title">
          Khoảng Giá
        </div>
        <input style={styles} placeholder="Từ" type="number"
          onChange={(e) => setMin(+(e.target.value))}
        ></input>
        <input style={styles} placeholder="Đến" type="number"
          onChange={(e) => setmax(+(e.target.value))}
        ></input>
      </div>
      <Link
        to={getFilterUrl({ min: min, max: max })}
        style={apply}
      >
        Áp dụng
      </Link>
    </div>
  )
}

export default SearchPriceBox;
