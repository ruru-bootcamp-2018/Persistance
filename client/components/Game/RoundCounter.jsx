import React from 'react'

const RoundCounter = props => {
    const {number, round_num} = props
    return(
        <div>
            <p className={number === round_num ? "cake button-glow is-size-3 column" : " column is-size-3" }>{number}</p>
        </div>
    ) 
}

export default RoundCounter
