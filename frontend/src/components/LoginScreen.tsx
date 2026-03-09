import React, { useState } from 'react';
import { createPlayer } from '../services/api';
import { Player } from '../types';

interface Props {
  onLogin: (player: Player) => void;
  onLeaderboard: () => void;
}

export function LoginScreen({ onLogin, onLeaderboard }: Props) {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    setLoading(true);
    setError('');
    try {
      const player = await createPlayer(nickname.trim());
      onLogin(player);
    } catch {
      setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card anim-fadeup" style={{ width: '100%', maxWidth: '400px', padding: '40px 32px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌍</div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '6px' }}>
          GeoQuiz
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Perguntas sobre países e continentes
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          className="input"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Como quer ser chamado?"
          maxLength={20}
          autoFocus
          autoComplete="off"
        />
        {error && (
          <p style={{ fontSize: '13px', color: 'var(--error)', padding: '10px 12px', background: 'var(--error-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--error-border)' }}>
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading || !nickname.trim()}>
          {loading ? <span className="anim-spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} /> : 'Começar Quiz'}
        </button>
      </form>

      {/* Divider */}
      <div className="divider" />

      {/* Rules */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <div className="tag tag-success" style={{ flex: 1, justifyContent: 'center' }}>Acerto +50 XP</div>
        <div className="tag tag-error"   style={{ flex: 1, justifyContent: 'center' }}>Erro −15 XP</div>
      </div>

      <button className="btn btn-ghost" onClick={onLeaderboard}>
        Ver ranking global
      </button>
    </div>
  );
}
