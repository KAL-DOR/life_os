'use client';

import { useState } from 'react';
import {
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
  Button,
} from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // This calls YOUR API route - you need to build it
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, pin }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to home after successful login
        window.location.href = '/home';
      } else {
        setError(data.message || 'Invalid PIN');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={original}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#008080', // Classic teal background
      }}>
        <Window style={{ width: 320 }}>
          <WindowHeader>
            <span>Login - Life Dashboard</span>
          </WindowHeader>
          <WindowContent>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>
                  Username:
                </label>
                <TextInput
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  fullWidth
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>
                  PIN:
                </label>
                <TextInput
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="****"
                  fullWidth
                />
              </div>

              {error && (
                <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading || !username || !pin}
                fullWidth
              >
                {loading ? 'Verifying...' : 'Login'}
              </Button>
            </form>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}
