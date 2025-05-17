import Layout_1 from "../../../components/Layout_1";
import Navbar from "../../../components/package/Navbar";
import Sidebar from "../../../components/package/Sidebar";

export default function Layout({ children }) {
  return (
    <Layout_1>
      <main className="h-full w-full flex flex-col">
        <section className="flex-none h-16">
          <Navbar></Navbar>
        </section>
        <section className="flex-1 p-0 lg:p-5 overflow-y-hidden">
          <main className={`h-full w-full flex gap-5`}>
            <section className="flex-1 h-full overflow-y-auto py-10">
              {children}
            </section>
          </main>
        </section>
      </main>
    </Layout_1>
  );
}
