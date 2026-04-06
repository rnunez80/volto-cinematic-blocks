import React from 'react';
import { TextScrambleSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';

const TextScrambleData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = TextScrambleSchema({ ...props, intl });
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

export default TextScrambleData;
