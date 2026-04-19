import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { Persona, PersonaArchetype } from '../../types';

const ARCHETYPES: PersonaArchetype[] = [
  'power-user', 'casual-user', 'skeptic', 'early-adopter', 'non-technical', 'manager', 'student',
];

interface Props {
  onAdd: (persona: Persona) => void;
  onCancel: () => void;
}

export function CustomPersonaForm({ onAdd, onCancel }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [archetype, setArchetype] = useState<PersonaArchetype>('casual-user');
  const [background, setBackground] = useState('');
  const [techComfort, setTechComfort] = useState<'low' | 'medium' | 'high'>('medium');
  const [goals, setGoals] = useState(['', '']);
  const [frustrations, setFrustrations] = useState(['', '']);

  const updateList = (list: string[], setter: (v: string[]) => void, idx: number, val: string) => {
    const next = [...list];
    next[idx] = val;
    setter(next);
  };

  const addItem = (list: string[], setter: (v: string[]) => void) =>
    setter([...list, '']);

  const removeItem = (list: string[], setter: (v: string[]) => void, idx: number) =>
    setter(list.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const persona: Persona = {
      id: uuid(),
      name: name.trim(),
      age: parseInt(age, 10) || 30,
      occupation: occupation.trim(),
      archetype,
      background: background.trim(),
      goals: goals.filter((g) => g.trim()),
      frustrations: frustrations.filter((f) => f.trim()),
      techComfort,
      traits: [],
      relevanceReason: 'Custom persona added by researcher.',
      suggestedQuestions: [],
    };
    onAdd(persona);
  };

  const isValid = name.trim() && occupation.trim() && background.trim() && goals.some((g) => g.trim());

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-5 space-y-4">
      <h3 className="text-sm font-semibold text-indigo-800">Create a custom persona</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="32"
            min={16}
            max={80}
            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Occupation *</label>
        <input
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="e.g. Product manager at a mid-size SaaS company"
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Archetype</label>
          <select
            value={archetype}
            onChange={(e) => setArchetype(e.target.value as PersonaArchetype)}
            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          >
            {ARCHETYPES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Tech comfort</label>
          <div className="flex gap-2 mt-1.5">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setTechComfort(level)}
                className={`flex-1 text-xs py-1 rounded-lg border font-medium transition-colors ${
                  techComfort === level
                    ? 'border-indigo-500 bg-indigo-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Background *</label>
        <textarea
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="2–3 sentences about who this person is, their context, and what makes them relevant to your research."
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Goals *</label>
          <div className="space-y-1.5">
            {goals.map((g, i) => (
              <div key={i} className="flex gap-1">
                <input
                  value={g}
                  onChange={(e) => updateList(goals, setGoals, i, e.target.value)}
                  placeholder={`Goal ${i + 1}`}
                  className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1 text-xs focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                />
                {goals.length > 1 && (
                  <button type="button" onClick={() => removeItem(goals, setGoals, i)} className="text-gray-400 hover:text-red-400 text-xs px-1">×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addItem(goals, setGoals)} className="text-xs text-indigo-600 hover:text-indigo-800">+ add goal</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Frustrations</label>
          <div className="space-y-1.5">
            {frustrations.map((f, i) => (
              <div key={i} className="flex gap-1">
                <input
                  value={f}
                  onChange={(e) => updateList(frustrations, setFrustrations, i, e.target.value)}
                  placeholder={`Frustration ${i + 1}`}
                  className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1 text-xs focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                />
                {frustrations.length > 1 && (
                  <button type="button" onClick={() => removeItem(frustrations, setFrustrations, i)} className="text-gray-400 hover:text-red-400 text-xs px-1">×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addItem(frustrations, setFrustrations)} className="text-xs text-indigo-600 hover:text-indigo-800">+ add frustration</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700">
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add persona
        </button>
      </div>
    </form>
  );
}
