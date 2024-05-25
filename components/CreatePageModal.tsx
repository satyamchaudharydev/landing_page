
"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long",
    }),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters long",
    })
})
export type ModalFormValue = z.infer<typeof formSchema>;

export default function CreatePageModal({
  handleSave,
  title,
  desc
}: {
  handleSave?: (data: ModalFormValue) => void;
  title?: string;
  desc?: string;
}) {
  const form = useForm<ModalFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: desc,
    },
  });
  const { control, watch, handleSubmit,getValues } = form;

  const onSubmit = (data: ModalFormValue) => {
    handleSave?.(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none hover:bg-[#2B2B2B] hover:text-white p-2 underline text-base">{getValues('title') ? getValues('title') : 'Untitled'}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#2B2B2B] border border-background">
        <DialogHeader>
          <DialogTitle>Add Details</DialogTitle>
          <DialogDescription>
            Details of Landing page
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            <div className="flex flex-col gap-3">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="" className='text-background' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
              
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input placeholder="" className='text-background' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
              
            </div>
            <DialogFooter className="sm:justify-start">
            <Button type="submit" variant="secondary">
              Save
            </Button>
        </DialogFooter>
            </form>
        </Form>
       
      </DialogContent>
    </Dialog>
  )
}
