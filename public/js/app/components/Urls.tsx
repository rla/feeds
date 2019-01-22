import React, { FormEvent, ChangeEvent } from 'react';

type Props = {
    text: string,
    setText: (text: string) => void,
    submit: () => void
};

/**
 * Form to add new feed URLs.
 */
export default (props: Props) => {
    const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.setText(e.target.value);
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();
        props.submit();
    };
    return (
        <form onSubmit={submit}>
            <label htmlFor='urls'>Add list of feed URLs (one per line)</label>
            <textarea id='urls' onChange={changeText} rows={3} value={props.text}/><br/>
            <button type='submit' className='btn'>Add</button>
        </form>
    );
};
