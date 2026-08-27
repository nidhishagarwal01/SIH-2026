import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NavigationContext = createContext(null);

/**
 * 🧭 Bulletproof Client-Side Navigation Stack & History Manager
 * Syncs seamlessly with browser history (popstate), hash routing (#landing, #portal, #studio),
 * and supports reliable Back button navigation across direct URL loads and app workflows.
 */
export function NavigationProvider({ children, defaultView = 'landing', onViewChange, onSiteChange, onTabChange }) {
  const parseHash = () => {
    if (typeof window === 'undefined') return { view: defaultView, site: 0, tab: 'twin' };
    const rawHash = window.location.hash.replace('#', '') || defaultView;
    const viewPart = rawHash.split('?')[0];
    const validView = ['landing', 'portal', 'studio'].includes(viewPart) ? viewPart : defaultView;
    const siteMatch = rawHash.match(/site=(\d+)/);
    const site = siteMatch ? parseInt(siteMatch[1], 10) : 0;
    const tabMatch = rawHash.match(/tab=([a-zA-Z0-9_-]+)/);
    const tab = tabMatch ? tabMatch[1] : 'twin';
    return { view: validView, site, tab };
  };

  const [historyStack, setHistoryStack] = useState(() => [parseHash()]);

  const currentEntry = historyStack[historyStack.length - 1] || { view: defaultView, site: 0, tab: 'twin' };

  // Notify parent components on state changes
  useEffect(() => {
    if (onViewChange && currentEntry.view) onViewChange(currentEntry.view);
    if (onSiteChange && currentEntry.site !== undefined) onSiteChange(currentEntry.site);
    if (onTabChange && currentEntry.tab) onTabChange(currentEntry.tab);
  }, [currentEntry, onViewChange, onSiteChange, onTabChange]);

  // 🚀 Push State: Navigate to a new view
  const navigateTo = useCallback((view, options = {}) => {
    const nextEntry = {
      view,
      site: options.site !== undefined ? options.site : currentEntry.site || 0,
      tab: options.tab || currentEntry.tab || 'twin'
    };

    if (
      currentEntry.view === nextEntry.view &&
      currentEntry.site === nextEntry.site &&
      currentEntry.tab === nextEntry.tab
    ) {
      return;
    }

    setHistoryStack(prev => [...prev, nextEntry]);

    const hash = `#${view}${nextEntry.site ? `?site=${nextEntry.site}` : ''}${nextEntry.tab !== 'twin' ? `&tab=${nextEntry.tab}` : ''}`;
    try {
      window.history.pushState(nextEntry, '', hash);
    } catch (e) {
      console.warn('History pushState error:', e);
    }
  }, [currentEntry]);

  // 🔙 Pop State: Go back reliably to previous page
  const goBack = useCallback(() => {
    if (window.history.length > 1 && historyStack.length > 1) {
      window.history.back();
    } else {
      // Deterministic hierarchical fallback when browser history or stack is empty
      if (currentEntry.view === 'studio') {
        navigateTo('portal');
      } else if (currentEntry.view === 'portal') {
        navigateTo('landing');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [historyStack.length, currentEntry.view, navigateTo]);

  // Initial State Setup
  useEffect(() => {
    try {
      const initial = parseHash();
      window.history.replaceState(initial, '', `#${initial.view}${initial.site ? `?site=${initial.site}` : ''}`);
    } catch (e) {}
  }, []);

  // 🔄 Native Browser Back / Forward Button Handler
  useEffect(() => {
    const handlePopState = (event) => {
      const targetState = event.state && event.state.view ? event.state : parseHash();
      setHistoryStack(prev => {
        if (prev.length > 1 && prev[prev.length - 2]?.view === targetState.view) {
          return prev.slice(0, -1);
        }
        return [...prev, targetState];
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const canGoBack = currentEntry.view !== 'landing' || historyStack.length > 1;

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
    return {
      currentView: 'landing',
      currentSite: 0,
      currentTab: 'twin',
      canGoBack: true,
      historyStack: [{ view: 'landing', site: 0, tab: 'twin' }],
      navigateTo: () => {},
      goBack: () => {}
    };
  }
  return context;
}
