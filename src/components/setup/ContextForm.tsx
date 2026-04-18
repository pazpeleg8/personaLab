import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FieldGroup } from './FieldGroup';
import type { ProjectContext } from '../../types';

interface Props {
  initialValues?: Partial<ProjectContext>;
  onSubmit: (context: ProjectContext) => void;
  isLoading?: boolean;
}

type FormValues = {
  product: string;
  problem: string;
  solution: string;
  hypothesis: string;
  segment: string;
  expectedResponse: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

export function ContextForm({ initialValues, onSubmit, isLoading }: Props) {
  const [values, setValues] = useState<FormValues>({
    product: initialValues?.product ?? '',
    problem: initialValues?.problem ?? '',
    solution: initialValues?.solution ?? '',
    hypothesis: initialValues?.hypothesis ?? '',
    segment: initialValues?.segment ?? '',
    expectedResponse: initialValues?.expectedResponse ?? '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.product.trim()) next.product = 'Required';
    if (values.problem.trim().length < 10) next.problem = 'Please describe the problem in at least 10 characters';
    if (values.solution.trim().length < 10) next.solution = 'Please describe the solution in at least 10 characters';
    if (values.hypothesis.trim().length < 10) next.hypothesis = 'Please describe your hypothesis in at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      id: uuid(),
      product: values.product.trim(),
      problem: values.problem.trim(),
      solution: values.solution.trim(),
      hypothesis: values.hypothesis.trim(),
      segment: values.segment.trim() || undefined,
      expectedResponse: values.expectedResponse.trim() || undefined,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FieldGroup
        type="input"
        label="Product or feature"
        placeholder="e.g. Linear, Notion AI summaries, Slack Connect"
        required
        value={values.product}
        onChange={set('product')}
        error={errors.product}
      />
      <FieldGroup
        type="textarea"
        label="Problem"
        placeholder="What problem does this solve for users?"
        required
        value={values.problem}
        onChange={set('problem')}
        error={errors.problem}
      />
      <FieldGroup
        type="textarea"
        label="Solution"
        placeholder="How does the product or feature address the problem?"
        required
        value={values.solution}
        onChange={set('solution')}
        error={errors.solution}
      />
      <FieldGroup
        type="textarea"
        label="Hypothesis"
        placeholder="What do you expect to learn or validate from user interviews?"
        required
        value={values.hypothesis}
        onChange={set('hypothesis')}
        error={errors.hypothesis}
      />
      <FieldGroup
        type="input"
        label="Target segment"
        placeholder="e.g. Engineering leads at B2B SaaS companies with 10-100 engineers"
        required={false}
        value={values.segment}
        onChange={set('segment')}
      />
      <FieldGroup
        type="textarea"
        label="Expected user response"
        placeholder="What do you expect users to say? What would validate or invalidate your hypothesis?"
        required={false}
        value={values.expectedResponse}
        onChange={set('expectedResponse')}
      />
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Generating personas…' : 'Generate personas'}
        </button>
      </div>
    </form>
  );
}
