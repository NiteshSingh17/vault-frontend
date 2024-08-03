'use client';

import { Routes } from '@/api';
import { useUpdateFile } from '@/api/hook';
import { Media, Milestone } from '@/schema';
import { Box, Stack, Stepper, StepperProps, Text } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FaCircleCheck } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import classes from './previewMilieston.module.css';

export function PreviewMilestone({ mediaData }: { mediaData: Media }) {
  const queryClient = useQueryClient();
  const { mutate: updateMedia, isPending: isUpdatingMedia } = useUpdateFile({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Routes.GetFile],
      });
    },
  });

  const data = mediaData.content as Milestone;

  const handleUpdateCurrentStep: StepperProps['onStepClick'] = (stepIndex) => {
    const newStep = data.currentStep === stepIndex + 1 ? stepIndex : stepIndex + 1;
    updateMedia({ params: { content: { ...data, currentStep: newStep } }, id: mediaData._id });
  };

  return (
    <Stepper
      mt={10}
      w="100%"
      size="sm"
      active={data.currentStep ?? 0}
      onStepClick={handleUpdateCurrentStep}
      orientation="vertical"
    >
      {data.steps.map((step, stepIndex) => (
        <Stepper.Step
          w="100%"
          disabled={isUpdatingMedia}
          icon={
            stepIndex === data.currentStep ? (
              <GoDotFill />
            ) : stepIndex < data.currentStep ? (
              <FaCircleCheck />
            ) : null
          }
          label={step.title}
          description={
            <>
              <Stack mt={6}>
                <Text size="xs">
                  {typeof step.date === 'string' && step.date.length > 0
                    ? dayjs(step.date).format('DD MMM, YY')
                    : null}
                  {typeof step.description === 'string' ? (
                    <Box py={12} className={classes.description}>
                      <Text style={{ whiteSpace: 'pre' }}>{step.description}</Text>
                    </Box>
                  ) : null}
                </Text>
              </Stack>
            </>
          }
        />
      ))}
    </Stepper>
  );
}
