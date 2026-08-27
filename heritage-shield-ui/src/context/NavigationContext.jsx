import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NavigationContext = createContext(null);

/**
 * 🧭 Client-Side Navigation Stack & History Manager
 * Implements a Stack data structure for seamless LIFO navigation flow,
 * synchronized with browser window.history (popstate) & hash routing.
 */
export function NavigationProvider({ children, defaultView = 'landing', onViewChange, onSiteChange, onTabChange }) {
  // Stack Data Structure: array of navigation entries [{ view: 'landing', site: 0, tab: 'twin' }]
  const [historyStack, setHistoryStack] = useState(() => {
    const rawHash = (typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '') || defaultView;
    const viewPart = rawHash.split('?')[0];
    const validView = ['landing', 'portal', 'studio'].includes(viewPart) ? viewPart : defaultView;
    const siteMatch = rawHash.match(/site=(\d+)/);
    const site = siteMatch ? parseInt(siteMatch[1], 10) : 0;
    const tabMatch = rawHash.match(/tab=([a-zA-Z0-9_-]+)/);
    const tab = tabMatch ? tabMatch[1] : 'twin';
    return [{ view: validView, site, tab }];
  });

  const currentEntry = historyStack[historyStack.length - 1] || { view: defaultView, site: 0, tab: 'twin' };

  // Sync state upward to App.jsx if callbacks provided
  useEffect(() => {
    if (onViewChange && currentEntry.view) onViewChange(currentEntry.view);
    if (onSiteChange && currentEntry.site !== undefined) onSiteChange(currentEntry.site);
    if (onTabChange && currentEntry.tab) onTabChange(currentEntry.tab);
  }, [currentEntry, onViewChange, onSiteChange, onTabChange]);

  // 🚀 Push Operation: Navigate to a new page/view and push onto stack
  const navigateTo = useCallback((view, options = {}) => {
    const nextEntry = {
      view,
      site: options.site !== undefined ? options.site : currentEntry.site || 0,
      tab: options.tab || currentEntry.tab || 'twin'
    };

    // Prevent duplicate consecutive pushes of identical view state
    if (
      currentEntry.view === nextEntry.view &&
      currentEntry.site === nextEntry.site &&
      currentEntry.tab === nextEntry.tab
    ) {
      return;
    }

    setHistoryStack(prev => [...prev, nextEntry]);

    // Synchronize browser history and hash URL
    const hash = `#${view}${nextEntry.site ? `?site=${nextEntry.site}` : ''}`;
    try {
      window.history.pushState(nextEntry, '', hash);
    } catch (e) {
      console.warn('History pushState error:', e);
    }
  }, [currentEntry]);

  // 🔙 Pop Operation: Go back to previous page in history stack (LIFO)
  const goBack = useCallback(() => {
    if (historyStack.length > 1) {
      setHistoryStack(prev => {
        const next = [...prev];
        next.pop();
        return next;
      });

      try {
        window.history.back();
      } catch (e) {
        console.warn('History back error:', e);
      }
    } else {
      // Fallback to landing page if at root of stack
      const rootEntry = { view: 'landing', site: 0, tab: 'twin' };
      setHistoryStack([rootEntry]);
      try {
        window.history.pushState(rootEntry, '', '#landing');
      } catch (e) {}
    }
  }, [historyStack.length]);

  // Replace initial state so browser history knows the root page state
  useEffect(() => {
    try {
      window.history.replaceState(currentEntry, '', `#${currentEntry.view}`);
    } catch (e) {}
  }, []);

  // 🔄 Browser Back / Forward Button Interception (popstate event)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        const popped = event.state;
        setHistoryStack(prev => {
          if (prev.length > 1) {
            return prev.slice(0, -1);
          }
          return [{ view: popped.view, site: popped.site || 0, tab: popped.tab || 'twin' }];
        });
      } else {
        const rawHash = (typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '') || 'landing';
        const viewPart = rawHash.split('?')[0];
        const validView = ['landing', 'portal', 'studio'].includes(viewPart) ? viewPart : 'landing';
        const siteMatch = rawHash.match(/site=(\d+)/);
        const site = siteMatch ? parseInt(siteMatch[1], 10) : 0;
        const tabMatch = rawHash.match(/tab=([a-zA-Z0-9_-]+)/);
        const tab = tabMatch ? tabMatch[1] : 'twin';
        setHistoryStack(prev => {
          if (prev.length > 1) {
            return prev.slice(0, -1);
          }
          return [{ view: validView, site, tab }];
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const canGoBack = historyStack.length > 1;

  return (
    <NavigationContext.Provider
      value={{
        currentView: currentEntry.view,
        currentSite: currentEntry.site,
        currentTab: currentEntry.tab,
        canGoBack,
        historyStack,
        navigateTo,
        goBack
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    // Fallback safe dummy implementation if called outside provider
    return {
      currentView: 'landing',
      currentSite: 0,
      currentTab: 'twin',
      canGoBack: false,
      historyStack: ['landing'],
      navigateTo: () => {},
      goBack: () => {}
    };
  }
  return context;
}
