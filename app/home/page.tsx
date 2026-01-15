'use client';

import { useState } from 'react';
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  TextInput,
  MenuList,
  MenuListItem,
  Separator,
} from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

// Types for our windows
type ModuleType = 'finance' | 'goals' | 'reminders' | null;

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<ModuleType>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Module window state
  const [windowState, setWindowState] = useState<WindowState>({ x: 100, y: 50, width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Chat window state
  const [chatWindowState, setChatWindowState] = useState<WindowState>({ x: 400, y: 100, width: 350, height: 450 });
  const [isChatDragging, setIsChatDragging] = useState(false);
  const [isChatResizing, setIsChatResizing] = useState(false);
  const [chatDragOffset, setChatDragOffset] = useState({ x: 0, y: 0 });

  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Desktop icons configuration
  const desktopIcons = [
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' },
    { id: 'chat', label: 'Chat', icon: '💬' },
  ];

  // Handle opening a module
  const openModule = (module: string) => {
    if (module === 'chat') {
      setShowChat(true);
      return;
    }
    setActiveModule(module as ModuleType);
    setWindowState({ x: 100, y: 50, width: 600, height: 400 });
  };

  // Handle closing a module
  const closeModule = () => {
    setActiveModule(null);
  };

  // Module window dragging handlers
  const handleDragStart = (e: React.MouseEvent) => {
    if (isResizing) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Chat window dragging handlers
  const handleChatDragStart = (e: React.MouseEvent) => {
    if (isChatResizing) return;
    setIsChatDragging(true);
    setChatDragOffset({
      x: e.clientX - chatWindowState.x,
      y: e.clientY - chatWindowState.y,
    });
  };

  const handleChatResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChatResizing(true);
    setChatDragOffset({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Module window
    if (isDragging) {
      setWindowState(prev => ({
        ...prev,
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      }));
    }
    if (isResizing) {
      const deltaX = e.clientX - dragOffset.x;
      const deltaY = e.clientY - dragOffset.y;
      setWindowState(prev => ({
        ...prev,
        width: Math.max(300, prev.width + deltaX),
        height: Math.max(200, prev.height + deltaY),
      }));
      setDragOffset({ x: e.clientX, y: e.clientY });
    }

    // Chat window
    if (isChatDragging) {
      setChatWindowState(prev => ({
        ...prev,
        x: e.clientX - chatDragOffset.x,
        y: e.clientY - chatDragOffset.y,
      }));
    }
    if (isChatResizing) {
      const deltaX = e.clientX - chatDragOffset.x;
      const deltaY = e.clientY - chatDragOffset.y;
      setChatWindowState(prev => ({
        ...prev,
        width: Math.max(280, prev.width + deltaX),
        height: Math.max(300, prev.height + deltaY),
      }));
      setChatDragOffset({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsChatDragging(false);
    setIsChatResizing(false);
  };

  // Handle logout
  const handleLogout = () => {
    window.location.href = '/login';
  };

  // Handle chat send
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    // TODO: Add actual chat API call here
    setChatMessages(prev => [...prev, { role: 'assistant', content: 'This is a placeholder response. Chat API coming soon!' }]);
    setChatInput('');
  };

  // Get window title based on active module
  const getWindowTitle = () => {
    switch (activeModule) {
      case 'finance': return 'Finance';
      case 'goals': return 'Goals & Milestones';
      case 'reminders': return 'Reminders';
      default: return '';
    }
  };

  return (
    <ThemeProvider theme={original}>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#008080',
          backgroundImage: 'url(/wallpaper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Desktop Icons */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {desktopIcons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => openModule(icon.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: 8,
                width: 80,
              }}
            >
              <span style={{ fontSize: 40 }}>{icon.icon}</span>
              <span style={{
                color: 'white',
                textShadow: '1px 1px 2px black',
                fontSize: 12,
              }}>
                {icon.label}
              </span>
            </button>
          ))}
        </div>

        {/* Module Window */}
        {activeModule && (
          <div
            style={{
              position: 'absolute',
              left: windowState.x,
              top: windowState.y,
              zIndex: 10,
            }}
          >
            <Window style={{ width: windowState.width, height: windowState.height, display: 'flex', flexDirection: 'column' }}>
              <WindowHeader
                style={{
                  cursor: isDragging ? 'grabbing' : 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onMouseDown={handleDragStart}
              >
                <Button
                  size="sm"
                  style={{ marginRight: 8 }}
                  onClick={closeModule}
                >
                  ✕
                </Button>
                <span style={{ flex: 1 }}>{getWindowTitle()}</span>
              </WindowHeader>
              <WindowContent style={{ flex: 1, overflow: 'auto' }}>
                {activeModule === 'finance' && (
                  <div>
                    <p>Finance module content goes here...</p>
                  </div>
                )}
                {activeModule === 'goals' && (
                  <div>
                    <p>Goals & Milestones content goes here...</p>
                  </div>
                )}
                {activeModule === 'reminders' && (
                  <div>
                    <p>Reminders content goes here...</p>
                  </div>
                )}
              </WindowContent>
              {/* Resize Handle */}
              <div
                onMouseDown={handleResizeStart}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  cursor: 'se-resize',
                  background: 'linear-gradient(135deg, transparent 50%, #888 50%)',
                }}
              />
            </Window>
          </div>
        )}

        {/* Chat Window */}
        {showChat && (
          <div
            style={{
              position: 'absolute',
              left: chatWindowState.x,
              top: chatWindowState.y,
              zIndex: 15,
            }}
          >
            <Window style={{ width: chatWindowState.width, height: chatWindowState.height, display: 'flex', flexDirection: 'column' }}>
              <WindowHeader
                style={{
                  cursor: isChatDragging ? 'grabbing' : 'grab',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseDown={handleChatDragStart}
              >
                <Button
                  size="sm"
                  style={{ marginRight: 8 }}
                  onClick={() => setShowChat(false)}
                >
                  ✕
                </Button>
                <span style={{ flex: 1 }}>Chat Assistant</span>
              </WindowHeader>
              <WindowContent style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 8 }}>
                {/* Messages Area */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  marginBottom: 8,
                  padding: 8,
                  background: 'white',
                  border: '2px inset #bbb',
                }}>
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: 8,
                        padding: 8,
                        backgroundColor: msg.role === 'user' ? '#e3f2fd' : '#f5f5f5',
                        borderRadius: 4,
                      }}
                    >
                      <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
                      <p style={{ margin: '4px 0 0 0' }}>{msg.content}</p>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <TextInput
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Type a message..."
                    style={{ flex: 1 }}
                  />
                  <Button onClick={handleSendChat}>
                    Send
                  </Button>
                </div>
              </WindowContent>
              {/* Resize Handle */}
              <div
                onMouseDown={handleChatResizeStart}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  cursor: 'se-resize',
                  background: 'linear-gradient(135deg, transparent 50%, #888 50%)',
                }}
              />
            </Window>
          </div>
        )}

        {/* Bottom Left Avatar/User Menu */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 20,
        }}>
          {showUserMenu && (
            <div style={{ marginBottom: 8 }}>
              <MenuList>
                <MenuListItem onClick={() => alert('Settings coming soon!')}>
                  ⚙️ Settings
                </MenuListItem>
                <Separator />
                <MenuListItem onClick={handleLogout}>
                  🚪 Logout
                </MenuListItem>
              </MenuList>
            </div>
          )}
          <Button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ padding: 8 }}
          >
            <span style={{ fontSize: 24 }}>👤</span>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
