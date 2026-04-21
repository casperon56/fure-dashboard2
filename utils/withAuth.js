export default function withAuth(Component) {
  return function ProtectedPage(props) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("discord_token");

      if (!token) {
        window.location.href = "/login";
        return null;
      }
    }

    return <Component {...props} />;
  };
}
]
