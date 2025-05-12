const RequestsShimmer = () => {
  return (
    <div className="flex justify-center min-h-screen mt-6 ">
      <div className="flex w-175 h-42 flex-col gap-4 shadow-xl p-3 mt-3">
        <div className="flex items-center gap-4  ">
          <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
          <div className="h-32 w-32 shrink-0 ">
            <div className="skeleton h-6 w-50 shrink-0 my-2 "></div>
            <div className="skeleton h-6 w-40 shrink-0 my-2 "></div>
            <div className="skeleton h-5 w-110 shrink-0 my-2"></div>
            <div className="skeleton h-5 w-110 shrink-0 my-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsShimmer;
