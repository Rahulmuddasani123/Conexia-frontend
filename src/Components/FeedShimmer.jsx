import React from 'react'

const FeedShimmer = () => {
  return (
    <div className="flex justify-center min-h-screen items-center ">
      <div className="flex w-75 h-110 flex-col gap-4 shadow-xl p-3">
        <div className="flex items-center gap-4 justify-center ">
          <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4"></div>
        </div>
        <div className=" h-32 w-full">
          <div className="skeleton h-4 w-22 my-3"></div>
          <div className="skeleton h-4 w-28 my-3"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="flex h-4 w-full my-3 justify-center">
            <div className="skeleton h-4 w-28 my-3 mx-3"></div>
            <div className="skeleton h-4 w-28 my-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedShimmer  