export const SPINNER_SHOW = 'SPINNER_SHOW';
export const SPINNER_HIDE = 'SPINNER_HIDE';

export type SpinnerShow = {
    type: typeof SPINNER_SHOW
};

export type SpinnerHide = {
    type: typeof SPINNER_HIDE
};

export type SpinnerAction = SpinnerShow | SpinnerHide;

export const showSpinner = () => ({ type: SPINNER_SHOW });

export const hideSpinner = () => ({ type: SPINNER_HIDE });
