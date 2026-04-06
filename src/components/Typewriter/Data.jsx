import React from 'react';
import { TypewriterSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';

const TypewriterData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = TypewriterSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      block={block}
    />
  );
};

export default TypewriterData;
