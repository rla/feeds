import { View } from '../reducers/route';

export type Display = 'feeds' | 'invalid' | 'articles' | 'search';

type DisplayMap = {
  [key: string]: Display;
};

const viewToDisplayMap: DisplayMap = {
  feeds: 'feeds',
  invalid: 'invalid',
  search: 'search',
  results: 'articles',
  feed: 'articles',
  unseen: 'articles',
  important: 'articles',
};

/**
 * Converts view name to display name. View names are used in routing
 * but display names are used for selecting actual view implementations.
 */
export const viewToDisplay = (view: View | null): Display | null => {
  if (view === null) {
    return null;
  } else {
    const display = viewToDisplayMap[view];
    return display || null;
  }
};
