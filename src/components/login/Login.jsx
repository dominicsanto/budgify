import axios from "axios";
import { useState } from 'react'
import { useRouter } from "next/router";
import FlashAlert from "../shared/FlashAlert";

const Login = () => {
  const router = useRouter();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `/api/auth`,
        {
          clientId,
          clientSecret,
          apiKey
        });

      setIsLoading(false);
      router.push('/dashboard');
    }
    catch(e) {
      setIsLoading(false);
      setErrMessage('Failed to authenticate with the details provided');
    }
  };

  return (
  <>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900">B U D G I F Y</h2>
        <p className="mt-6 text-center text-xs text-gray-900">Enter your API details</p>
        { errMessage &&
          <FlashAlert message={errMessage} />
        }
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Client Id
              </label>
              <div className="mt-1">
                <input
                  id="client-id"
                  name="client-id"
                  onChange={(e) => setClientId(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <div className="mt-1">
                <input
                  id="client-secret"
                  name="client-secret"
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Api Key
              </label>
              <div className="mt-1">
                <input
                  id="api-key"
                  name="api-key"
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading &&
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                }
                Authenticate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default Login;