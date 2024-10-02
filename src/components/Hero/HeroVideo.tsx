import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="relative w-4/6 mx-auto border-[3px] border-gray-500 rounded-md">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/8hL2lue5tRM?si=sunOC6YwG5QsQ-m8"
        thumbnailSrc="https://i.ibb.co.com/SRpkCsG/8h-L2lue5t-RM-HD.jpg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
