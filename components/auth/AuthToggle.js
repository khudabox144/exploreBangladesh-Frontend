'use client';

const AuthToggle = ({ isSignUp, onToggle }) => {
  return (
    <div className="text-center mt-8">
      <p className="text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={onToggle}
          className="ml-2 text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default AuthToggle;