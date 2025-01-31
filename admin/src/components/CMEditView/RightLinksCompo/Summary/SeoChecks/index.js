import React from 'react';

import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import { Illo } from '../../../../SeoPage/Info/EmptyComponentLayout/illo';

import MetaRobotCheck from './MetaRobotCheck';
import WordCountCheck from './WordCountCheck';
import MetaTitleCheck from './MetaTitleCheck';
import MetaSocialCheck from './MetaSocialCheck';
import CanonicalUrlCheck from './CanonicalUrlCheck';
import LastUpdatedAtCheck from './LastUpdatedAtCheck';
import KeywordDensityCheck from './KeywordDensityCheck';
import StructuredDataCheck from './StructuredDataCheck';
import MetaDescriptionCheck from './MetaDescriptionCheck';
import AlternativeTextCheck from './AlternativeTextCheck';

import { getRichTextCheck } from '../../../utils';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import _ from 'lodash';

const SeoChecks = ({
  modifiedData,
  components,
  contentType,
  checks,
  setIsVisible,
}) => {
  const { formatMessage } = useIntl();

  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
    modifiedData,
    components,
    contentType
  );

  const seo = _.get(modifiedData, 'seo', null);

  return (
    <ModalLayout
      onClose={() => setIsVisible((prev) => !prev)}
      labelledBy="title"
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'SEO Plugin',
          })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={2} paddingBottom={4} paddingLeft={4}>
          <Typography variant="beta">
            {formatMessage({
              id: getTrad('Button.seo-analyze'),
              defaultMessage: 'SEO Analyze',
            })}
          </Typography>
          <Box paddingTop={4}>
            <Divider />
          </Box>
        </Box>

        {seo ? (
          <Box padding={4}>
            <MetaTitleCheck
              metaTitle={_.get(modifiedData, 'seo.metaTitle', null)}
              checks={checks}
            />
            <MetaDescriptionCheck
              metaDescription={_.get(modifiedData, 'seo.metaDescription', null)}
              checks={checks}
            />
            <WordCountCheck wordCount={wordCount} checks={checks} />
            <KeywordDensityCheck
              keywordsDensity={keywordsDensity}
              checks={checks}
            />
            <MetaSocialCheck
              metaSocial={_.get(modifiedData, 'seo.metaSocial', null)}
              checks={checks}
            />
            <CanonicalUrlCheck
              canonicalUrl={_.get(modifiedData, 'seo.canonicalURL', null)}
              checks={checks}
            />
            <StructuredDataCheck
              structuredData={_.get(modifiedData, 'seo.structuredData', null)}
              checks={checks}
            />
            <MetaRobotCheck
              metaRobots={_.get(modifiedData, 'seo.metaRobots', null)}
              checks={checks}
            />
            <AlternativeTextCheck
              intersections={_.get(emptyAltCount, 'intersections', null)}
              richTextAlts={_.get(emptyAltCount, 'richTextAlts', null)}
              altTexts={_.get(emptyAltCount, 'altTexts', null)}
              checks={checks}
            />
            <LastUpdatedAtCheck
              updatedAt={_.get(modifiedData, 'updatedAt', null)}
              checks={checks}
            />
          </Box>
        ) : (
          <Box paddingLeft={4}>
            <EmptyStateLayout
              icon={<Illo />}
              content={formatMessage({
                id: getTrad('Modal.seo-component-empy'),
                defaultMessage: 'Your SEO component is empty...',
              })}
            />
          </Box>
        )}
      </ModalBody>
      <ModalFooter
        startActions={
          <Button
            onClick={() => setIsVisible((prev) => !prev)}
            variant="tertiary"
          >
            {formatMessage({
              id: getTrad('Modal.cancel'),
              defaultMessage: 'Cancel',
            })}
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default SeoChecks;
