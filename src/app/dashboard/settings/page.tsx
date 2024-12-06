import { auth } from "@/auth";
import EditForm from "@/components/edit-form";
import { redirect } from "next/navigation";

const SettingPage = async () => {
  const session = await auth();

  // Redirect if there's no session or the name is not defined.
  if (!session?.user?.name) {
    return redirect("/auth/login");
  }

  const { name, image } = session.user;

  return (
    <div className="min-h-screen w-full">
      <EditForm initialName={name} initialImage={image || ""} />
    </div>
  );
};

export default SettingPage;
