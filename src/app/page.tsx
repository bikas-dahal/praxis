import { ModeToggle } from "@/components/mode-switch";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/components/ui/fonts";


export default function Home() {
  return (
    <>
    <ModeToggle />
    <p
      className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
    > hifdnfoa  ksnak  jandka cdj</p>
    <Button variant={'destructive'}>Click me</Button>
    </>
  );
}

 