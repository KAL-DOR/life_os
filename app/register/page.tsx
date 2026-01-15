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

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate PINs match
    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    // Validate PIN length
    if (pin.length < 4) {
      setError('PIN must be at least 4 characters');
      return;
    }

    setLoading(true);

    try {
      // This calls YOUR API route - you need to build it
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, pin }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ThemeProvider theme={original}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#008080',
        }}>
          <Window style={{ width: 320 }}>
            <WindowHeader>
              <span>Success!</span>
            </WindowHeader>
            <WindowContent>
              <p style={{ marginBottom: 16 }}>Account created successfully!</p>
              <Button fullWidth onClick={() => window.location.href = '/login'}>
                Go to Login
              </Button>
            </WindowContent>
          </Window>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={original}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#008080',
      }}>
        <Window style={{ width: 320 }}>
          <WindowHeader>
            <span>Register - Life Dashboard</span>
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

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>
                  Email (optional):
                </label>
                <TextInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  fullWidth
                />
              </div>

              <div style={{ marginBottom: 12 }}>
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

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>
                  Confirm PIN:
                </label>
                <TextInput
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="****"
                  fullWidth
                />
              </div>

              {error && (
                <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading || !username || !pin || !confirmPin}
                fullWidth
              >
                {loading ? 'Creating...' : 'Create Account'}
              </Button>
            </form>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}
