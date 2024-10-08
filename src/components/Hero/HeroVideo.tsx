import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="relative w-4/6 mx-auto border-[3px] border-gray-500 rounded-md">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/8hL2lue5tRM?si=sunOC6YwG5QsQ-m8"
        thumbnailSrc="https://res.cloudinary.com/doq34sr4q/image/upload/v1728355500/8hL2lue5tRM-HD_stbbc2.jpg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
