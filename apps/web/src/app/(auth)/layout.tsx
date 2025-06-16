import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hearth font-montserrat">
      {children}
    </div>
  );
};

export default AuthLayout;
