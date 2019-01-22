import React, { FormEvent, ChangeEvent } from 'react';

type Props = {
    query: string,
    setQuery: (e: ChangeEvent<HTMLInputElement>) => void,
    submit: (e: FormEvent) => void
};

/**
 * Search form.
 */
export default (props: Props) => {
    return (
        <form className='form-inline' onSubmit={props.submit}>
            <input type='text' name='query'
                placeholder='search term' onChange={props.setQuery}/>
            <button type='submit' className='btn'>Search</button>
        </form>
    );
};
