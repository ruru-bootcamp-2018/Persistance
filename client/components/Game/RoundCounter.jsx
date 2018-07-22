import React from 'react'

const RoundCounter = props => {
    const {number, round_num} = props
    return(
        <div>
            <p className={number === round_num ? "cake is-size-2 column has-text-black" : "column is-size-2 has-text-black" }>{number}</p>
        </div>
    )
}

export default RoundCounter
