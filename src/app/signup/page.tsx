"use client"
import { PencilRuler } from 'lucide-react';
import Link from 'next/link';
import axios from "axios";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../config';
import { WS_URL } from '../config';
import { useRouter } from 'next/navigation'


export default function Signup (){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    async function Signup(){
    const password = passwordRef.current?.value
    const username = usernameRef.current?.value
    const name = nameRef.current?.value;

    try {
    const response = await axios.post(BACKEND_URL + "/signup",{
            username,
            password,
            name
    });
        const jwt = response?.data.token;
        console.log(response)
        console.log(jwt);
        if(jwt){
        localStorage.setItem('token', jwt);
        router.push('/rooms')
        }
        else{
            alert("Authentication failed. Please try again.");
        }
        } catch(error){
            alert("Authentication failed. Please try again.");

        } finally {
            setLoading(false); // Stop loading
        }

    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="p-8 bg-white shadow-sm rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-8">
              <PencilRuler className="w-10 h-10 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
            </div>
  
            <div className="space-y-6 text-purple-600">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  ref={usernameRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
                 <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="name"
                  required
                  ref={nameRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  ref={passwordRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
  
              <div className="flex items-center justify-between">
                <div className="text-sm">
                </div>
              </div>
              <button
                onClick={Signup}
                disabled={loading}
                className="w-full px-4 py-2 font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                {loading? "loading..." : "Sign Up"}
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/signin" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );

}


