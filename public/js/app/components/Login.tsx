import React, { ChangeEvent, FormEvent } from 'react';

type Props = {
  user: string;
  pass: string;
  setUser: (user: string) => void;
  setPass: (pass: string) => void;
  submit: () => void;
};

/**
 * Login form.
 */
export default (props: Props) => {
  const setUser = (e: ChangeEvent<HTMLInputElement>) => {
    props.setUser(e.target.value);
  };
  const setPass = (e: ChangeEvent<HTMLInputElement>) => {
    props.setPass(e.target.value);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    props.submit();
  };
  return (
    <form className="form-inline" onSubmit={submit}>
      <input
        type="text"
        name="user"
        placeholder="user"
        className="input-small"
        value={props.user}
        onChange={setUser}
      />
      <input
        type="password"
        name="pass"
        placeholder="pass"
        className="input-small"
        value={props.pass}
        onChange={setPass}
      />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};
