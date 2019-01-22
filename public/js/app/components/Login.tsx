import React, { ChangeEvent, FormEvent } from 'react';

type Props = {
    user: string,
    pass: string,
    setUser: (e: ChangeEvent<HTMLInputElement>) => void,
    setPass: (e: ChangeEvent<HTMLInputElement>) => void,
    submit: (e: FormEvent) => void
};

/**
 * Login form.
 */
export default (props: Props) => {
    return (
        <form className='form-inline' onSubmit={props.submit}>
            <input type='text' name='user' placeholder='user' className='input-small'
                value={props.user} onChange={props.setUser}/>
            <input type='password' name='pass' placeholder='pass' className='input-small'
                value={props.pass} onChange={props.setPass}/>
            <button type='submit' className='btn'>Login</button>
        </form>
    );
};
