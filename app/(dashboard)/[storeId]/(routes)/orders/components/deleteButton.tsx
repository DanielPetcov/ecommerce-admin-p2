"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

interface DeleteOrderButtonProps {
  orderId: string;
}

export default function DeleteOrderButton({ orderId }: DeleteOrderButtonProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/orders/${orderId}`);
      router.refresh();
      toast.success("Order deleted.");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} onClick={onDelete} variant={"destructive"}>
      Delete
    </Button>
  );
}
