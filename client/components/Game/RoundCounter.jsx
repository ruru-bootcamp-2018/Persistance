import React from 'react';

const RoundCounter = props => {
    const { number, round_num } = props;
    return (
        <div className="RoundContainer">
            <div>
                <p
                    className={
                        number === round_num
                            ? 'cake is-size-2 column has-text-white'
                            : 'column is-size-2 has-text-white'
                    }
                >
                    {number}
                </p>
            </div>
        </div>
    );
};

export default RoundCounter;
