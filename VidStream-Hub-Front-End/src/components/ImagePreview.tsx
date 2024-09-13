import { TypeOfImagePreview } from "@/Types";
import Image from "next/image";

export const ImagePreview = ({ src, alt }: TypeOfImagePreview) => {
  return (
    <div className="w-32 h-32 p-2 bg-main border border-border rounded">
      <Image
        src={src ? src : ""}
        alt={alt}
        height={500}
        width={500}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};
