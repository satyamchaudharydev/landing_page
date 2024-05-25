// import { EditForm } from '@/components/EditForm';
"use client"

import CreateLandingPage from "@/app/create/page";
import AuthButton from "@/components/AuthButton";
import { CreateForm, FormValues } from "@/components/CreateLandingPageForm";
import CreatePageModal, { ModalFormValue } from "@/components/CreatePageModal";
import { Navbar } from "@/components/Navbar";
import { template } from "@/components/PreviewLandingPage";
import { TemplateDrawer } from "@/components/TemplateDrawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/getUser";

import { supabase } from "@/utils/supabase/client";
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react";

export default  function EditPage ({ params }: { params: { pageId: string } }){
  const [pageDetails, setPageDetails] = useState<ModalFormValue>();
  const [template, setTemplate] = useState<template>("default");
  const [updateComponents, setUpdateComponents] = useState<FormValues | null>(null);
  const [isPublished, setIsPublished]  = useState<boolean>(false);

  const [data, setData] = useState<any>();
  const pageId =  params.pageId;

  if (!pageId || typeof pageId !== 'string') {
    return <div>Invalid page ID</div>;
  }
  useEffect(() => {
    const getData = async () => {
        const { data, error} = await supabase.from('landing_pages').select('*').eq('id', pageId);
        const {title,description,components, template_name} = data?.[0] || {}
        setTemplate(template_name);
        setPageDetails({title, description})
        setData(data)
    }
    getData()

  }, [])
  const changeTemplate = (template: template) => {
    setTemplate(template);
  };
  const handleComponents = (data: FormValues) => {
    setUpdateComponents(data);
  };
  const handleSave = (data: ModalFormValue) => {
    setPageDetails(data);
  };
  const {title,description,components, published} = data?.[0] || {}

  const onSubmit = async () => {
    const user = await getUser();
    const { error: updateError } = await supabase
    .from('landing_pages')
    .update({ title: pageDetails?.title || "", description: pageDetails?.description || "", components: updateComponents?.components || components, published: false, template_name: template })
    .eq('id', pageId)
    .eq('user_id', user?.id);
    if (updateError) {
        console.error('Error updating data:', updateError.message);
    } else {
        console.log('Data updated successfully:');
    }
  }
  const handlePublish = async (checked: boolean) => {
    const user = await getUser();
    setIsPublished(checked);
    const { error: updateError } = await supabase
    .from('landing_pages')
    .update({ published: checked })
    .eq('id', pageId)
    .eq('user_id', user?.id);
   
  }

  if (!data) return <div>Loading...</div>
  return <>
      <div className="w-full">
      <div className="p-4 bg-background border-b border-b-[#252525] flex justify-center items-centers justify-between">
                <div>
                    <TemplateDrawer template={template} changeTemplate={changeTemplate} />
                </div>
                <CreatePageModal handleSave={handleSave} title={pageDetails?.title} desc={pageDetails?.description} />
                <div className="flex gap-5">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="status">Live</Label>
                        <Switch 
                            id="edit-status" 
                            defaultChecked={published}
                            onCheckedChange={(checked) => {
                                handlePublish(checked);
                            }}
                        />
                    </div>
                    <Button>Publish</Button>
                </div>
            </div>
            
            <CreateForm mode="edit" pageDetails={pageDetails} template={template} data={data?.[0]} onSubmit={onSubmit} handleComponents={handleComponents} />
            <div>
            </div>
        </div>
  </>
};


