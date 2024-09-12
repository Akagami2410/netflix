import Nav from "@/components/shared/nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
};

export default Layout;
