import {useState} from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { useToast } from 'hooks/use-toast'




export const AuthButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()
  
    const validatePassword = (password) => {
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const isLongEnough = password.length >= 8;
      return hasLetter && hasNumber && isLongEnough;
    };
    
    const handleSubmit = (e) => {
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
        };
      }
    
  
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.auth_button}
        >
          Sign in | Sign up
        </button>
  
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className={styles.dialog_content}>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.close_button}
            >
              <X className={styles.icon} />
            </button>
  
            <Tabs defaultValue="signin" className={styles.tabs}>
              <TabsList className={styles.tabs_list}>
                <TabsTrigger value="signin" className={styles.tab_trigger}>Sign In</TabsTrigger>
                <TabsTrigger value="signup" className={styles.tab_trigger}>Sign Up</TabsTrigger>
              </TabsList>
  
              <TabsContent value="signin" className={styles.tabs_content}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.form_group}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your Email"
                      className={styles.input_field}
                      required
                    />
                  </div>
                  <div className={styles.form_group}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password" 
                      className={styles.input_field}
                      required
                    />
                  </div>
                  <div className={styles.forgot_password}>
                    <a href="#" className={styles.forgot_password_link}>
                      Forgot password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className={styles.submit_button}
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
  
              <TabsContent value="signup" className={styles.tabs_content}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.form_group}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Enter your Name"
                      className={styles.input_field}
                      required
                    />
                  </div>
                  <div className={styles.form_group}>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Enter your Name"
                      className={styles.input_field}
                      required
                    />
                  </div>
                  <div className={styles.form_group}>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="Enter your Email"
                      className={styles.input_field}
                      required
                    />
                  </div>
                  <div className={styles.form_group}>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      className={styles.input_field}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long and contain both letters and numbers
                    </p>
                  </div>
                  <div className={styles.form_group}>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="Enter your password"
                      className={styles.input_field}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className={styles.submit_button}
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

export default Authbutton