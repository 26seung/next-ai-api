"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, sizeOptions } from "./constants";
import Heading from "@/components/ui-user/heading";
import { ImageIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui-user/empty";
import { Loader } from "@/components/ui-user/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

type ImageSchema = z.infer<typeof formSchema>;
/** 이미지생성 AI */

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState();

  const form = useForm<ImageSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      size: "1024x1024",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: ImageSchema) => {
    try {
      const response = await axios.post("/api/image", values);
      setImages(response?.data[0]?.url);

      form.reset();
    } catch (error: any) {
      toast.error("다른 명령어를 입력해 주세요");
      console.error("IMAGE PAGE error : ", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="이미지 생성기"
        description="DALL·E 3 모델을 사용하여 고품질 이미지를 생성합니다. "
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-10 lg:pr-32">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                bg-white
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="생성하고자 하는 이미지의 묘사를 해주세요."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* size 옵션 radio 적용 */}
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className=" col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
                spinner={isLoading}
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {/* 로딩 & 첫 대기화면 작업 */}
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {!images && !isLoading && <Empty label="생성된 이미지가 없습니다." />}
          {/* 생성된 이미지 뿌리기 */}
          <div className="flex justify-center mt-10 ">
            {images && (
              <div
                key={images}
                className="rounded-2xl overflow-hidden bg-slate-200 cursor-pointer border border-gray-300 shadow-md"
                onClick={() => window.open(images)}
              >
                <div className="relative aspect-square">
                  <Image
                    // fill
                    alt="Generated"
                    src={images}
                    sizes="none"
                    width={500}
                    height={500}
                    priority={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
