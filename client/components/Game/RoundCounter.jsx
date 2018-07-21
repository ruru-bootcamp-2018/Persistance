import React from 'react'

const RoundCounter = props => {
    const {number, round_num} = props
    console.log(round_num)
    return (
        <div>
            <p className={number === round_num ? "glow is-size-3 column" : " column is-size-3" }>{number}</p>
        </div>
    )
}

export default RoundCounter
