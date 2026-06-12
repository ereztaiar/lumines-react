import React from 'react';
import { getLeaderboard } from 'Util/leaderboard';
import scoresStyle from '@lumines/menu/src/styles/scores.less';

const ScoresContent = (props) => {
    const {} = props;

    const entries = getLeaderboard();

    return (
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
    );
};

export default ScoresContent;
