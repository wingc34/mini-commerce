import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <>
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="rounded-lg border border-border p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              Welcome back!
            </h1>
            <p className="text-textSecondary">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
