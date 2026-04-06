import React from 'react';
import { FlipCardsSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';

const FlipCardsData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = FlipCardsSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, { ...data, [id]: value });
      }}
      formData={data}
      block={block}
    />
  );
};

export default FlipCardsData;
