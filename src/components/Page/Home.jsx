import { AuthGuard } from "../../Auth";
import { useAuth } from "../../hooks";

export default function Home() {
    const auth = useAuth()
    console.log(auth.user)
    return (
        <div>
            <AuthGuard>
                <h1>Test</h1>
            </AuthGuard>
        </div>
    )
}