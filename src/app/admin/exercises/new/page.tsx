'use client';

import ExerciseEditorForm from '../_components/ExerciseEditorForm';

export default function NewExercisePage() {
  return (
    <ExerciseEditorForm
      mode="create"
      initialData={{
        title: '',
        description: '',
        difficulty: 'easy',
        starter_code: '# Viết code của bạn ở đây\n',
        solution_code: '',
        hints: [],
        xp_reward: 10,
        lesson_id: 0,
        is_published: false,
      }}
      initialTestCases={[
        { input: '', expected_output: '', is_hidden: false },
      ]}
    />
  );
}
