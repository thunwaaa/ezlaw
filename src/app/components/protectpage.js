import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProtectedPage = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = รอการตรวจสอบ
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const loginSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email,password
                }),
                credentials: "include",
            });

            console.log("response status: ",response.status);
            const data = await response.json();
            if(response.ok){
                localStorage.setItem("token",data.token);
                console.log("user login sucess");
                setIsDialogOpen(false);
                checkSession();
                window.location.reload();
            }
        }catch(error){
            console.error("error:" ,error);
        }

    }

    const checkSession = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/auth/check-session', {
                method: 'GET',
                credentials: 'include',
            });
            setIsLoggedIn(res.ok);
            setIsDialogOpen(!res.ok); 
        } catch (error) {
            console.error('Session check error:', error);
            setIsLoggedIn(false);
            setIsDialogOpen(true);
        }
    };

    useEffect(() => {
        checkSession();
    }, [router.pathname]);

    return (
        <>
            {children} {/* Render เนื้อหาของหน้า */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>You need to log in</DialogTitle>
                    <form onSubmit={loginSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={(e) => setemail(e.target.value)}
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
                                    onChange={(e) => setpassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="rounded-lg border-2"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                Sign In
                            </Button>
                        </form>
                </DialogContent>
            </Dialog>
        </>
    );
};


export default ProtectedPage;

