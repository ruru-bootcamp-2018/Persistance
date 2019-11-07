import React from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

import ChoiceButtons from './ChoiceButtons';
import IntentionButtons from './IntentionButtons';
import ConfirmNom from './ConfirmNom';
import { AppState } from '../../reducers';

const Buttons = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const authId = useSelector(state => state.auth.user.id);
	const isLeader = useSelector(state => state.currentGame.currentRound.leader_id == authId);
	const gameStage = useSelector(state => state.currentGame.gameStage);
	const { round_num } = useSelector(state => state.currentGame.currentRound);
	const { mission_num } = useSelector(state => state.currentGame.currentMission);

	const noms = useSelector(state => state.currentGame.missions[mission_num - 1].rounds[round_num - 1].nominations);
	const reqNoms = useSelector(state => state.missionParams[mission_num - 1].team_total);
	const allNoms = reqNoms === noms.length;
	const intentions = useSelector(state => state.currentGame.missions[mission_num - 1].intentions);
	const onTeam = noms.reduce((acc: boolean, nom: { user_id: number }) => {
		if (nom.user_id === authId) return true;
		else return acc;
	}, false);

	return (
		<div>
			{gameStage === 'voting' && <ChoiceButtons />}
			{onTeam && gameStage ==='intentions' && intentions.length < 0 && <IntentionButtons />}
			{gameStage === 'nominating' && isLeader && allNoms && <ConfirmNom />}
		</div>
	);
};

export default Buttons;
