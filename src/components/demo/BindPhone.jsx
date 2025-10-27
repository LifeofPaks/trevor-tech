import React, { useState } from 'react'
import BuyModal from '../buyModal/BuyModal';

const BindPhone = () => {
          const [open, setOpen] = useState(false);

          const handleOpen = () => setOpen(true);
          const handleClose = () => setOpen(false);
  return (
    <>
      <div className="flex sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
        <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
          Demo data. Bind your device to collect actual data.
        </span>
        <button
          onClick={handleOpen}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
        >
          Bind My Device
        </button>
      </div>
      <BuyModal handleClose={handleClose} open={open} />
    </>
  );
}

export default BindPhone