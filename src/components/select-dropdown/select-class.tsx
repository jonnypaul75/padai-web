import { useEffect, useState } from 'react';
import Select from 'react-select';
import type { SelectOption } from '../../types/common';
import type { ClassApiResponse } from '../../types/class-section';
import { apiProxyRequest } from '../../lib/api-client-proxy';

interface Props {
  value: string | null;
  onSelectClass: (classId: string | null) => void;
}

const SelectClass = ({ value, onSelectClass }: Props) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await apiProxyRequest<ClassApiResponse, { school_id: string }>(
          'POST',
          'Content/getClasses',
          { school_id: '23' }
        );
        const classesData = result?.data ?? [];
        const formatted = classesData.map((item) => ({
          value: item.class_id.toString(),
          label: item.class_name,
        }));
        setOptions(formatted);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <Select
      isLoading={loading}
      options={options}
      value={selectedOption}
      onChange={(option) => onSelectClass(option?.value ?? null)}
      placeholder="Select Class"
      isClearable
    />
  );
};

export default SelectClass;
