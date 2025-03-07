import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
	username: "",
	password: "",
  });
  const queryClient = useQueryClient();

  const {
	mutate:loginMutation,
	isPending,
	isError,
	error,
  } = useMutation({
	mutationFn: async ({ username, password }) => {
	  try {
		const res = await fetch("api/auth/login", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",	
		  },
		  body: JSON.stringify({ username, password }),
		});
		  
		const data = await res.json();

		if (!res.ok) {
		  throw new Error(data.error || "Something went wrong");
		}
	  } catch (error) {
		throw new Error(error);	
	  }
	},
	onSuccess: () => {
	  // refetch the authUser query to update the UI
	  queryClient.invalidateQueries({ queryKey: ["authUser"] });
	},	
  });

  const handleSubmit = (e) => {
	e.preventDefault();
	loginMutation(formData);
  };

  const handleInputChange = (e) => {
	setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
	<div className='max-w-screen-xl mx-auto flex h-screen'>
	  <div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='border-2 border-black input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail className="ml-4" />
						<input
							type='text'
							className='outline-none p-2 grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className='border-2 border-black input input-bordered rounded flex items-center gap-2'>
						<MdPassword className="ml-4" />
						<input
							type='password'
							className='outline-none p-2 grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='border-2 p-3 btn rounded-full btn-primary text-black border-black hover:text-white bg-white hover:bg-gradient-to-r hover:from-[#0703fc] hover:to-[#fc0303]'>
					  {isPending ? "Loading..." : "Login"}	
					</button>
					{isError && <p className='text-red-500'>
						{error.message}
						</p>}
				</form>
				<div className='flex flex-col'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='border-2 p-3 btn rounded-full btn-primary text-black border-black hover:text-white bg-white hover:bg-gradient-to-r hover:from-[#0703fc] hover:to-[#fc0303] w-full'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;