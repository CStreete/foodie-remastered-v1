"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ImagePlus,
  Loader,
  Loader2,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useRecipeNavigation } from "@/hooks/useRecipieNavigation";
import {
  RecipeValidator,
  TRecipeValidator,
} from "@/schema-validator/recipe-validator";
import { uploadRecipe } from "@/server/_actions/recipes/create-recipie";
import { useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

const CreateRecipie = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const { createRecipe, handleBack, handleNext, clearNavigationStates } =
    useRecipeNavigation();
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TRecipeValidator>({
    resolver: zodResolver(RecipeValidator),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      ingredients: [
        {
          ingredient: "",
        },
      ],
      instructions: [
        {
          step: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });
  const {
    fields: ingredients,
    append: add,
    remove: del,
  } = useFieldArray({
    name: "instructions",
    control,
  });

  const { ref, onChange } = register("image");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const onSubmit = async ({
    title,
    ingredients,
    description,
    image,
    instructions,
  }: TRecipeValidator) => {
    setIsPending(true);
    const fileUrl = await startUpload(files);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    ingredients.map((ingredient) => {
      formData.append("ingredients", ingredient.ingredient);
    });
    instructions.map((instruction) => {
      formData.append("instructions", instruction.step);
    });
    formData.append("image", fileUrl?.at(0)?.url as string);

    const res = await uploadRecipe(formData);

    if (res?.success) {
      isOpen(false);
      reset();
      setFiles([]);
      clearNavigationStates();
      setIsPending(false);
      toast({
        title: "Hurra!",
        description: "Ditt recept har laddats upp!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger className=" lg:w-full ">
        <div className=" flex items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer ">
          <PlusCircle size={30} />
          <p className="pt-1 lg:block hidden ">Ny recept</p>
        </div>
      </DialogTrigger>
      <DialogContent className=" w-screen">
        {isPending ? (
          <div className=" h-60 flex flex-col items-center">
            <h1 className=" pt-10 text-lg text-center">
              Ditt recept håller på laddas upp!
            </h1>
            <Loader2 className=" animate-spin-slow mt-10" size={90} />
          </div>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle>
                <div className=" flex justify-between ">
                  <p>Skapa ett nytt recept</p>
                  {files.length > 0 ? (
                    <>
                      <Button
                        variant={"outline"}
                        onClick={handleNext}
                        className=" absolute right-10 top-2"
                        size={"sm"}
                      >
                        Nästa
                      </Button>
                      <Button
                        variant={"outline"}
                        onClick={handleBack}
                        className=" absolute right-28 top-2"
                        size={"sm"}
                      >
                        Tillbaka
                      </Button>
                    </>
                  ) : null}
                </div>
              </DialogTitle>
              <DialogDescription className=" text-left">
                Välj en bild och börja skapa ditt recept
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col  justify-center pt-5 items-center">
                {files.length == 0 ? (
                  <>
                    <div
                      className=" flex flex-col justify-center items-center"
                      {...getRootProps()}
                    >
                      <Input {...register("image")} {...getInputProps()} />
                      <ImagePlus size={80} />
                      <p className=" text-xl mt-5">
                        Dra foton hit eller välj bild.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className=" ">
                    <Image
                      src={URL.createObjectURL(files[0])}
                      alt="hi"
                      className=" rounded-md"
                      height={
                        createRecipe === "default" ||
                        createRecipe === "complete"
                          ? 700
                          : 100
                      }
                      width={
                        createRecipe === "default" ||
                        createRecipe === "complete"
                          ? 700
                          : 100
                      }
                    ></Image>
                    {errors.image && <span>This field is required</span>}
                  </div>
                )}
              </div>
              {createRecipe === "title" ? (
                <div className=" flex flex-col items-center space-y-4">
                  <p className=" pt-5 font-bold text-xl text-center  w-full">
                    Ge ditt nya recept en tittle
                  </p>
                  <Input
                    {...register("title")}
                    placeholder="Ex: Scampi Pasta"
                  />
                </div>
              ) : createRecipe === "description" ? (
                <div className=" flex flex-col items-center space-y-4">
                  <p className=" pt-5 font-bold text-xl text-center  w-full">
                    Lägg till en passande beskrivning
                  </p>
                  <Input
                    {...register("description")}
                    type="textarea"
                    placeholder="Ex: En super god och enkel scampi pasta!"
                  />
                </div>
              ) : createRecipe === "ingredients" ? (
                <div className=" flex flex-col items-center space-y-4  ">
                  <p className=" pt-5 font-bold text-xl text-center  w-full">
                    Lägg till ingredienser
                  </p>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className=" form-control flex items-center justify-center "
                    >
                      <Button
                        disabled={fields.length === 1}
                        className=""
                        variant={"ghost"}
                        onClick={() => remove(index)}
                      >
                        <MinusCircle size={20} />
                      </Button>

                      <Input
                        {...register(`ingredients.${index}.ingredient`)}
                        type="text"
                        placeholder="Ex: Pasta"
                        className=" w-60"
                      />
                    </div>
                  ))}
                  <div className=" flex w-72 mr-1 justify-start ">
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => append({ ingredient: "" })}
                    >
                      <PlusCircle size={20} />
                    </Button>
                  </div>
                </div>
              ) : createRecipe === "instructions" ? (
                <div className=" flex flex-col items-center space-y-4">
                  <p className=" pt-5 font-bold text-xl text-center  w-full">
                    Lägg till instruktioner
                  </p>
                  {ingredients.map((field, index) => (
                    <div
                      key={field.id}
                      className=" form-control flex items-center justify-center "
                    >
                      <Button
                        disabled={ingredients.length === 1}
                        className="  "
                        variant={"ghost"}
                        onClick={() => del(index)}
                      >
                        <MinusCircle size={20} />
                      </Button>

                      <Input
                        {...register(`instructions.${index}.step`)}
                        type="text"
                        placeholder="Ex: Koka pastan"
                        className=" w-64"
                      />
                    </div>
                  ))}
                  <div className=" flex w-72 mr-5 justify-start ">
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => add({ step: "" })}
                    >
                      <PlusCircle size={20} />
                    </Button>
                  </div>
                </div>
              ) : createRecipe === "complete" ? (
                <div className=" flex flex-col items-center justify-center">
                  <div className=" text-center text-lg mt-5">
                    {getValues("title")}
                    {errors.title && (
                      <span className=" text-red-700">Title is required</span>
                    )}
                    <p>{getValues("description")}</p>
                  </div>
                  <div className="  flex w-full justify-around  mb-5 mt-5 text-center">
                    <div className=" flex flex-col items-start">
                      <h1 className=" text-darkPink text-xl font-bold">
                        Ingredienser
                      </h1>
                      {getValues("ingredients").map((ingredient) => (
                        <p>{ingredient.ingredient}</p>
                      ))}
                    </div>
                    <div className=" flex flex-col items-start">
                      {" "}
                      <h1 className=" text-darkPink text-xl font-bold">
                        Instruktioner
                      </h1>
                      {getValues("instructions").map((instructions) => (
                        <div>
                          <p>{instructions.step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button disabled={!isDirty || !isValid} type="submit">
                    Skapa recept
                  </Button>
                </div>
              ) : null}
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipie;
