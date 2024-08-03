import { Tooltip, TooltipProps } from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';

export function WithTooltip({
  label,
  children,
  ...rest
}: PropsWithChildren & TooltipProps & { label?: string | null }): ReactNode {
  return typeof label === 'string' && label.length > 0 ? (
    <Tooltip label={label} {...rest}>
      {children}
    </Tooltip>
  ) : (
    children
  );
}
