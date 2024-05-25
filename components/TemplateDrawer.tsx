"use client";

import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { components, defaultComponents } from "./CreateLandingPageForm";
import { ComponentIcon } from "./ComponentIcon";
import PreviewSection, { template } from "./PreviewLandingPage";
import Image from "next/image";


export function TemplateDrawer({
    template,
    changeTemplate,
} : {
    template: template
    changeTemplate: (template: template) => void;
}) {

    const allTemplates: template[] = Object.keys(defaultComponents) as template[];
//   const isComponentSelected = (id: string) => selectedComponents.includes(id);
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger asChild>
        <Button className="h-fit w-full bg-[#2E2E2E] rounded-md flex items-center justify-center text-[1rem] gap-[10px] p-2">
          Current Template: <span className="text-[#0099FF] underline">{template}</span>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#111111] flex flex-col rounded-t-[10px] h-full w-[300px] mt-24 fixed bottom-0 left-0 p-4">
          <div className="p-4 bg-[#111111]] flex-1 h-full">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                 Choose the Templates
              </Drawer.Title>
            </div>
            <div className="flex flex-col gap-3">
            {
                allTemplates.map((templateName) => {
                    const isSelected = template === templateName;
                    return (
                        <div className={`rounded-[15px] ${!isSelected ? "#4c4444" : "bg-[#9dc6d8]" } p-1 h-[300px]`}>
                             <div key={templateName} className="rounded-[15px] h-full flex justify-center items-center"
                                style={{
                                    cursor: "pointer",
                                    backgroundSize: "contain",
                                    backgroundImage: `url(/defaultPreview.png)`
                                }}
                                >
                                    <Button className="py-6 rounded-[15px] bg-[#142434]" onClick={() => {
                                        changeTemplate(templateName);
                                    }}>
                                            {isSelected ? "Selected" : "Select"}
                                    </Button>
                                    {/* <Image height={200} width={200} src={"/defaultPreview.png"} alt="Template Preview" /> */}
                                </div>
                            </div>
                       
                    )
                })
            }
           
          </div>
          </div>
          
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
