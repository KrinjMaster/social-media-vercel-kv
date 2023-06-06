'use client'
import Link from 'next/link'
import { GET } from '../../api/get'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { ITarget } from '@/interface/ITarget'
import { COOKIEADD } from '../../cookie/cookieAdd'

export default function Page() {
  const { push } = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement> & {target: ITarget}) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password1.value
    GET(username).then((response) => {
      if (JSON.stringify(response) !== undefined) {
        if (response?.password === password) {
          COOKIEADD(username)
          push(`/users/${username}`)
        }
        else {
          alert('Password must match')
        }
      }
      else {
        alert('User does not already exists')
      }
    })
  }

  return (
    <div className="text-white flex h-screen">
      <div className="w-fit bg-[rgb(38,37,37)] shadow-sm shadow-gray-500 flex h-[40vh] p-3 m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex flex-col w-full h-full items-center gap-5" onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5 m-auto'>
            <input type="text" id='username' placeholder='Username' minLength={3} maxLength={15} className="bg-[rgb(29,29,29)] h-[5vh] shadow-sm shadow-gray-500 placeholder:font-normal font-normal px-2 rounded-lg text-xl"></input>
            <input type="password" id='password1' placeholder='Password' minLength={1} maxLength={16} className="bg-[rgb(29,29,29)] h-[5vh] shadow-sm shadow-gray-500 placeholder:font-normal font-normal px-2 rounded-lg text-xl"></input>
          </div>
          <div className='flex w-full h-fit m-auto'>
            <button className="text-white bg-indigo-600 text-xl px-1.5 py-0.5 w-fit mr-auto h-fit rounded-lg hover:text-gray-400 transition-all duration-300 ease-in-out font-bold" type="submit">Log in</button>
            <Link href='/auth/reg' className="text-white bg-zinc-700 px-1.5 py-0.5 w-fit h-fit text-xl text-center hover:text-gray-400 rounded-md transition-all duration-300 ease-in-out font-bold">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}