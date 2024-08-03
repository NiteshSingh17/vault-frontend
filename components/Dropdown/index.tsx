import { Group, TagsInput, TagsInputProps, Text } from '@mantine/core';

export interface DropdownProps extends TagsInputProps {
  data: { title: string; value: string; icon?: JSX.Element }[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export function Dropdown({ data, value, onChange, ...props }: DropdownProps) {
  return (
    <TagsInput
      data={data.map((d) => d.title)}
      renderOption={({ option }) => {
        const optionDetail = data.find((item) => item.title === option.value);
        return (
          <Group gap="sm">
            {optionDetail?.icon}
            <div>
              <Text size="sm">{option.value}</Text>
            </div>
          </Group>
        );
      }}
      value={value}
      onChange={onChange}
      maxDropdownHeight={300}
      {...props}
    />
  );
}
