'use client';

export interface PreviewVideoProps {
  url: string;
}

export function PreviewVideo({ url }: PreviewVideoProps): JSX.Element {
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video style={{ width: '100%' }} controls src={url} />;
}
