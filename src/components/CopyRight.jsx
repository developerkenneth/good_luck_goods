export default function CopyRight(){
  return (
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="text-primary font-semibold">Goodlucks</span>. All rights reserved.
      </div>
  )
}