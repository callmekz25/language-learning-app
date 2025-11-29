import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserPlus as UserPlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { SignUpType } from '../types/auth';
import { signupSchema } from '../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { Signup } from '@/modules/auth/services/auth.services';

const SignupPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutationWithToast(Signup, {
    success: 'Signup success',
    error: 'Signup failed',
    invalidateKeys: ['user'],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = (data: SignUpType) => {
    mutate(data, {
      onSuccess: () => {
        localStorage.setItem('email', watch('email'));
        navigate('/unverify-email');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <UserPlusIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Fill the information below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleSignup)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
                className="py-5"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="py-5"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} className="py-5" />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" {...register('dob')} className="py-3" />
              {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button isPending={isPending} type="submit" className="w-full py-5">
              Sign up
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
