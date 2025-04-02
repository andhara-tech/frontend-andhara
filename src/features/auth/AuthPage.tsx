const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Auth Page</h1>
      <p className="mb-8">Please log in to continue.</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Log In</button>
    </div>
  );
}

export default AuthPage;

