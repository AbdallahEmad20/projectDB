import {  Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import PropTypes from 'prop-types';

 const Model =({isOpen   , close , children , title})=> {

  return (
    <>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className=" shadow-xl w-full max-w-md rounded-xl bg-white text-black p-6 2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black my-2">
             {title}
              </DialogTitle>
               {children}
         
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

Model.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // يجب أن تكون قيمة من نوع Boolean
    close: PropTypes.func.isRequired,   // يجب أن تكون دالة لإغلاق الـ Model
    children: PropTypes.node.isRequired, // يجب أن تحتوي على عناصر داخلية من أي نوع
    title: PropTypes.string.isRequired  // يجب أن يكون العنوان من نوع String
  };

export default Model