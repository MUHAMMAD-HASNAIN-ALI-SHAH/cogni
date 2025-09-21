import { signIn } from "@/lib/auth";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* Glassmorphic card */}
      <div className="w-full max-w-xl rounded-2xl bg-[#1e1e1e] p-8 py-16 shadow-2xl backdrop-blur-md">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-white">
          Welcome Back
        </h1>
        <p className="mb-8 text-center text-gray-400">
          Sign in with your Google account
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
          className="flex justify-center"
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl
            cursor-pointer
                       bg-[#1f1f1f]
                       px-6 py-3 text-lg font-semibold text-white shadow-md 
                       border border-[#333333] 
                       transition duration-200
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {/* Google “G” icon */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.2H272v95h146.9
                   c-6.4 34.5-25.7 63.6-54.7 83.1v68h88.4
                   c51.8-47.8 80.9-118.3 80.9-195.9z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.7 0 135.4-24.4 180.5-66.1l-88.4-68
                   c-24.5 16.4-55.8 26-92.1 26
                   -70.9 0-131-47.9-152.5-112.1h-90v70.4
                   C69.7 475.3 163.7 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M119.5 324.1c-10.3-30.5-10.3-63.5 0-94h-90v-70.4
                   C27.9 68.9 121.9 0 272 0
                   c73.7 0 135.4 24.4 180.5 66.1l-88.4 68
                   c-24.5-16.4-55.8-26-92.1-26
                   -70.9 0-131 47.9-152.5 112.1h-.1z"
              />
              <path
                fill="#EA4335"
                d="M272 108.1c36.3 0 67.6 9.6 92.1 26l88.4-68
                   C407.4 24.4 345.7 0 272 0
                   163.7 0 69.7 68.9 29.5 159.7l90 70.4
                   c21.5-64.2 81.6-112 152.5-112z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
