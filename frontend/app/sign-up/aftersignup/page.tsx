"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import Footer from '../../../components/Footer';

export default function AfterSignupPage() {
    const [sinNumber, setSinNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const { user, isLoaded } = useUser();
    const router = useRouter();
    
    // Handle loading state
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    
    // Ensure the user is authenticated
    if (!user) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-col items-center p-10">
                    <p>Please sign in to complete your profile.</p>
                </div>
                <Footer />
            </div>
        );
    }
    
    interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

    const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Validate SIN
            if (!/^\d{9}$/.test(sinNumber)) {
                throw new Error('SIN number must be 9 digits');
            }
            
            await user.update({
                unsafeMetadata: {
                    sinNumber: sinNumber
                }
            });
            
            setSuccess(true);
            
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
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center p-10">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
                    
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