"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      useremail: "",
      userMessage: "",
    },
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  interface IFormInput {
    username: string;
    useremail: string;
    userMessage: string;
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage('');
    setStatus("sending");
    try{
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: data.useremail,
          name: data.username,
          message: data.userMessage,
        }),
      });

      if (response.ok) {
        setStatus("success");
        reset();

        setTimeout(() => setStatus('idle'), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to send message. please try again');
        setStatus("failed");
        setTimeout(() => setStatus('idle'), 3000);
      } } catch (error) {
      console.error("Error sending message:", error);
      setStatus("failed");
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "idle":
        return "Submit";
      case "sending":
        return "Sending";
      case "success":
        return "Sent!";
      case "failed":
        return "Failed to send";
      default:
        return "Submit";
    }
  ;
  }

  return (
    <>
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
       {errors.username && <p className="text-red-500 text-xs">{errors.username?.message}</p> }
        <div className="w-full flex h-10 items-center rounded-lg p-px has-focus:bg-conic/[from_var(--border-angle)] from-form via-lime-300 to-form from-10% via-20% to-100% group animate-none has-focus:animate-rotate-border border border-white/10 has-focus:border-0">
          <div className="w-full h-full bg-form rounded-lg flex items-center pl-4 ">
            <label htmlFor="username" className="sr-only">
              Name
            </label>
            <input
              {...register("username", {
                required: "The Name filed is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long.",
                },
              })}
              type="text"
              placeholder="Name"
              id="username"
              className="w-full outline-none h-full"
            />
          </div>
        </div>

        {errors.useremail && <p className="text-red-500 text-xs">{errors.useremail?.message}</p>}
        <div className="w-full flex h-10 items-center rounded-lg p-px has-focus:bg-conic/[from_var(--border-angle)] from-form via-lime-300 to-form from-10% via-20% to-100% group animate-none has-focus:animate-rotate-border border border-white/10 has-focus:border-0">
          <div className="w-full h-full bg-form rounded-lg flex items-center pl-4">
            <label htmlFor="useremail" className="sr-only">
              Email
            </label>
            <input
              {...register("useremail", {
                required: "The Email field is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regex standar untuk email
                  message: "Invalid email format.", // Pesan untuk pattern
                },
              })}
              type="email"
              placeholder="Email"
              id="useremail"
              className="w-full outline-none h-full"
            />
          </div>
        </div>

        {errors.userMessage && <p className="text-red-500 text-xs">{errors.userMessage?.message}</p>}
        <div className="w-full h-32 rounded-lg outline-none p-px has-focus:bg-conic/[from_var(--border-angle)] from-form via-lime-300 to-form from-10% via-20% to-100% group animate-none has-focus:animate-rotate-border border border-white/10 has-focus:border-0">
          <div className="w-full h-full bg-form p-3 rounded-lg">
            <label htmlFor="usermessage" className="sr-only">
              Message
            </label>
            <textarea
              {...register("userMessage", {required: "The Message field is required."})}
              id="usermessage"
              placeholder="Message"
              className="w-full outline-none h-full resize-none decoration-none"
            />
          </div>
        </div>

        <div className="flex justify-end ">
          <button type="submit" className={`w-20 ${status === 'idle' ? 'bg-sky-600' : ''} py-1 rounded-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:bg-sky-400 disabled:bg-slate-500 disabled:cursor-not-allowed ${status === 'success' ? 'bg-green-400' : ''}`} disabled={status === "Sending..."}>
            {getButtonText()}
          </button>
        </div>
        {status === 'failed' && errorMessage && <p className="text-yellow-300 text-xs flex justify-end">Failed send message please try again</p>}
      </form>
    </>
  );
}
