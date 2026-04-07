import React from 'react';
import { SliderCrazyEffectsSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';

const SliderCrazyEffectsSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const schema = SliderCrazyEffectsSchema(props);

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

export default SliderCrazyEffectsSidebar;
