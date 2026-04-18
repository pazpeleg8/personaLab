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

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 mt-1">{label}</p>
  );
}

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
    if (values.problem.trim().length < 10) next.problem = 'At least 10 characters';
    if (values.solution.trim().length < 10) next.solution = 'At least 10 characters';
    if (values.hypothesis.trim().length < 10) next.hypothesis = 'At least 10 characters';
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <SectionLabel label="What you're building" />
      <FieldGroup
        type="input"
        label="Product or feature"
        placeholder="e.g. Linear, Notion AI summaries, Slack Connect"
        required
        value={values.product}
        onChange={set('product')}
        error={errors.product}
      />

      <div className="border-t border-gray-100 pt-4">
        <SectionLabel label="The problem space" />
        <div className="flex flex-col gap-4">
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
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <SectionLabel label="Your target (optional)" />
        <div className="flex flex-col gap-4">
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
            placeholder="What do you hope to hear? What would validate or challenge your hypothesis?"
            required={false}
            value={values.expectedResponse}
            onChange={set('expectedResponse')}
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating personas…
            </>
          ) : (
            <>
              Generate personas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
