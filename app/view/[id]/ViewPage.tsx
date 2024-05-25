// import { EditForm } from '@/components/EditForm';

import CreateLandingPage from "@/app/create/page";
import AuthButton from "@/components/AuthButton";
import { CreateForm } from "@/components/CreateLandingPageForm";
import { Navbar } from "@/components/Navbar";

import { supabase } from "@/utils/supabase/client";
import  CreatePageModal  from "@/components/CreatePageModal"
import PreviewSection from "@/components/PreviewLandingPage";
import { getUser } from "@/lib/getUser";

export default async function ViewPage ({ params }: { params: { id: string } }){
  const pageId =  params.id;

  if (!pageId || typeof pageId !== 'string') {
    return <div>Invalid page ID</div>;
  }
  const user = await getUser();
  const { data, error} = await supabase.from('landing_pages').select('*').or(`user_id.eq.${user?.id},published.eq.true`).eq('id', pageId);
//   console.log({data, error})
  const {title,description,components, template_name} = data?.[0] || {}
  if(data?.length === 0){
    return <div className="text-white di text-3xl w-full flex justify-center items-center" style={{
      height: "calc(100vh - 5rem)",
    }}>
      This page does not exist or you do not have permission to view it
    </div>
  }
  console.log(data, "data")
  return <>
  <div className="w-full h-full">

            <div className="p-4 bg-background border-b border-b-[#252525] flex justify-center items-centers justify-between">
                <CreatePageModal title={title} desc={description}  />
                {/* <div className="flex gap-5">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="status">Live</Label>
                        <Switch id="status" />
                    </div>
                </div> */}
            </div> 
             <div style={{
                    height: "calc(100vh - 8.06rem)",
            }}>

                <PreviewSection title={title} description={description} components={components} template={template_name} />
            </div>
            <div>
             
            </div>
        </div>
  </>
};


