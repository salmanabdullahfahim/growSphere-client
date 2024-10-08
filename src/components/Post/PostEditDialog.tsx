import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PostEditDialog = ({ post }: { post: any }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center gap-x-2 justify-start"
          onClick={handleEditClick}
        >
          <span> ✏️</span>
          Edit Post
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              defaultValue={post.title}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="content" className="text-right">
              Content
            </label>
            <Textarea
              id="content"
              defaultValue={post.content}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right">
              Category
            </label>
            <Input
              id="category"
              defaultValue={post.category}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPremium"
              defaultChecked={post.isPremium}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="isPremium"
              className="text-sm font-medium text-gray-700"
            >
              Premium Post
            </label>
          </div>
        </div>
        <Button type="submit">Save changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditDialog;
