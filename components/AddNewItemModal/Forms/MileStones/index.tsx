'use client';

import { CreateMediaPayload } from '@/api/payload';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { accessibleOnClick } from '@/utils';
import {
  Button,
  Stack,
  Stepper,
  StepperProps,
  TextInput,
  TextInputProps,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import { MouseEventHandler } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import {
  CreateMilestoneForm,
  CreateMilestoneFormLabel,
  CreateMilestoneFormName,
  CreateMilestoneFormSchema,
  getCreateMilestoneFormInitialValues,
} from './utils';

interface MilestoneFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function MilestoneForm({ isLoading, onSave, defaultData }: MilestoneFormProps): JSX.Element {
  const { getInputProps, errors, onSubmit, values, setFieldValue, insertListItem, removeListItem } =
    useForm<CreateMilestoneForm>({
      initialValues: getCreateMilestoneFormInitialValues(defaultData),
      validate: zodResolver(CreateMilestoneFormSchema),
      validateInputOnBlur: true,
      validateInputOnChange: true,
    });

  const handleAddNewStep: MouseEventHandler<HTMLButtonElement> = () => {
    insertListItem(CreateMilestoneFormName.steps, {
      title: '',
      date: null,
    });
  };

  const handleRemoveStep = (index: number) => {
    setFieldValue(
      CreateMilestoneFormName.currentStep,
      Math.min(values.steps.length - 1, values.currentStep)
    );
    removeListItem(CreateMilestoneFormName.steps, index);
  };

  const handleUpdateCurrentStep: StepperProps['onStepClick'] = (stepIndex) => {
    setFieldValue(
      CreateMilestoneFormName.currentStep,
      values.currentStep === stepIndex + 1 ? stepIndex : stepIndex + 1
    );
  };

  const handleNumberInputChange: TextInputProps['onChange'] = (event) => {
    const inputValue = event.currentTarget.value;
    let numberValue: number | null = Number.parseInt(inputValue, 10);
    if (Number.isNaN(numberValue) === true) {
      numberValue = null;
    }
    setFieldValue(event.currentTarget.name, numberValue);
  };
  const stopPropogation: MouseEventHandler<HTMLDivElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = (data: CreateMilestoneForm) => {
    onSave({
      title: data.title,
      description: data.description,
      content: omit(data, ['title', 'description']),
      type: MediaTypes.Milestone,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateMilestoneFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateMilestoneFormName.title)}
          error={errors[CreateMilestoneFormName.title]}
        />
        <Textarea
          label={CreateMilestoneFormLabel.description}
          placeholder="Description"
          {...getInputProps(CreateMilestoneFormName.description)}
          error={errors[CreateMilestoneFormName.description]}
        />
        <Stepper
          mt={10}
          w="100%"
          size="sm"
          active={values.currentStep ?? 0}
          onStepClick={handleUpdateCurrentStep}
          orientation="vertical"
        >
          {values.steps.map((step, stepIndex) => (
            <Stepper.Step
              w="100%"
              icon={
                stepIndex === values.currentStep ? (
                  <GoDotFill />
                ) : stepIndex < values.currentStep ? (
                  <FaCircleCheck />
                ) : null
              }
              style={{
                width: '100%',
              }}
              styles={{
                stepBody: {
                  width: '100%',
                },
                stepDescription: {
                  width: '100%',
                },
              }}
              description={
                <Stack onClick={stopPropogation} gap={10}>
                  <TextInput
                    label="Title"
                    placeholder="Label"
                    {...getInputProps(`${CreateMilestoneFormName.steps}.${stepIndex}.title`)}
                  />
                  <Textarea
                    label="Description"
                    onClick={stopPropogation}
                    placeholder="Description"
                    {...getInputProps(`${CreateMilestoneFormName.steps}.${stepIndex}.description`)}
                  />
                  <TextInput
                    label="Amount"
                    placeholder="Amount"
                    type="number"
                    name={`${CreateMilestoneFormName.steps}.${stepIndex}.amount`}
                    {...getInputProps(`${CreateMilestoneFormName.steps}.${stepIndex}.amount`)}
                    onChange={handleNumberInputChange}
                  />
                  <Stack gap={8} {...accessibleOnClick(stopPropogation)}>
                    <DatePickerInput
                      flex={1}
                      label="End date"
                      placeholder="date"
                      name={`${CreateMilestoneFormName.steps}.${stepIndex}.date`}
                      {...getInputProps(`${CreateMilestoneFormName.steps}.${stepIndex}.date`)}
                      value={typeof step.date === 'string' ? new Date(step.date) : undefined}
                      onChange={(value) =>
                        setFieldValue(
                          `${CreateMilestoneFormName.steps}.${stepIndex}.date`,
                          value?.toISOString() ?? null
                        )
                      }
                    />

                    <Button
                      onClick={() => handleRemoveStep(stepIndex)}
                      color="red"
                      variant="outline"
                      leftSection={<MdDelete />}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              }
            />
          ))}
        </Stepper>
        <Button
          onClick={handleAddNewStep}
          w="fit-content"
          leftSection={<FaPlus />}
          variant="outline"
        >
          Add new step
        </Button>
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
