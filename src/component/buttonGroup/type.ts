import { ButtonProps } from 'antd/lib/button';

export type Dict = { [key:string]: any };
export type Direction = 'horizontal' | 'vertical' | undefined;

export type UniButtonModel = {
  label: string;
  key: any;
  style?: Dict;
  antdButtonProps?: ButtonProps;
};

export type clickedButtonStyleModel = {
  style?: Dict;
  antdButtonProps?: ButtonProps;
};

export type AnyFC = {
  (params: any): any;
};
