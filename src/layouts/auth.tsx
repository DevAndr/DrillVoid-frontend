import React, { FC } from "react";

const AuthLayout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container mx-auto max-w-7xl px-6 flex-grow content-center flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
