const PromptCard = ({ post }) => {
  const { name, descripcion, fecha } = post;

  const formattedFecha = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(fecha));

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 ">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{name}</h3>
            <p className="font-inter text-sm text-gray-500">{descripcion}</p>
          </div>
        </div>
      </div>

      <p className="font-inter text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent my-4 ">
        {formattedFecha}
      </p>
    </div>
  );
};

export default PromptCard;
