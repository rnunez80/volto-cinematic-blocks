import React from 'react';
import { MarqueeSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
import cx from 'classnames';
import { useIntl } from 'react-intl';

const MarqueeData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = MarqueeSchema({ ...props, intl });
  return (
    <div className="cinematic-marquee__sidebar-form">
      <BlockDataForm
        schema={schema}
        title={schema.title}
        onChangeField={(id, value) => onChangeBlock(block, { ...data, [id]: value })}
        formData={data}
        block={block}
      />
    </div>
  );
};

export default MarqueeData;
