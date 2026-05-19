'use client';

import LessonEditorForm from '../_components/LessonEditorForm';

export default function NewLessonPage() {
  return (
    <LessonEditorForm
      mode="create"
      initialData={{
        title: '',
        slug: '',
        description: '',
        content: {},
        difficulty: 'beginner',
        estimated_minutes: 15,
        xp_reward: 50,
        module_id: 0,
        is_published: false,
      }}
    />
  );
}
