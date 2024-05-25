'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { AddComponent } from './AddComponent';
import { supabase } from '@/utils/supabase/client';
import PreviewSection, { template } from './PreviewLandingPage';
import SplitPane from './SplitPane';
import { TemplateDropdown } from './TemplateDropdown';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/lib/getUser';
import { ModalFormValue } from './CreatePageModal';

export const components = [
  { type: 'footer', label: 'Footer' },
  { type: 'header', label: 'Header' },
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
] as const;

type ComponentType = 'footer' | 'header' | 'text' | 'image';
export const formSchema = z.object({

  components: z.array(
    z.object({
      type: z.enum(['footer', 'header', 'text', 'image']),
      content: z.string().optional(),
    })
  ), 
  

});
export type FormValues = z.infer<typeof formSchema>;
export const defaultComponents:
  {
    [k in template]: { type: ComponentType; content?: string | undefined}[];
  }
= {
  'default': [
    { type: 'header', content: 'This is Header Text' },
    { type: 'image', content: 'https://images.unsplash.com/flagged/photo-1556470234-36a5389f905a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { type: 'text', content: 'See Endless creativity for using our templates and cool' },
    { type: 'footer', content: 'Sign Up today' },
  ],
  'frisco': [
    { type: 'header', content: `Blog Article` },
    { type: 'text', content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis et nunc ultricies fermentum. Pellentesque habitant morbi tristique sen
    ` },
    { type: 'image', content: 'https://images.unsplash.com/flagged/photo-1556470234-36a5389f905a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { type: 'footer', content: 'View my works' },

  ]
}
export function CreateForm({mode, data, pageDetails,template, onSubmit, handleComponents}: {mode: 'create' | 'edit', data?: any, pageDetails?: ModalFormValue, template: template, onSubmit: () => void, handleComponents: (data: FormValues) => void}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      components: data?.components || defaultComponents[template],
    },
  });

  const { control, handleSubmit, watch, formState: {
    isDirty, 
  }, } = form;
  const { fields, append, remove, replace, } = useFieldArray({
    control,
    name: 'components',
    keyName: "key"
  });
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const {title, description} = pageDetails || {}
 
  const formValues = watch();

  const handleComponentChange = (type: any) => {
    const componentExists = selectedComponents.includes(type);
    
    if (componentExists) {
      setSelectedComponents(selectedComponents.filter((item) => item !== type));
      if(mode === 'edit'){
        const components = formValues.components;
        const componentIndex = components.findIndex((component: any) => component.type === type);
        const newComponents = [...components];
        newComponents.splice(componentIndex, 1);
        handleComponents({components: newComponents});
      }
      remove(fields.findIndex((field) => field.type === type));
    } else {
      setSelectedComponents([...selectedComponents, type]);
      if(mode === 'edit'){
        handleComponents({components: [...formValues.components, { type, content: '' }]});
      }
      append({ type, content: '' });
    }
    // handleComponents(formValues);
  };
  useEffect(() => {
    const initialSelectedComponents = formValues.components.map((component: any) => component.type);
    setSelectedComponents(initialSelectedComponents);
  }, [data])
  console.log(isDirty, "isDirty")
  return (
    
    <div className='flex w-full h-full' style={{
      height: "calc(100vh - 8.06rem)",
    }}>
      <ResizablePanelGroup direction="horizontal">
  <ResizablePanel className='border: none'> 
  <div className='p-[0.3rem] bg-background h-full'>
  <div className='rounded-[10px] overflow-hidden h-full'>
            <PreviewSection
              title={title || ""}
              description={description || ""}
              components={formValues.components}
              template={template}
        />
        </div>
  </div>
 </ResizablePanel>
  <ResizableHandle className='opacity-[20%]' />
  <ResizablePanel> <div className='bg-background h-full p-7'>
  <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields && fields.map((field, index) => {
              const component = components.find((comp) => comp.type === field.type);
              if (!component) return null;
              return (
                <FormItem key={field.type}>
                  <div className='flex justify-between items-center'>
                    <FormLabel>{component.label}</FormLabel>
                    {/* remove button */}
                    <Button
                      onClick={() => {
                        handleComponentChange(component.type);
                      }}
                      className='bg-transparent p-0 text-red-500 underline hover:bg-transparent'
                    >
                      Remove
                    </Button>
                  </div>
                  <Controller
                    control={control}
                    name={`components.${index}.content`}
                    render={({ field }) => (
                      <FormControl>
                        <Input className='text-background' placeholder={`Add content for ${component.label}`} {...field} onChangeCapture={() => {
                          handleComponents(formValues);
                        }} />
                      </FormControl>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              );
      })}
        </form>
        </Form>
          <AddComponent handleComponentChange={handleComponentChange} selectedComponents={selectedComponents} />
        </div>
      </ResizablePanel>
</ResizablePanelGroup>
      
    </div>

  );
}
