'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PAGE_TRANSITION_COVER_MS, PAGE_TRANSITION_EVENT } from './PageTransition';

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function getHrefString(href) {
  if (typeof href === 'string') {
    return href;
  }

  if (href?.pathname) {
    const query = href.query ? `?${new URLSearchParams(href.query).toString()}` : '';
    const hash = href.hash ? `#${href.hash}` : '';
    return `${href.pathname}${query}${hash}`;
  }

  return '';
}

function isInternalHref(href) {
  return href.startsWith('/') && !href.startsWith('//');
}

const TransitionLink = ({ href, onClick, target, replace = false, scroll, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const hrefString = getHrefString(href);

  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      target === '_blank' ||
      !isInternalHref(hrefString)
    ) {
      return;
    }

    const nextPath = hrefString.split(/[?#]/)[0] || '/';

    if (nextPath === pathname && !hrefString.includes('#')) {
      return;
    }

    event.preventDefault();
    if (typeof window.__totStartPageTransition === 'function') {
      window.__totStartPageTransition();
    } else {
      window.dispatchEvent(new CustomEvent(PAGE_TRANSITION_EVENT));
    }

    window.setTimeout(() => {
      if (replace) {
        router.replace(hrefString, { scroll });
      } else {
        router.push(hrefString, { scroll });
      }
    }, PAGE_TRANSITION_COVER_MS);
  };

  return (
    <Link
      href={href}
      target={target}
      replace={replace}
      scroll={scroll}
      onClick={handleClick}
      {...props}
    />
  );
};

export default TransitionLink;
