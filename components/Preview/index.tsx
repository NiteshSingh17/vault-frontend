'use client';

import { FutureGoal, Image, Media, MediaTypes, NewIdea, Video } from '@/schema';
import { getMediaURL } from '@/utils';
import { Modal } from '@mantine/core';
import TinyEditor from '../Editor';
import { PreviewImage } from './PreviewImage';
import { PreviewMilestone } from './PreviewMilestone';
import { PreviewVideo } from './PreviewVideo';

export interface PreviewModalProps {
  opened: boolean;
  onClose: () => void;
  media: Media;
}

export function PreviewModal({ opened, onClose, media }: PreviewModalProps): JSX.Element {
  const uiDictionary: Record<MediaTypes, JSX.Element | undefined> = {
    [MediaTypes.Image]: (
      <PreviewImage url={getMediaURL((media.content as Image | undefined)?.url ?? '')} />
    ),
    [MediaTypes.Video]: (
      <PreviewVideo url={getMediaURL((media.content as Video | undefined)?.url ?? '')} />
    ),
    [MediaTypes.Credential]: <div />,
    [MediaTypes.FutureGoal]: (
      <TinyEditor initialValue={(media.content as FutureGoal | undefined)?.htmlContent} preview />
    ),
    [MediaTypes.Milestone]: <PreviewMilestone mediaData={media} />,
    [MediaTypes.NewIdea]: (
      <TinyEditor initialValue={(media.content as NewIdea | undefined)?.htmlContent} preview />
    ),
    [MediaTypes.OngoingProject]: <div />,
    [MediaTypes.Url]: <div />,
    [MediaTypes.CompanyGrowth]: <div />,
  };

  const modalSize = media.type === MediaTypes.Milestone ? 'sm' : 'xl';

  return (
    <Modal size={modalSize} opened={opened} onClose={onClose}>
      {uiDictionary[media.type]}
    </Modal>
  );
}
