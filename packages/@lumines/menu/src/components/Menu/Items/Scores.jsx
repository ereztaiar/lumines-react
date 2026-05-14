import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import MenuItem from '@lumines/menu/src/components/Menu/MenuItem';
import { getLeaderboard } from 'Util/leaderboard';
import scoresStyle from '@lumines/menu/src/styles/scores.less';

const Scores = props => {
    const { selected } = props;
    const entries = getLeaderboard();

    return (
        <MenuItem icon={<FaTrophy size={80} />} color={"#b8860b"} active={selected}>
            <section>
                <table className={scoresStyle.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </MenuItem>
    );
};

export default Scores;
