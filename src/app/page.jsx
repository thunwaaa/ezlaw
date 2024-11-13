import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "lucide-react";
import { NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,NavigationMenuLink,NavigationMenuList,
  NavigationMenuTrigger,navigationMenuTriggerStyle
 } from "@/components/ui/navigation-menu";


export default function Home() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>HOME</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3"><Link href="/lawcate">กฏหมาย</Link></li>

            </ul>

          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
