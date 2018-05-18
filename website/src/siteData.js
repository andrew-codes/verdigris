import AnalyticsExample01 from '@verdigris/analytics/examples/01-create-and-fire-analytics-events';
import AnalyticsExample01Raw from '!raw-loader!@verdigris/analytics/examples/01-create-and-fire-analytics-events';
import AnalyticsExample02 from '@verdigris/analytics/examples/02-adding-analytics-context';
import AnalyticsExample02Raw from '!raw-loader!@verdigris/analytics/examples/02-adding-analytics-context';
import AnalyticsExample03 from '@verdigris/analytics/examples/03-passing-events-in-callbacks';
import AnalyticsExample03Raw from '!raw-loader!@verdigris/analytics/examples/03-passing-events-in-callbacks';

export const docs = () => [
  { id: 'contributing', title: 'Contributing' },
  { id: 'tour-of-the-code-base', title: 'Tour of the Code Base' },
  { id: 'publishing', title: 'Publishing' },
];
export const pkgs = () => [
  { id: 'analytics', title: 'Analytics' },
  { id: 'code', title: 'Code Highlighter' },
];

const examples = [
  {
    id: 1,
    code: AnalyticsExample01Raw.replace(/'\.\.\/src\/index/, '@verdigris/analytics'),
    Component: AnalyticsExample01,
    pkgId: 'analytics',
    title: 'creating and firing analytics events',
  },
  {
    id: 2,
    code: AnalyticsExample02Raw.replace(/'\.\.\/src\/index/, '@verdigris/analytics'),
    Component: AnalyticsExample02,
    pkgId: 'analytics',
    title: 'adding analytics context',
  },
  {
    id: 3,
    code: AnalyticsExample03Raw.replace(/'\.\.\/src\/index/, '@verdigris/analytics'),
    Component: AnalyticsExample03,
    pkgId: 'analytics',
    title: 'passing events in callbacks',
  },
];

export const getExamples = (pkgId, exampleId = 1) => {
  const pkgExamples = examples
    .filter(example => example.pkgId === pkgId)
    .map(example => ({
      ...example,
      isSelected: example.id === exampleId,
    }))
    .sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  return {
    example: pkgExamples.find(example => example.id === exampleId),
    examples: pkgExamples,
  };
};
