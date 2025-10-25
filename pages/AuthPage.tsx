import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Role } from '../types';

// Generic icon used for a neutral "Continue" social button (no vendor branding)
const SocialGenericIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.89H8.314v-3.784h2.124v-2.82c0-2.105 1.25-3.268 3.162-3.268.901 0 1.8.16 1.8.16v3.23h-1.63c-1.03 0-1.36.615-1.36 1.325v1.65h3.58l-.57 3.784h-3.01v6.005C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.558-5.175m5.571 2.275a3 3 0 014.242 4.242m-4.242-4.242a3 3 0 00-4.242 4.242M3 3l18 18" /></svg>;

const CheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const CrossIcon: React.FC<{ className?: string }> = ({ className = '' }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const LoginForm: React.FC<{ onSwitchMode: () => void }> = ({ onSwitchMode }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        login(email);
    };

    const handleDemoLogin = (userEmail: string) => {
        login(userEmail);
    };
    
    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#B91C1C]">
                    Welcome Back
                </h1>
                <p className="mt-2 text-md text-slate-500 dark:text-slate-400">
                    Sign in to continue to KLIAS
                </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4 rounded-md">
                     <Input 
                        id="email"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email address"
                        aria-label="Email address"
                        required 
                    />
                    <Input 
                        id="password" 
                        type={showPassword ? 'text' : 'password'} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password"
                        aria-label="Password"
                        required 
                        endIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        onEndIconClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
                        <label htmlFor="remember-me" className="ml-2 block text-slate-900 dark:text-slate-300">Remember me</label>
                    </div>
                    <a href="#" className="font-medium text-red-600 hover:text-red-500">Forgot your password?</a>
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                
                <Button type="submit" className="w-full !py-3 !text-base !font-bold">
                    Sign In
                </Button>
            </form>
            
            <div className="text-center text-sm text-slate-500 dark:text-slate-400 space-y-2">
                <p>Or quick login as a demo user:</p>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={() => handleDemoLogin('alex.j@example.com')}>Student</Button>
                    <Button variant="secondary" onClick={() => handleDemoLogin('e.reed@example.com')}>Teacher</Button>
                </div>
                <p className="pt-1 text-xs">(Any password will work for manual login)</p>
            </div>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="social">
                    <SocialGenericIcon />
                    Continue
                </Button>
                <Button variant="social">
                    <FacebookIcon />
                    Facebook
                </Button>
            </div>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchMode} className="font-semibold text-red-600 hover:text-red-500 focus:outline-none">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

const PasswordStrengthIndicator: React.FC<{ checks: Record<string, boolean> }> = ({ checks }) => (
    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mt-2 pl-1">
        <li className={`flex items-center ${checks.minLength ? 'text-green-500' : ''}`}>
            {checks.minLength ? <CheckIcon/> : <CrossIcon className="text-red-500" />} At least 8 characters
        </li>
        <li className={`flex items-center ${checks.hasUpper ? 'text-green-500' : ''}`}>
             {checks.hasUpper ? <CheckIcon/> : <CrossIcon className="text-red-500" />} Contains an uppercase letter
        </li>
        <li className={`flex items-center ${checks.hasLower ? 'text-green-500' : ''}`}>
             {checks.hasLower ? <CheckIcon/> : <CrossIcon className="text-red-500" />} Contains a lowercase letter
        </li>
        <li className={`flex items-center ${checks.hasNumber ? 'text-green-500' : ''}`}>
             {checks.hasNumber ? <CheckIcon/> : <CrossIcon className="text-red-500" />} Contains a number
        </li>
        <li className={`flex items-center ${checks.hasSpecial ? 'text-green-500' : ''}`}>
             {checks.hasSpecial ? <CheckIcon/> : <CrossIcon className="text-red-500" />} Contains a special character (!@#$%)
        </li>
    </ul>
);

const SignUpForm: React.FC<{ onSwitchMode: () => void }> = ({ onSwitchMode }) => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [assignedRole, setAssignedRole] = useState<Role | null>(null);
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordChecks = useMemo(() => ({
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }), [password]);

    const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

    const validateEmail = (value: string) => {
        if (!value) {
            setEmailError('');
            return false;
        } else if (!value.endsWith('@kluniversity.in')) {
            setEmailError('Email must be a @kluniversity.in address.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
        setAssignedRole(null);
    };
    
    const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const currentEmail = e.target.value;
        const isValid = validateEmail(currentEmail);

        if (isValid) {
            const emailLocalPart = currentEmail.split('@')[0];
            const isStudentEmail = /^\d{10}$/.test(emailLocalPart);
            const determinedRole = isStudentEmail ? Role.STUDENT : Role.TEACHER;
            setAssignedRole(determinedRole);
        } else {
            setAssignedRole(null);
        }
    };


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (password && password !== newConfirmPassword) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        validateEmail(email);

        if (emailError) return;
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (!isPasswordStrong) {
            setError('Please ensure your password meets all the strength requirements.');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }
        
        const emailLocalPart = email.split('@')[0];
        const isStudentEmail = /^\d{10}$/.test(emailLocalPart);
        const determinedRole = isStudentEmail ? Role.STUDENT : Role.TEACHER;

        register(name, email, determinedRole);
    };

    const isSignUpDisabled = !name || !email || !password || !confirmPassword || !!emailError || !isPasswordStrong || password !== confirmPassword;
    
    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#B91C1C]">
                    Create an Account
                </h1>
                <p className="mt-2 text-md text-slate-500 dark:text-slate-400">
                    Join the KLIAS community today!
                </p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input 
                    id="fullName"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Full Name"
                    aria-label="Full Name"
                    required 
                />
                <div>
                    <Input 
                        id="email-signup"
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        onBlur={handleEmailBlur}
                        placeholder="Email address"
                        aria-label="Email address"
                        required 
                    />
                    {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
                    {assignedRole && !emailError && (
                        <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p>Role assigned: <span className="font-bold">{assignedRole}</span></p>
                        </div>
                    )}
                </div>
                <div>
                    <Input 
                        id="password-signup" 
                        type={showPassword ? 'text' : 'password'}
                        value={password} 
                        onChange={handlePasswordChange} 
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        placeholder="Password"
                        aria-label="Password"
                        required 
                        endIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        onEndIconClick={() => setShowPassword(!showPassword)}
                    />
                    {(isPasswordFocused || password.length > 0) && (
                        <PasswordStrengthIndicator checks={passwordChecks} />
                    )}
                </div>
                <div>
                    <Input 
                        id="confirm-password" 
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        required 
                        endIcon={showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                     {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                </div>
                
                {error && <p className="text-sm text-red-500 text-center pt-2">{error}</p>}
                
                <Button type="submit" className="w-full !py-3 !text-base !font-bold disabled:bg-red-300 dark:disabled:bg-red-800 disabled:cursor-not-allowed" disabled={isSignUpDisabled}>
                    Sign Up
                </Button>
            </form>
            
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <button type="button" onClick={onSwitchMode} className="font-semibold text-red-600 hover:text-red-500 focus:outline-none">
                    Sign In
                </button>
            </p>
        </div>
    );
};


export const AuthPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    if(isAuthenticated) {
        return <Navigate to="/home" />;
    }

    const switchMode = () => {
        setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
    }
    
    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-900 font-sans">
            <div className="hidden lg:flex flex-1 bg-slate-900 items-center justify-center p-12 text-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(185,28,28,0.3),rgba(255,255,255,0))]">
                <div className="max-w-md text-center">
                    <h1 className="text-5xl font-bold tracking-wider">KLIAS</h1>
                    <p className="mt-4 text-lg text-slate-300">
                        Connect, Collaborate, and Learn.
                    </p>
                </div>
            </div>
            
            <div className="w-full lg:flex-1 flex items-center justify-center p-6">
               {authMode === 'login' ? (
                   <LoginForm onSwitchMode={switchMode} />
               ) : (
                   <SignUpForm onSwitchMode={switchMode} />
               )}
            </div>
        </div>
    );
};