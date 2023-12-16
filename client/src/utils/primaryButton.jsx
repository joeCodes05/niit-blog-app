export default function PrimaryButton ({text, width, onClick}) {
  return (
    <>
      <button onClick={onClick} className={`py-1.5 px-3 font-semibold rounded-md bg-primary ring-1 ring-primary text-dark duration-500 text-base outline-none ${width}`}>
        {text}
      </button>
    </>
  )
}