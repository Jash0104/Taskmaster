
import { Sidebar, TopMenu } from "@/components";


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="bg-[#ffffff]">
        <div>
          <Sidebar />
          <div className="pl-72 min-h-[100vh]">
            <TopMenu />
            <main className="block my-4 h-full">
              <div className="px-8">
                { children }
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}