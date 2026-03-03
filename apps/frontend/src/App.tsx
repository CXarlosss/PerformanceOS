import { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { AuthScreen } from './features/auth/components/AuthScreen';
import { PerformanceDashboard } from './features/analytics/components/PerformanceDashboard';
import { useCurrentProgram } from './features/training/hooks/useTrainingData';
import { CoachDashboard } from './features/coach/pages/CoachDashboard';
import { TemplateBuilderPage } from './features/coach/template-builder/TemplateBuilderPage';
import { TrainingExcelPage } from './features/training/excel-view/TrainingExcelPage';

function App() {
  const { isAuthenticated, initialize: initializeAuth, logout, user } = useAuthStore();
  const { isLoading: loadingProgram } = useCurrentProgram();
  const [coachView, setCoachView] = useState<'dashboard' | 'builder'>('dashboard');

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isAuthenticated) return <AuthScreen />;

  // 🛡️ COACH PORTAL VIEW
  if (user?.role === 'ADMIN') {
    return (
      <div className="container app-wrapper" style={{ maxWidth: coachView === 'builder' ? '100vw' : '1200px', margin: coachView === 'builder' ? '0' : '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: coachView === 'builder' ? '20px 40px' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <h1 style={{ fontSize: '32px', letterSpacing: '-0.04em', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>Performance<span style={{ color: '#0f172a' }}>OS</span> <span style={{ fontSize: '12px', background: '#0f172a', color: 'white', padding: '4px 8px', borderRadius: '8px', verticalAlign: 'middle', marginLeft: '12px', letterSpacing: '0.05em' }}>COACH HUB</span></h1>

            <nav style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '14px' }}>
              <button
                onClick={() => setCoachView('dashboard')}
                style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '13px', background: coachView === 'dashboard' ? 'white' : 'transparent', color: coachView === 'dashboard' ? 'var(--primary)' : '#64748b', cursor: 'pointer', boxShadow: coachView === 'dashboard' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
              >
                Escritorio
              </button>
              <button
                onClick={() => setCoachView('builder')}
                style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '13px', background: coachView === 'builder' ? 'white' : 'transparent', color: coachView === 'builder' ? 'var(--primary)' : '#64748b', cursor: 'pointer', boxShadow: coachView === 'builder' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
              >
                Templates
              </button>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>{user?.email}</p>
              <button
                onClick={logout}
                style={{ background: 'none', border: 'none', fontSize: '11px', color: '#ef4444', padding: 0, cursor: 'pointer', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                Cerrar Sesión
              </button>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', boxShadow: '0 4px 12px rgba(62, 237, 137, 0.3)' }}>
              {user?.email[0].toUpperCase()}
            </div>
          </div>
        </header>

        {coachView === 'dashboard' ? <CoachDashboard /> : <TemplateBuilderPage />}
      </div>
    );
  }

  // 🏃 ATHLETE VIEW (Oscar)
  return (
    <div className="container app-wrapper" style={{ maxWidth: '1440px' }}>
      {/* 🏙️ HEADER ATHLETE */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', letterSpacing: '-0.04em', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>Performance<span style={{ color: '#0f172a' }}>OS</span></h1>
          <p style={{ color: '#64748b', fontSize: '12px', fontWeight: '900', letterSpacing: '0.1em', marginTop: '4px' }}>
            MODO PERFORMANCE • VERSIÓN 1.0 REAL
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>{user?.email}</p>
            <button
              onClick={logout}
              style={{ background: 'none', border: 'none', fontSize: '11px', color: '#ef4444', padding: 0, cursor: 'pointer', fontWeight: '900', textTransform: 'uppercase' }}
            >
              Cerrar Sesión
            </button>
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px' }}>
            {user?.email[0].toUpperCase()}
          </div>
        </div>
      </header>

      {/* 🏙️ MAIN APP CONTENT */}
      {loadingProgram ? (
        <div style={{ padding: '120px 0', textAlign: 'center', opacity: 0.8 }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', fontWeight: '900', color: '#64748b' }}>SINCRONIZANDO WORKSPACE...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', alignItems: 'start' }}>
          {/* LEFT: PERFORMANCE EXCEL GRID */}
          <main style={{ minWidth: 0 }}>
            <TrainingExcelPage />
          </main>

          {/* RIGHT: REAL-TIME ANALYTICS */}
          <aside style={{ position: 'sticky', top: '24px' }}>
            <PerformanceDashboard />
          </aside>
        </div>
      )}

      <div style={{ marginTop: '64px', borderTop: '1px solid #e2e8f0', paddingTop: '24px', fontSize: '10px', color: '#94a3b8', textAlign: 'center', fontWeight: 'bold', letterSpacing: '0.05em' }}>
        SISTEMA DE ALTO RENDIMIENTO • BACKEND: NESTJS • DATABASE: POSTGRESQL • AUTH: JWT SECURED
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        body { background-color: #f8fafc; }
        .app-wrapper { padding: 40px 60px; }
      `}</style>
    </div>
  );
}

export default App;
