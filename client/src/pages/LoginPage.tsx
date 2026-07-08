import { LoginForm } from '@/features/auth/components/LoginForm';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthContext } from '@/context/AuthContext';

export function LoginPage() {
  const { loginMutation } = useAuth();
  const { setUser } = useAuthContext();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex max-w-5xl items-center justify-center px-6 py-20">
        <LoginForm
          onSubmit={(values) => {
            loginMutation.mutate(values, {
              onSuccess: (response) => {
                const payload = response.data?.data;
                setUser(payload?.user ?? null);
              },
            });
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
