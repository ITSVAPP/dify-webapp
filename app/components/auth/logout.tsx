import { FiLogOut } from 'react-icons/fi'
import { supabase } from '@/service/supabase'

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error)
      console.error(error.message)
    else
      console.log('User logged out')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" >
      <FiLogOut size={19} />
    </button>
  )
}

export default Logout
