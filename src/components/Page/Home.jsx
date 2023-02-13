import { AuthGuard } from "../../Auth";

export default function Home() {
    return (
        <div>
            <AuthGuard>
                <h1>Test</h1>
            </AuthGuard>
        </div>
    )
}