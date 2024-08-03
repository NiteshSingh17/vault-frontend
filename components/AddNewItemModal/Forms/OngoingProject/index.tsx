'use client';

import { CreateMediaPayload } from '@/api/payload';
import { Dropdown } from '@/components/Dropdown';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { Button, Divider, Grid, Stack, TextInput, TextInputProps, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { omit, sumBy } from 'lodash';
import { MouseEventHandler } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {
  CreateOngoingProjectForm,
  CreateOngoingProjectFormLabel,
  CreateOngoingProjectFormName,
  CreateOngoingProjectFormSchema,
  FrameworkNames,
  getCreateOngoingProjectFormInitialValue,
} from './utils';

interface OngoingProjectFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function OngoingProjectForm({
  isLoading,
  onSave,
  defaultData,
}: OngoingProjectFormProps): JSX.Element {
  const { getInputProps, errors, onSubmit, setFieldValue, values, insertListItem, removeListItem } =
    useForm<CreateOngoingProjectForm>({
      initialValues: getCreateOngoingProjectFormInitialValue(defaultData),
      validate: zodResolver(CreateOngoingProjectFormSchema),
      validateInputOnBlur: true,
      validateInputOnChange: true,
    });

  const handleNumberInputChange: TextInputProps['onChange'] = (event) => {
    const inputValue = event.currentTarget.value;
    let numberValue: number | null = Number.parseInt(inputValue, 10);
    if (Number.isNaN(numberValue) === true) {
      numberValue = null;
    }
    setFieldValue(event.currentTarget.name, numberValue);
  };

  const handleDateInputChange: TextInputProps['onChange'] = (event) => {
    const inputValue = event.currentTarget.value;
    const dateValue: string | null = inputValue === '' ? null : new Date(inputValue).toISOString();
    setFieldValue(event.currentTarget.name, dateValue);
  };

  const handleAddNewInstallment: MouseEventHandler<HTMLButtonElement> = () => {
    insertListItem(CreateOngoingProjectFormName.installments, {
      name: `Installment ${values.installments.length + 1}`,
      amount: 0,

      endDate: new Date().toISOString(),
      description: null,
    });
  };

  const handleRemoveInstallment = (index: number) => {
    removeListItem(CreateOngoingProjectFormName.installments, index);
  };

  const handleSubmit = (data: CreateOngoingProjectForm) => {
    onSave({
      title: data.title,
      description: data.description,
      content: omit(data, ['description', 'title']),
      type: MediaTypes.OngoingProject,
      fileType: FileTypes.File,
    });
  };

  const remainingAmount = Math.max(
    (values.totalAmount ?? 0) - sumBy(values.installments, (ins) => ins.amount ?? 0),
    0
  );

  console.log('Bb', values);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateOngoingProjectFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateOngoingProjectFormName.title)}
          error={errors[CreateOngoingProjectFormName.title]}
        />
        <Textarea
          label={CreateOngoingProjectFormLabel.description}
          placeholder="Description"
          {...getInputProps(CreateOngoingProjectFormName.description)}
          error={errors[CreateOngoingProjectFormName.description]}
        />
        <TextInput
          label={CreateOngoingProjectFormLabel.totalAmount}
          placeholder="Total amount"
          name={CreateOngoingProjectFormName.totalAmount}
          {...getInputProps(CreateOngoingProjectFormName.totalAmount)}
          error={errors[CreateOngoingProjectFormName.totalAmount]}
          onChange={handleNumberInputChange}
        />
        <Dropdown
          label={CreateOngoingProjectFormLabel.stack}
          data={FrameworkNames}
          {...getInputProps(CreateOngoingProjectFormName.stack)}
        />

        <TextInput
          label={CreateOngoingProjectFormLabel.hiringPlatform}
          placeholder="platform"
          name={CreateOngoingProjectFormName.hiringPlatform}
          {...getInputProps(CreateOngoingProjectFormName.hiringPlatform)}
          error={errors[CreateOngoingProjectFormName.hiringPlatform]}
        />
        <DatePickerInput
          label={CreateOngoingProjectFormLabel.startDate}
          placeholder="Start date"
          name={CreateOngoingProjectFormName.startDate}
          {...getInputProps(CreateOngoingProjectFormName.startDate)}
          error={errors[CreateOngoingProjectFormName.startDate]}
          value={typeof values.startDate === 'string' ? new Date(values.startDate) : null}
          onChange={(value) =>
            setFieldValue(CreateOngoingProjectFormName.startDate, value?.toISOString() ?? null)
          }
        />
        <DatePickerInput
          label={CreateOngoingProjectFormLabel.endDate}
          placeholder="End date"
          name={CreateOngoingProjectFormName.endDate}
          {...getInputProps(CreateOngoingProjectFormName.endDate)}
          error={errors[CreateOngoingProjectFormName.endDate]}
          value={typeof values.endDate === 'string' ? new Date(values.endDate) : null}
          onChange={(value) =>
            setFieldValue(CreateOngoingProjectFormName.endDate, value?.toISOString() ?? null)
          }
        />
        <Divider labelPosition="left" label="Freelancer details" />
        <TextInput
          label={CreateOngoingProjectFormLabel.freelancerName}
          placeholder="name"
          {...getInputProps(CreateOngoingProjectFormName.freelancerName)}
          error={errors[CreateOngoingProjectFormName.freelancerName]}
        />
        <TextInput
          label={CreateOngoingProjectFormLabel.freelancerURL}
          placeholder="url"
          {...getInputProps(CreateOngoingProjectFormName.freelancerURL)}
          error={errors[CreateOngoingProjectFormName.freelancerURL]}
        />
        <Divider labelPosition="left" label="Installments" />
        {values.installments.map((installment, index) => (
          <>
            <Grid gutter="sm">
              <Grid.Col span={5}>
                <TextInput
                  label="Installment name"
                  placeholder="name"
                  {...getInputProps(`${CreateOngoingProjectFormName.installments}.${index}.name`)}
                />
              </Grid.Col>
              <Grid.Col span={5}>
                <TextInput
                  type="number"
                  label="Amount"
                  placeholder={remainingAmount.toString()}
                  name={`${CreateOngoingProjectFormName.installments}.${index}.amount`}
                  {...getInputProps(`${CreateOngoingProjectFormName.installments}.${index}.amount`)}
                  onChange={handleNumberInputChange}
                  error={errors[`${CreateOngoingProjectFormName.installments}.${index}.amount`]}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <DatePickerInput
                  label="End date"
                  placeholder="date"
                  name={`${CreateOngoingProjectFormName.installments}.${index}.endDate`}
                  {...getInputProps(
                    `${CreateOngoingProjectFormName.installments}.${index}.endDate`
                  )}
                  error={errors[`${CreateOngoingProjectFormName.installments}.${index}.endDate`]}
                  value={
                    typeof installment.endDate === 'string' ? new Date(installment.endDate) : null
                  }
                  onChange={(value) =>
                    setFieldValue(
                      `${CreateOngoingProjectFormName.installments}.${index}.endDate`,
                      value?.toISOString() ?? null
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  {...getInputProps(
                    `${CreateOngoingProjectFormName.installments}.${index}.description`
                  )}
                  error={
                    errors[`${CreateOngoingProjectFormName.installments}.${index}.description`]
                  }
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Button
                  onClick={() => handleRemoveInstallment(index)}
                  leftSection={<MdDelete />}
                  color="red"
                  variant="outline"
                >
                  Delete
                </Button>
              </Grid.Col>
            </Grid>
            <Divider labelPosition="left" />
          </>
        ))}
        <Button
          onClick={handleAddNewInstallment}
          w="fit-content"
          leftSection={<FaPlus />}
          variant="outline"
        >
          Add new installment
        </Button>
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
