'use client';

import type { CSSProperties, ReactNode } from 'react';
import { DOWNLOAD_URL } from '../lib/constants';
import { trackDownloadClicked } from '../lib/analytics';

export default function DownloadButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <a
      href={DOWNLOAD_URL}
      onClick={() => trackDownloadClicked('download_section')}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
