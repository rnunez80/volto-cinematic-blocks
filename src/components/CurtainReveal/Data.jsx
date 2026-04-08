import React, { useEffect, useState } from 'react';
import { CurtainRevealSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';

const CurtainRevealData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const [schema, setSchema] = useState(null);
  const [curtainGradient, setCurtainGradient] = useState(data?.curtainGradient || false);

  useEffect(() => {
    if (intl) {
      let newSchema = CurtainRevealSchema({ ...props, intl });

      if (!newSchema) return;

      if (curtainGradient) {
        newSchema = {
          ...newSchema,
          fieldsets: [
            ...newSchema.fieldsets.slice(0, 2),
            { ...newSchema.fieldsets[1], title: 'Curtain Color', fields: [
              'curtainGradient','curtainGradientStart', 'curtainGradientEnd', 'curtainGradientAngle'
            ]},
            ...newSchema.fieldsets.slice(2)
          ]
        };
      } else {
        newSchema = {
          ...newSchema,
          fieldsets: [
            ...newSchema.fieldsets.slice(0, 2),
            { ...newSchema.fieldsets[1], title: 'Curtain Color', fields: [
              'curtainGradient', 'curtainColor'
            ]},
            ...newSchema.fieldsets.slice(2)
          ]
        };
      }

      setSchema(newSchema);
    }
  }, [intl, props, curtainGradient]);

  useEffect(() => {
    if (data?.curtainGradient !== undefined) {
      setCurtainGradient(data.curtainGradient);
    }
  }, [data?.curtainGradient]);

  if (!schema) return null;

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

export default CurtainRevealData;
