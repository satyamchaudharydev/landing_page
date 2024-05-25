"use client"
import { CreateForm, FormValues, defaultComponents, formSchema } from "@/components/CreateLandingPageForm"
import  CreatePageModal, { ModalFormValue }  from "@/components/CreatePageModal"
import { template } from "@/components/PreviewLandingPage"
import { TemplateDrawer } from "@/components/TemplateDrawer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getUser } from "@/lib/getUser"
import { supabase } from "@/utils/supabase/client"
import { useState } from "react"
import { useRouter } from 'next/navigation'


export default  function CreateLandingPage () {
    const router = useRouter()
    const [pageDetails, setPageDetails] = useState<ModalFormValue>();
    const [template, setTemplate] = useState<template>("default");
    const [components, setComponents] = useState<FormValues | null>(null);
    const [isPublished, setIsPublished]  = useState<boolean>(false);
    
    const changeTemplate = (template: template) => {
        setTemplate(template);
    }
    const handleSave = (data: ModalFormValue) => {
        setPageDetails(data);
      };
    const componentData = components?.components || defaultComponents[template];
    const onSubmit = async () => {
        const user = await getUser();
        const { data } : {
            data: any,
        } = await supabase
            .from('landing_pages')
            .insert([{ title: pageDetails?.title, description: pageDetails?.description, components: componentData, user_id: user?.id, template_name: template, published: isPublished}])
            .select('')
        
        const id = data[0].id;
        router.push(`/edit/${id}`)
       
    };
    const handleComponents = (data: FormValues) => {
        setComponents(data);
    }
    return (
        <div className="w-full h-full">
            
            <div className="p-4 bg-background border-b border-b-[#252525] flex justify-center items-centers justify-between">
                <div>
                    <TemplateDrawer template={template} changeTemplate={changeTemplate} />
                </div>
                <CreatePageModal handleSave={handleSave} />
                <div className="flex gap-5">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="status">Live</Label>
                        <Switch 
                            id="status" 
                            onCheckedChange={(checked) => setIsPublished(checked)}
                        />
                    </div>
                    <Button onClick={() => onSubmit()}>Save</Button>
                </div>
            </div>
            
            <CreateForm mode="create" pageDetails={pageDetails} template={template} onSubmit={onSubmit} handleComponents={handleComponents} />
            <div>
            </div>
        </div>
    )
}