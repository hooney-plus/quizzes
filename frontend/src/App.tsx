import React, { useState } from 'react';
import { Player, QuizStats } from './types';
import { LoginScreen }    from './components/LoginScreen';
import { QuizScreen }     from './components/QuizScreen';
import { FinishedScreen } from './components/FinishedScreen';
import { Leaderboard }    from './components/Leaderboard';
import './index.css';

type Screen = 'login' | 'quiz' | 'finished' | 'leaderboard';

const EMPTY_STATS: QuizStats = { correct: 0, wrong: 0, timedOut: 0, streak: 0 };

export default function App() {
  const [screen, setScreen]   = useState<Screen>('login');
  const [player, setPlayer]   = useState<Player | null>(null);
  const [finalXp, setFinalXp] = useState(0);
  const [finalStats, setFinalStats] = useState<QuizStats>(EMPTY_STATS);

  const handleLogin  = (p: Player) => { setPlayer(p); setScreen('quiz'); };
  const handleFinish = (xp: number, stats: QuizStats) => {
    setFinalXp(xp);
    setFinalStats(stats);
    setScreen('finished');
  };
  const handleHome = () => { setPlayer(null); setScreen('login'); };

  return (
    <div className="app-shell">
      {screen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      {screen === 'quiz' && player && (
        <QuizScreen player={player} onFinish={handleFinish} />
      )}
      {screen === 'finished' && (
        <FinishedScreen
          xp={finalXp}
          playerName={player?.nickname ?? ''}
          stats={finalStats}
          onPlayAgain={() => setScreen('quiz')}
          onLeaderboard={() => setScreen('leaderboard')}
          onHome={handleHome}
        />
      )}
      {screen === 'leaderboard' && (
        <Leaderboard onBack={() => setScreen(player ? 'finished' : 'login')} />
      )}
    </div>
  );
}
