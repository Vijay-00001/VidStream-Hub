interface TitlesProps {
  title: string;
  Icon: React.ElementType;
}

const Titles: React.FC<TitlesProps> = ({ title, Icon }) => {
  return (
    <div className="w-full flex sm:gap-8 gap-4 items-center">
      <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-subMain" />
      <h2 className="sm:text-xl font-bold capitalize">{title}</h2>
    </div>
  );
};

export default Titles;
