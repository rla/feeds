import React from 'react';
import classlist from '../classlist';

type Props = {
  onClick?: () => void;
  danger?: boolean;
  inverse?: boolean;
  disabled?: boolean;
  href?: string;
  children: {};
};

export default (props: Props) => {
  // Helper to set the button CSS classes.
  const classes = {
    btn: true,
    'btn-small': true,
    'btn-danger': !!props.danger,
    'btn-inverse': !!props.inverse,
    disabled: !!props.disabled,
  };
  const href = props.href || '#';
  // Helper that automatically calls preventDefault
  // on the DOM event when the callback is set.
  const preventDefault = (cb?: () => void) => {
    return (e: React.MouseEvent) => {
      if (typeof cb === 'function') {
        e.preventDefault();
        cb();
      }
    };
  };
  return (
    <a href={href} onClick={preventDefault(props.onClick)} className={classlist(classes)}>
      {props.children}
    </a>
  );
};
