import { SignIn } from "@clerk/nextjs";
import Footer from '../../../components/Footer';


export default function Page() {
    return (

        <div className="flex flex-col min-h-screen">
        <div className="flex flex-col items-center p-10">
            <SignIn />

        </div>
        <Footer />
        </div>


    );
}
