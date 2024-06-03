import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }

  const resetPassword = async (formData: FormData) => {
    'use server';

    const password = formData.get('password') as string;
    const supabase = createClient();

    if (searchParams.code) {
      const supabase = createClient();
      let error = null;
      try {
        const response = await supabase.auth.exchangeCodeForSession(
          searchParams.code
        );
        error = response.error;
      } catch {}

      if (error) {
        return redirect(
          `/reset-password?message=Unable to reset Password. Link expired!`
        );
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/reset-password?message=Unable to reset Password. Try again!`
      );
    }

    redirect(
      `/login?message=Your Password has been reset successfully. Sign in.`
    );
  };

  return (
    <div>
      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          action={resetPassword}
        >
          <label className="text-md" htmlFor="password">
            New Password
          </label>
          <Input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required>
          </Input>
          <label className="text-md" htmlFor="password">
            Confirm New Password
          </label>
          <Input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required>
          </Input>

          <Button className="bg-primaryColor rounded-md px-4 py-2 text-foreground mb-2">
            Reset
          </Button>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}