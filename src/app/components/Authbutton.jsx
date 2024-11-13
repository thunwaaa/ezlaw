"use client"
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from 'hooks/use-toast'
import Link from 'next/link'
import axios from 'axios'
import { Playfair_Display } from 'next/font/google'

const playfair_display = Playfair_Display({
    subsets: ['latin','latin-ext'],
    weight: ['400','700'],
})




export const AuthButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()
  
    const validatePassword = (password) => {
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const isLongEnough = password.length >= 8;
      return hasLetter && hasNumber && isLongEnough;
    };
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const password = formData.get('signup-password')
      if (formData.get('signup-password')){
        if (!validatePassword(password)) {
          toast({
            variant: "destructive",
            title: "Invalid Password",
            description: "Password must be at least 8 characters long and contain both letters and numbers.",
          });
          return;
        }
        // Continue with form submission if password is valid
        toast({
          title: "Success!",
          description: "Form submitted successfully.",
          });
          try {
            await axios.post('http://localhost:3000/signup', {
              firstname: formData.get('firstname'),
              lastname: formData.get('lastname'),
              email: formData.get('signup-email'),
              password: formData.get('signin-password')
            });
            toast({
              title: 'success!',
              description: 'sign-up success'
            });
            setIsOpen(false);
          } catch (error){
            toast({
              variant: 'destructive',
              title: 'sign up failed',
              description: error.response.data.message
            });
          }
        }
        else{
        try {
          await axios.post('/signin',{
            email: formData.get('email'),
            password: formData.get('password')
          });
          toast({
            title: 'success!',
            description: 'sing up success'
          });
          setIsOpen(false);
        } catch (error){
          toast({
            variant: 'destructive',
            title: 'sign up fail',
            description: error.response.data.message
          });
        }
      }
    };
    
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="mx-4 rounded-full border border-black px-3 py-1 text-lg transition-all hover:text-gray-500 font-semibold"
        >
          Sign in | Sign up
        </button>
  
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[425px] p-5">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
            </button>
  
            <Tabs defaultValue="signin" className="w-full text-xl">
              <TabsList className="grid w-full grid-cols-2 ">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
  
              <TabsContent value="signin" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your Email"
                      className="rounded-lg border-2"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password" 
                      className="rounded-lg border-2"
                      required
                    />
                  </div>
                  <div className="text-start">
                    <Link href="/" className="text-sm text-gray-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
  
              <TabsContent value="signup" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Enter your Name"
                      className="rounded-lg border-2"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Enter your Name"
                      className="rounded-lg border-2"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="Enter your Email"
                      className="rounded-lg border-2"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      className="rounded-lg border-2"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long and contain both letters and numbers
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="Enter your password"
                      className="rounded-lg border-2"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </>
    );
};  
export default AuthButton