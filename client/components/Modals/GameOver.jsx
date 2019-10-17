import React from 'react';
import { connect } from 'react-redux';

import { Tooltip } from 'react-tippy';

const roundStyleObj = {
    borderRadius: '50%',
    height: '120px',
    width: '120px',
};

class GameOver extends React.Component {
    render() {
        const { players, gameStage } = this.props.currentGame;
        const message =
            gameStage == 'goodWin'
                ? 'The Resistance has won! The Spies could not sabotage them.'
                : 'The Spies have won! They have sabotaged the Resistance.';
        const isRole = check => ({ role }) => role == check;
        const goodies = players.filter(isRole('good'));

        return (
            <div className="modal is-active is-dark">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head modal-color">
                        <p className="modal-card-title">Game Over</p>
                        <button
                            className="delete"
                            onClick={this.props.hideModal}
                            aria-label="close"
                        ></button>
                    </header>
                    <section className="modal-card-body modal-color">
                        <div className="is-size-3 title">{message}</div>
                        <div className="columns">
                            <div className="column is-three-fifths card modal-color">
                                <div className="card-content">
                                    <div className="title">The Loyalists:</div>
                                    <hr />
                                    <div className="columns is-multiline modal-color">
                                        {goodies.map((goody, i) => (
                                            <div
                                                className={`column is-${
                                                    goodies.length % 2 == 1 &&
                                                    i == goodies.length - 1
                                                        ? '12'
                                                        : '6'
                                                }`}
                                            >
                                                <Tooltip
                                                    // options
                                                    position="bottom"
                                                    trigger="mouseenter"
                                                    html={
                                                        <h1>
                                                            {goody.display_name ||
                                                                goody.user_name}{' '}
                                                            - Loyalist
                                                        </h1>
                                                    }
                                                >
                                                    <img
                                                        style={roundStyleObj}
                                                        src={goody.img}
                                                    />
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card column is-two-fifths modal-color">
                                <div className="card-content">
                                    <div className="title">The Spies:</div>
                                    <hr />
                                    <div className="columns is-multiline modal-color">
                                        {players
                                            .filter(isRole('spy'))
                                            .map(spy => (
                                                <div className="column is-12">
                                                    <Tooltip
                                                        // options
                                                        position="bottom"
                                                        trigger="mouseenter"
                                                        html={
                                                            <h1>
                                                                {spy.display_name ||
                                                                    spy.user_name}{' '}
                                                                - Spy
                                                            </h1>
                                                        }
                                                    >
                                                        <img
                                                            className="spy-glow"
                                                            style={
                                                                roundStyleObj
                                                            }
                                                            src={spy.img}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot modal-color">
                        <button
                            className="button is-fullwidth is-dark"
                            onClick={this.props.hideModal}
                        >
                            Hide
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(GameOver);
