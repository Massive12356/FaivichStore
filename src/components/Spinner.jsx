


const Spinner = ({ message = "Loading, please wait..." }) => (
  <div className="flex flex-col items-center justify-center py-20 w-full">
    {/* Spinner Circle */}
    <div className="h-12 w-12 border-4 border-[#67216D] border-t-transparent rounded-full animate-spin mb-4"></div>
    {/* Loading Message */}
    <p className="text-gray-600 text-lg font-medium animate-pulse">{message}</p>
  </div>
);
  
  export default Spinner;
  
