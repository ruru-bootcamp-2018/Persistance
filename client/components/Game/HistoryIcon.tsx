import React from 'react';
import { Tooltip } from 'react-tippy';
import History from './History';
import * as CSS from 'csstype';

const style: CSS.Properties = {
    ['marginTop' as any]: '-2vw',
    ['zIndex' as any]: '1',
    ['float' as any]: 'right'
  };

const HistoryIcon = () => {
    return (
        <Tooltip
            position="right"
            trigger="click"
            useContext={true}
            html={
                <div className="myDiv container">
                    {' '}
                    <History />{' '}
                </div>
            }
        >
            <img
                style={style}
                className="image is-32x32"
                src="/book-solid.svg"
            />
        </Tooltip>
    );
}

export default HistoryIcon;
