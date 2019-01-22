import React, { FormEvent, ChangeEvent } from 'react';

type Props = {
    text: string,
    setText: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    submit: (e: FormEvent) => void
};

/**
 * Form to add new feed URLs.
 */
export default (props: Props) => {
    return (
        <form onSubmit={props.submit}>
            <label htmlFor='urls'>Add list of feed URLs (one per line)</label>
            <textarea id='urls' onChange={props.setText} rows={3} value={props.text}/><br/>
            <button type='submit' className='btn'>Add</button>
        </form>
    );
};
