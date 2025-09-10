import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { loginUser, signupUser } from '../features/auth/authThunk';
import { selectIsLoading, selectAuthError } from '../features/auth/authSelectors';
import { clearError } from '../features/auth/authSlice';
import { ButtonSpinner } from '../components/LoadingSpinner';



const DecorativeSVGs = {
  Waves: () => (
    <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path 
        fill="#E8F4FF" 
        fillOpacity="1" 
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
      </path>
    </svg>
  ),
  Circles: () => (
    <svg className="absolute top-0 right-0 w-64 h-64 text-blue-50" viewBox="0 0 200 200">
      <path 
        fill="currentColor" 
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.4,-0.3C88.8,15.7,85,31.3,77.2,45.2C69.4,59.1,57.6,71.2,43.4,77.6C29.2,84,14.6,84.7,-0.7,85.9C-16,87.1,-32,88.8,-45.6,82.8C-59.2,76.8,-70.4,63,-77.9,47.7C-85.4,32.4,-89.2,16.2,-88.9,0.2C-88.6,-15.9,-84.2,-31.8,-76.3,-45.7C-68.4,-59.6,-57,-71.5,-43.1,-78.7C-29.2,-85.9,-14.6,-88.4,0.9,-89.9C16.4,-91.4,32.7,-91.9,44.7,-76.4Z" 
        transform="translate(100 100)" 
      />
    </svg>
  ),
  Dots: () => (
    <div className="absolute inset-0 opacity-10">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-4 h-4 rounded-full bg-primary-600"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'scale(0.5)',
            opacity: Math.random() * 0.5 + 0.5
          }}
        />
      ))}
    </div>
  )
};

const HomeButton = () => (
  <Link
    to="/"
    className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg 
               transition-shadow duration-200 z-10 group"
  >
    <HomeIcon className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
  </Link>
);

const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                 placeholder-gray-400 transition-all duration-200"
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
  
  // Get redirect message from location state
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError()); // Clear any previous errors
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
    <div className="h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <HomeButton />
      <DecorativeSVGs.Waves />
      <DecorativeSVGs.Circles />
      <DecorativeSVGs.Dots />
      
      <div className="w-full max-w-md px-4 relative">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
          {redirectMessage && (
            <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700 text-sm">
              {redirectMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <FormInput
              name="email"
              icon={EnvelopeIcon}
              type="email"
              placeholder="Email address"
              required
            />
            
            <div className="relative">
              <FormInput
                name="password"
                icon={LockClosedIcon}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent
                     rounded-lg text-white bg-primary-600 hover:bg-primary-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                     transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading && <ButtonSpinner />}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  
  // Get redirect message from location state
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError()); // Clear any previous errors
    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const terms = formData.get('terms');

    if (!terms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      await dispatch(signupUser({ 
        fullName, 
        email, 
        password 
      })).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <HomeButton />
      <DecorativeSVGs.Waves />
      <DecorativeSVGs.Circles />
      <DecorativeSVGs.Dots />
      
      <div className="w-full max-w-md px-4 relative">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {redirectMessage && (
          <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700 text-sm">
            {redirectMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <div className="space-y-4">
            <FormInput
              name="fullName"
              icon={UserIcon}
              type="text"
              placeholder="Full name"
              required
            />
            
            <FormInput
              name="email"
              icon={EnvelopeIcon}
              type="email"
              placeholder="Email address"
              required
            />
            
            <div className="relative">
              <FormInput
                name="password"
                icon={LockClosedIcon}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent
                     rounded-lg text-white bg-primary-600 hover:bg-primary-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                     transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading && <ButtonSpinner />}
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default { LoginPage, SignupPage };