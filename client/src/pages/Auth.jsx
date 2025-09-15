import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { loginUser, signupUser } from '../features/auth/authThunk';
import { selectIsLoading, selectAuthError } from '../features/auth/authSelectors';
import { clearError } from '../features/auth/authSlice';
import { ButtonSpinner } from '../components/LoadingSpinner';

const DecorativeElements = {
  Background: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-neutral-100 to-transparent rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-neutral-200 to-transparent rounded-full opacity-10"></div>
    </div>
  )
};

const HomeButton = () => (
  <Link
    to="/"
    className="absolute top-6 left-6 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200 hover:bg-white hover:shadow-medium transition-all duration-200 z-10"
  >
    <HomeIcon className="h-5 w-5 text-neutral-600" />
  </Link>
);

const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-neutral-400" />
    </div>
    <input
      {...props}
      className="input-field pl-12"
    />
  </div>
);

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <HomeButton />
      <DecorativeElements.Background />
      
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Welcome back
          </h1>
          <p className="text-neutral-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {redirectMessage && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm">
                {redirectMessage}
              </div>
            )}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <FormInput
                  name="email"
                  icon={EnvelopeIcon}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FormInput
                    name="password"
                    icon={LockClosedIcon}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
                />
                <span className="ml-2 text-sm text-neutral-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? <ButtonSpinner /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    
    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <HomeButton />
      <DecorativeElements.Background />
      
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Create account
          </h1>
          <p className="text-neutral-600">
            Join us and start your shopping journey
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name
                </label>
                <FormInput
                  name="name"
                  icon={UserIcon}
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <FormInput
                  name="email"
                  icon={EnvelopeIcon}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FormInput
                    name="password"
                    icon={LockClosedIcon}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FormInput
                    name="confirmPassword"
                    icon={LockClosedIcon}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded mt-1"
                required
              />
              <label className="ml-2 text-sm text-neutral-600">
                I agree to the{' '}
                <Link to="/terms" className="text-neutral-900 hover:text-neutral-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-neutral-900 hover:text-neutral-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? <ButtonSpinner /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};