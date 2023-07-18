import { BrowserView, MobileView } from "react-device-detect";
const Loading = () => {
  return (
    <> <BrowserView>
    <div className="w-full h-full sm:flex xs:flex-row  justify-betweem p-3 m-3 gap-3">
    <div className='min-w-[250px] min-h-[300px] max-h-[300px]  backdrop-blur-lg bg-black/20 rounded-xl border-2 border-white'>
    </div>
    <div className='min-w-[400px] min-h-[500px]  backdrop-blur-lg bg-black/20 rounded-xl border-2 border-white'>
    </div>
    <div className='min-w-[200px] min-h-[400px]  max-h-[400px] backdrop-blur-lg bg-black/20 rounded-xl border-2 border-white'> 
    </div>
 </div>
 </BrowserView>
 <MobileView>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </MobileView>
  </>   
  );
};

export default Loading;