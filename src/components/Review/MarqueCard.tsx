import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Asif",
    username: "@asif",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://i.ibb.co.com/GdrD7pr/347258388-1360704768119738-960557031040221263-n.jpg",
  },
  {
    name: "Noman",
    username: "@noman",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://i.ibb.co.com/dLQ3Ycp/IMG-3934.jpg",
  },
  {
    name: "Abdullah",
    username: "@abdullah",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://i.ibb.co.com/Nr0XRCG/IMG-3932.jpg",
  },
  {
    name: "Tahir",
    username: "@tishrak",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://i.ibb.co.com/DbvyRZn/IMG-4016.png",
  },
  {
    name: "Georze",
    username: "@georze",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://i.ibb.co.com/s5N4KGf/IMG-4024.jpg",
  },
  {
    name: "Shakib",
    username: "@shakib",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://i.ibb.co.com/BrSFnBD/IMG-4001.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background px-16">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white "></div>
    </div>
  );
}
