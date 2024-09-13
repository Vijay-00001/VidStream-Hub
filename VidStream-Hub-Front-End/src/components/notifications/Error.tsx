export const InlineError = ({ text }: { text: string | undefined }) => {
  return (
    <div className="text-subMain w-full mt-2 text-xs font-medium">
      <p>{text}</p>
    </div>
  );
};
