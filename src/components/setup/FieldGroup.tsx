import { cn } from '../../utils/cn';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
}

type InputProps = BaseProps & { type: 'input' } & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & { type: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps;

export function FieldGroup(props: Props) {
  const { label, helper, error, required, type, ...rest } = props;
  const inputClass = cn(
    'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition',
    error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {!required && <span className="ml-1 text-gray-400 font-normal">(optional)</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={cn(inputClass, 'resize-none')}
          rows={3}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input className={inputClass} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {helper && !error && <p className="text-xs text-gray-400">{helper}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
