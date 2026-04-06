import React from 'react';
import { SplitScrollSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';

const SplitScrollData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = SplitScrollSchema({ ...props, intl });
  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => onChangeBlock(block, { ...data, [id]: value })}
      formData={data}
      block={block}
    />
  );
};

export default SplitScrollData;
