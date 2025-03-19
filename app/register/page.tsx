import { Suspense } from 'react';
import RegisterForm from '../ui/register-form';

export default function RegisterPage() {
  return (
    <main>
      <div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
