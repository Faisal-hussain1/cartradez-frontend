import {ChangeEvent} from 'react';
import {LOGO_VARIATIONS} from '../constants/general';

export type OnChangeEvent = ChangeEvent<HTMLInputElement>;

export type TranslateFunction = (key: string) => string;

export type AccountUsernameType = {username: string};

export type LogoVariation =
  (typeof LOGO_VARIATIONS)[keyof typeof LOGO_VARIATIONS]['value'];

export type IdType = {
  id: string;
};

export type FocusedField = 'subject' | 'description' | null;
