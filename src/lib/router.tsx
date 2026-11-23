import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  navigate: () => {}
});

function normalizePath(raw: string): string {
  if (!raw) return '/';
  const withoutHash = raw.split('#')[0] || '/';
  if (withoutHash.length > 1 && withoutHash.endsWith('/')) {
    return withoutHash.slice(0, -1);
  }
  return withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
}

function readInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  const p = normalizePath(window.location.pathname);
  if (
    p === '/' ||
    p === '/executive-coaching' ||
    p === '/mastermind-groups' ||
    p === '/about' ||
    p === '/insights' ||
    p.startsWith('/insights/')
  ) {
    return p;
  }
  return '/';
}

function scrollToAnchor(id: string, attempts = 0) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  } else if (attempts < 12) {
    requestAnimationFrame(() => scrollToAnchor(id, attempts + 1));
  }
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(readInitialPath);

  useEffect(() => {
    const onPopState = () => {
      setPathname(readInitialPath());
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) requestAnimationFrame(() => scrollToAnchor(hash));
      else window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) requestAnimationFrame(() => scrollToAnchor(hash));
  }, [pathname]);

  const navigate = useCallback((to: string) => {
    const [rawPath, hashPart] = to.split('#');
    const nextPath = rawPath ? normalizePath(rawPath) : pathname;

    try {
      const nextUrl = hashPart ? `${nextPath}#${hashPart}` : nextPath;
      if (window.location.protocol !== 'file:') {
        window.history.pushState({}, '', nextUrl);
      }
    } catch {
      // Safe fallback in restricted iframe environments
    }

    setPathname(nextPath);

    if (hashPart) {
      requestAnimationFrame(() => scrollToAnchor(decodeURIComponent(hashPart)));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const AppLink: React.FC<LinkProps> = ({ href, onClick, children, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      navigate(href);
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
