import dayjs from 'dayjs';
import { AriaRole, KeyboardEventHandler, MouseEvent, MouseEventHandler } from 'react';
import { getApiBaseUrl } from './api';

export function getDateFromISOString(isoDate: string | null | undefined) {
  return typeof isoDate === 'string' ? dayjs(isoDate).format('YYYY-MM-DD') : '';
}

interface AccessibleOnClickProps {
  role: AriaRole;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
}

// Ref: https://dev.to/receter/easy-accessible-click-handlers-4jkb
export function accessibleOnClick(
  handler?: MouseEventHandler<HTMLElement>,
  tabIndex?: number
): AccessibleOnClickProps {
  return {
    role: 'button',
    tabIndex: tabIndex ?? 0,
    onKeyDown: (event) => {
      // e.keyCode is deprecated so we are using e.key
      if (event.key === 'Enter') {
        handler?.(event as unknown as MouseEvent<HTMLElement>);
      }
    },
    onClick: handler,
  };
}

export function getMediaURL(url: string) {
  return getApiBaseUrl() + url;
}
