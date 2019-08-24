import React, { FormEvent, ChangeEvent } from 'react';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  submit: () => void;
};

/**
 * Search form.
 */
export default (props: Props) => {
  const changeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    props.setQuery(e.target.value);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    props.submit();
  };
  return (
    <form className="form-inline" onSubmit={submit}>
      <input type="text" name="query" placeholder="search term" onChange={changeQuery} />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
};
