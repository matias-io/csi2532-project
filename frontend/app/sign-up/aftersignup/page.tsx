"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import Footer from '../../../components/Footer';

export default function AfterSignupPage() {
    const [sinNumber, setSinNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    
    // Check for existing SIN number when user data loads
    useEffect(() => {
        if (isLoaded && user) {
            try {
                // Check if user already has SIN in metadata (might happen with returning SSO users)
                const existingSin = user.unsafeMetadata?.sinNumber;
                if (existingSin) {
                    // User already completed this step, redirect to user page
                    router.push('/user');
                }
            } catch (err) {
                console.error('Error checking user metadata:', err);
                // Don't redirect, let the user try to complete the form
            }
        }
    }, [isLoaded, user, router]);
    
    // Render loading state outside of any conditional logic
    if (!isLoaded) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="flex justify-center items-center flex-grow">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </div>
        );
    }
    
    // Safely render the unauthenticated state
    if (!isSignedIn || !user) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-col items-center p-10">
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                        <p>Please sign in to complete your profile.</p>
                        <button 
                            onClick={() => router.push('/sign-in')}
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Go to Sign In
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Validate SIN
            if (!/^\d{9}$/.test(sinNumber)) {
                throw new Error('SIN number must be 9 digits');
            }
            
            // Make sure we have a valid user before updating
            if (!user) {
                throw new Error('User not found. Please sign in again.');
            }
            
            const authMethod = user.primaryEmailAddress?.verification?.strategy || 'unknown';
            
            await user.update({
                unsafeMetadata: {
                    sinNumber,
                    profileCompleted: true,
                    authMethod
                }
            });
            
            setSuccess(true);
            
            // Use a safer approach for redirection
            setTimeout(() => {
                router.push('/user');
            }, 2000);
            
        } catch (err: unknown) {
            console.error('Error updating user metadata:', err);
            setError(err instanceof Error ? err.message : 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Safely accessing user data
    const authStrategy = user?.primaryEmailAddress?.verification?.strategy;
    const isSSO = authStrategy !== 'email_code';
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center p-10">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
                    
                    {/* Display SSO welcome message if user came through SSO */}
                    {isSSO && (
                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
                            Welcome! You've signed in using {authStrategy || 'SSO'}. 
                            Please complete your profile information below.
                        </div>
                    )}
                    
                    {success ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            Profile updated successfully! Redirecting...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sinNumber">
                                    SIN Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="sinNumber"
                                    type="text"
                                    placeholder="Enter your 9-digit SIN"
                                    value={sinNumber}
                                    onChange={(e) => setSinNumber(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Your SIN is stored securely and is used for tax purposes.
                                </p>
                            </div>
                            
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Information'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}