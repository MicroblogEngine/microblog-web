import { t } from "i18next";

const Composer = () => {
  return (
    <div className="flex flex-row justify-center w-full p-2 border-b-2 border-b-slate-400">
      <img src="https://placehold.co/100x100" alt="user" className="w-10 h-10 rounded-full" />
      <div className="flex flex-col justify-center w-full pl-2 pr-2">
        <textarea className="w-full h-24 p-2 border-none rounded-md border-slate-400"></textarea>
        <div className='flex flex-row items-center justify-center w-full'>
          <div className='w-full' >
            
          </div>
            <button className="w-32 h-10 text-white bg-black rounded-full">{t("Post")}</button>
          </div>
      </div>
    </div>
  );
};

export default Composer;
