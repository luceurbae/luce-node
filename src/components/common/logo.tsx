export default function Logo({ className }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 44 44"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0V44H11V0H0ZM17 0V44H24.3304L44 11.5979V0H17ZM31.0251 10.5979L24.3304 21.8153V10.5979H31.0251Z"
        />
      </svg>
    );
  }