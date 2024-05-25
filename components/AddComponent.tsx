"use client";

import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { components } from "./CreateLandingPageForm";
import { ComponentIcon } from "./ComponentIcon";


export function AddComponent({
    handleComponentChange,
    selectedComponents,
}: {
    handleComponentChange: (id: 'footer' | 'header' | 'text' | 'image') => void;
    selectedComponents: string[];
}) {
  const isComponentSelected = (id: string) => selectedComponents.includes(id);
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger asChild>
        <Button className="h-fit w-full bg-[#2E2E2E] bg-[#667bf654] rounded-md flex items-center justify-center text-base gap-[10px] mt-4">
          <div className="p-1 rounded flex justify-center items-center">
               <ComponentIcon />
          </div>
          <p style={{
            margin: 0,
            opacity: 0.7
          }}>
           Add Components
          </p>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#111111] flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 left-0 p-4">
          <div className="p-4 bg-[#111111]] flex-1 h-full">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                Add Component
              </Drawer.Title>
              <Drawer.Description>
                 Choose the components
              </Drawer.Description>
            
            </div>
            <div className="flex flex-col gap-3 mt-4">
            {components.map((component) => (
                 <Button key={component.type} className="py-6 rounded-[15px] bg-[#142434]" onClick={() => {
                    handleComponentChange(component.type);
                 } }>
                    <div className="flex w-full justify-between items-center">
                        {component.label}
                        <Button className="mx-left  py-[4px] h-fit bg-[#0099FF]"> 
                        {isComponentSelected(component.type) ? "Remove" : "Add"}
                         </Button>
                    </div>
                 </Button>
                ))}
           
          </div>
          </div>
          
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
