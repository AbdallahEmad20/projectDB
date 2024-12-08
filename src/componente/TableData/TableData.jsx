import { useEffect, useState } from "react"
import Model from "../Model/Model"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {  deleteData, fetchData, updateData } from "../../redux/crudSlice";
import { createData } from "../../redux/crudSlice";
import { BiPlus } from "react-icons/bi";

;
const TableData = () => {

const [isCreateOpen, setIsCreateOpen] = useState(false);
const [isUpdateOpen, setIsUpdateOpen] = useState(false);
const [currentData, setCurrentData] = useState(null);
// const [isLoadingCreate, setIsLoadingCreate] = useState(true);
 // لتخزين البيانات الحالية للتحديث
const dispatch = useDispatch();

//   get all data
const { data } = useSelector((state) => state.crud);

useEffect(() => {
  dispatch(fetchData()); // استدعاء API لجلب البيانات عند تحميل الكومبوننت
}, [dispatch]);


console.log("data" , data)
// استخدم useForm من React Hook Form
const { register, handleSubmit, reset , setValue } = useForm();



 // فتح مودال الإضافة
 const openCreate = () => {
  setIsCreateOpen(true);
};
// إغلاق مودال الإضافة
const closeCreate = () => {
  setIsCreateOpen(false);
  reset(); // إعادة تعيين الحقول بعد الإغلاق
};

  // إغلاق مودال التحديث
  const closeUpdate = () => {
    setIsUpdateOpen(false);
    reset(); // إعادة تعيين الحقول بعد الإغلاق
  };


    // فتح مودال التحديث
    const openUpdate = (item) => {
      setCurrentData(item); // تعيين البيانات الحالية
      setIsUpdateOpen(true);
      setValue("Doc_id", item.Doc_id);
      setValue("DName", item.DName);
      setValue("Speciality", item.Speciality);
      setValue("Salary", item.Salary);
     
    };





//  create User
const onSubmit = async (formData) => {
  try {
    // إرسال البيانات إلى الـ API
    await dispatch(createData(formData)).unwrap();

    // جلب البيانات المحدثة
    dispatch(fetchData());

    // إغلاق المودال بعد الإضافة
    closeCreate();

    // إعادة ضبط النموذج
    reset();
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

  
//  update user

 // تحديث مستخدم
 const onSubmitUpdate = async (formData) => {
  try {
    await dispatch(updateData({ id: currentData.Doc_id, ...formData })).unwrap();
    dispatch(fetchData()); // تحديث البيانات بعد التعديل
    closeUpdate();
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

//  function Delete

const handleDelete = async (id) => {
  try {
    // استدعاء الـ dispatch لحذف البيانات
    await dispatch(deleteData(id)).unwrap();
    // تحديث البيانات بعد الحذف
    dispatch(fetchData());
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};


  return (

<div className="">
<button
onClick={()=>openCreate()}
className="relative ml-[160px] mt-8 inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-lg group">
<span
className="absolute w-0 h-0 transition-all duration-500 ease-out bg-indigo-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
<span
className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span className="relative text-base font-semibold">Create</span>
<BiPlus  className="relative ml-2" size={20}/>
</button>
{
  data.length === 0 ?
 
  
 <div className=' font-bold flex text-2xl items-center justify-center'> 
 <h2>There are no  <span className='text-[var(--maincolor)] '>Data </span> yet...! </h2> 
 </div>
  :

  <div>






<div className="flex flex-col max-w-[80%] mx-auto py-5">
  <div className="overflow-x-auto">
    <div className="min-w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg border-gray-300">
        <table className="min-w-full rounded-xl">
          <thead>
            <tr className="bg-gray-50">
              <th
                scope="col"
                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                Doc_id
              </th>
              <th
                scope="col"
                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                DName
              </th>
              <th
                scope="col"
                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                Speciality
              </th>
              <th
                scope="col"
                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                Salary
              </th>
          
              <th
                scope="col"
                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
          
            {
              data?.map((item)=>(
                <tr key={item?.Doc_id}>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                  {item?.Doc_id}
                </td>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                  {item?.DName}
                </td>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {item?.Speciality}
                </td>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {item?.Salary}
                </td>
               
                <td className="p-5 flex items-center space-x-3  whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
   <button
   onClick={()=>openUpdate(item)}
  className="relative inline-flex items-center justify-start px-8 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-xl group">
  <span
  className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>

  </span>
  <span
  className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-indigo-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
  <span
  className="relative w-full text-base font-semibold text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Edit
  </span>

  </button>
  {/*  Delete Button */}
                 
                 <button
                 onClick={() => handleDelete(item.Doc_id)}
  className="relative inline-flex items-center justify-start px-8 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
  <span
  className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
  </span>
  <span
  className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
  <span
  className="relative w-full text-base font-semibold text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Delete
  </span>
  </button>
               {/* End Delete Button  */}
                </td>
              </tr>
  
              ))
            }
   





          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>












  </div>
}


{/*  Model create */}


  

<Model isOpen={isCreateOpen} close={closeCreate} title={"create Model"}>
    {/*  Model ADD User */}

        <form  onSubmit={handleSubmit(onSubmit)} >
      
      
        <div className="mb-3">
            <label
              htmlFor="Doc_id"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
            Doc_id
            </label>
            <input
              {...register("Doc_id", { required: "This field is required" })}
              type="text"
              placeholder="Enter Doc_id"
              name="Doc_id"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="DName"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
            DName
            </label>
            <input
              {...register("DName", { required: "This field is required" })}
              type="text"
              placeholder="Enter DName"
              name="DName"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>



          <div className="mb-3">
            <label
              htmlFor="Speciality"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
           Speciality
            </label>
            <input
              {...register("Speciality", { required: "This field is required" })}
              type="text"
              placeholder="Speciality"
              name="Speciality"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="Salary"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
              Salary
            </label>
            <input
              {...register("Salary", { required: "This field is required" })}
              type="text"
              name="Salary"
              placeholder="Enter  Salary"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

     
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md mt-4"
          >
             create
          </button>
        </form>
      </Model>



{/*  End create Model  */}



{/*  Update Model  */}
  

<Model isOpen={isUpdateOpen} close={closeUpdate} title={"Update Model"}>
    {/*  Model ADD User */}

        <form  onSubmit={handleSubmit(onSubmitUpdate)} >


        <div className="mb-3">
            <label
              htmlFor="Doc_id"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
            Doc_id
            </label>
            <input
              {...register("Doc_id", { required: "This field is required" })}
              type="text"
              placeholder="Enter Doc_id"
              name="Doc_id"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="DName"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
            DName
            </label>
            <input
              {...register("DName", { required: "This field is required" })}
              type="text"
              placeholder="Enter DName"
              name="DName"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>



          <div className="mb-3">
            <label
              htmlFor="Speciality"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
           Speciality
            </label>
            <input
              {...register("Speciality", { required: "This field is required" })}
              type="text"
              placeholder="Speciality"
              name="Speciality"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="Salary"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
              Salary
            </label>
            <input
              {...register("Salary", { required: "This field is required" })}
              type="text"
              name="Salary"
              placeholder="Enter  Salary"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </form>
      </Model>

</div>

  )
}

export default TableData

