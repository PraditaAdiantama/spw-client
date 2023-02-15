import { AuthGuard } from "../../Auth";

export default function Home() {

    function handleLogout() {
        window.localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <div>
            <AuthGuard>
                <h1>Test</h1>
                <button onClick={handleLogout}>Logout</button>
            </AuthGuard>
        </div>
    )
}