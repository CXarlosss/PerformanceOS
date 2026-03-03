import React, { useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { apiClient } from '../../../api/apiClient';

export const AuthScreen: React.FC = () => {
    const [email, setEmail] = useState('oscar@performanceos.com');
    const [password, setPassword] = useState('oscar123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setAuth } = useAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await apiClient.post('/auth/login', { email, password });
            setAuth(data.user, data.access_token);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error de conexión con el backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
                <header style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ color: 'var(--primary)', letterSpacing: '-0.04em' }}>PerformanceOS</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Entra en tu entorno de alto rendimiento</p>
                </header>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%' }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Contraseña</label>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%' }}
                            required
                        />
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center' }}>{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', height: '48px', marginTop: '12px' }}
                        disabled={loading}
                    >
                        {loading ? 'Sincronizando...' : 'Iniciar Sesión'}
                    </button>

                    <p style={{ fontSize: '12px', textAlign: 'center', color: '#94a3b8' }}>
                        Acceso de prueba: oscar@performanceos.com / oscar123
                    </p>
                </form>
            </div>
        </div>
    );
};
