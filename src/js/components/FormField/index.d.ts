import * as React from "react";
import { Omit, PlaceHolderType, MarginType } from "../../utils";

export interface FormFieldProps {
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  label?: string | React.ReactNode;
  margin?: MarginType;
  name?: string;
  pad?: boolean;
  // Although Placeholder is not a prop within FormField we Omit the HTML placeholder attribute and replaced with following.
  placeholder?: PlaceHolderType
  required?: boolean;
  component?: any;
  validate?: {regexp?: object,message?: string} | ((...args: any[]) => any);
}

declare const FormField: React.ComponentClass<FormFieldProps & Omit<JSX.IntrinsicElements['input'], 'placeholder'>>;

export { FormField };
