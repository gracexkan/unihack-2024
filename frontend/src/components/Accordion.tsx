import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { TPrescription } from '../types/types';

const Accordion = ({ data }: { data: TPrescription}) => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Medicine name',
      children: <p>{data?.medicationName}</p>,
    },
    {
      key: '2',
      label: 'Duration',
      children: <p>{data?.duration}</p>,
    },
    {
      key: '3',
      label: 'Frequency',
      children: <p>{data?.frequency}</p>,
    },
    {
      key: '4',
      label: 'Restrictions',
      children: <p>{data?.restrictions.join(' ')}</p>,
    },
    {
      key: '5',
      label: 'Severity',
      children: <p>{data?.severity}</p>,
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} className="bg-slate-200"/>;
};

export default Accordion;