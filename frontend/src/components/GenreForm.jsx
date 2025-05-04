

const GenreForm = ({value,setValue,handleSubmit,buttonText='Submit',handleDelete}) => {
  return (
    <div className="p-3">
        <form onSubmit={handleSubmit} className="py-3">
            <input type="text" className="py-3 px-4 bg-gray-200 rounded-lg min-w-[40%]" placeholder="Write genre Name" value={value} onChange={(e)=> setValue(e.target.value)}/>

            <div className="flex justify-between">
                <button className="mt-4 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-800 duration-400 cursor-pointer">{buttonText}</button>

                {handleDelete && (
                    <button onClick={handleDelete} className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 ">Delete</button>
                )}
            </div>
        </form>
    </div>
  )
}

export default GenreForm