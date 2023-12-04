import { AuthBtnServer } from "../components/authBtn/authBtn-server"

export default function Login() {
  return (
        <section className="grid place-content-center justify-items-center min-h-screen">
            <h1 className="text-xl font-bold mb-4"> Please, Sign In</h1>
            <AuthBtnServer />
        </section>
  )
}
