import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <>
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              歡迎回來
            </h1>
            <p className="text-muted-foreground">登入您的帳戶以繼續購物</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
