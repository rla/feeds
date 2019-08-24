import React from 'react';

type Props = {
  show: boolean;
};

/**
 * Helper to show/hide the global AJAX spinner.
 */
export default (props: Props) => {
  return <div>{props.show && <div className="spin" />}</div>;
};
