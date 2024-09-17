"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

const GetCvForm = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setError("");
      router.push(`/${username}`);
    } else {
      setError("Please enter a GitHub username.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 shadow-lg rounded-md sm:flex-row"
      >
        <Input
          fullWidth
          placeholder="Enter GitHub username"
          variant="bordered"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          status={error ? "error" : "default"}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="text-black" color="default">
          Get CV
        </Button>
      </form>
    </div>
  );
};

export default GetCvForm;
