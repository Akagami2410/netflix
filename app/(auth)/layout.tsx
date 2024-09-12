const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative h-[100vh] w-full bg-[url('/images/hero.jpg')] object-cover object-center">
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.55)]"></div>
      {children}
    </main>
  );
};

export default Layout;
