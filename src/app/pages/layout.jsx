import Content_2 from "../../components/Content_2";
import Layout_1 from "../../components/Layout_1";
import Navbar from "../../components/package/Navbar";
import Sidebar from "../../components/package/Sidebar";

export default function Layout({ children }) {
  return (
    <Layout_1>
      <main className="h-screen flex flex-col">
        <section className="flex-none">
          <Navbar></Navbar>
        </section>
        <section className="flex-1">
          <Content_2 sidebar={<Sidebar></Sidebar>}>
            <main className="p-10">{children}</main>
          </Content_2>
        </section>
      </main>
    </Layout_1>
  );
}
